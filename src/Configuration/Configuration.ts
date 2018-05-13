import { app, LoadURLOptions, session } from "electron";
import { readFileSync } from "fs";
import URLDashboard from "../Dashboard/URLDashboard";

enum DashboardType {
  Page = "page",
  Stream = "stream",
  Video = "video",
  HTML = "html",
}

interface IConfiguration {
  dashboards: IDashboardConfig[];
  requestEnhancements?: IRequestEnhancement[];
}

interface IDashboardConfig {
  type: DashboardType;
  uri: string;
  duration: number;
  options: LoadURLOptions;
}

interface IRequestEnhancement {
  patterns: string[];
  headers: Map<string, string>;
}

export default class Configuration {
  public static LoadFromFile(filePath: string): Configuration {
    // JSON Schema validation?
    const contents = readFileSync(filePath);
    const config: IConfiguration = JSON.parse(contents.toString());
    const dashboards: IDashboard[] = [];

    config.dashboards.forEach((item: IDashboardConfig) => {
      switch (item.type) {
        case DashboardType.HTML:
          dashboards.push(new URLDashboard(item.uri, item.duration, true, item.options));
          break;
        case DashboardType.Page:
        default:
          dashboards.push(new URLDashboard(item.uri, item.duration, false, item.options));
          break;
      }
    });

    app.once("ready", () => {
      if (!config.requestEnhancements) { return; }

      config.requestEnhancements.forEach((item: IRequestEnhancement) => {
        session.defaultSession!.webRequest.onBeforeSendHeaders(
          { urls: item.patterns },
          (details: any, callback: (response: any) => void) => {
            for (const [key, value] of Object.entries(item.headers)) {
              details.requestHeaders[key] = value;
              callback({ cancel: false, requestHeaders: details.requestHeaders });
            }
          });
      });
    });

    return new Configuration(dashboards, false, false);
  }

  public readonly Dashboards!: IDashboard[];
  public readonly IsCECEnabled!: boolean;
  public readonly IsHTTPEnabled!: boolean;

  constructor(dashboards: IDashboard[], cec: boolean, http: boolean) {
    this.Dashboards = dashboards;
    this.IsCECEnabled = cec;
    this.IsHTTPEnabled = http;
  }
}
