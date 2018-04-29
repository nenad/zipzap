import { LoadURLOptions } from "electron";
import { readFileSync } from "fs";
import { format } from "path";
import URLDashboard from "../Dashboard/URLDashboard";

enum DashboardType {
  Page = "page",
  Stream = "stream",
  Video = "video",
}

class ConfigItem {
  public type!: DashboardType;
  public uri!: string;
  public duration!: number;
  public options?: LoadURLOptions;
}

export default class Configuration {

  public static LoadFromFile(filePath: string): Configuration {
    // JSON Schema validation?
    const contents = readFileSync(filePath);
    const config = JSON.parse(contents.toString());
    const dashboards: IDashboard[] = [];

    config.dashboards.forEach((item: ConfigItem) => {
      switch (item.type) {
        case DashboardType.Page: {
          dashboards.push(new URLDashboard(item.uri, item.duration, item.options));
          break;
        }
        default:
          throw new Error("Unrecognized type: " + item.type);
      }
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
