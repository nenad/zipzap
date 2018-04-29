import { readFileSync } from "fs";
import URLDashboard from "../Dashboard/URLDashboard";

export enum DashboardType {
  Page = "page",
  Stream = "stream",
  Video = "video"
}

export class ConfigItem {
  type!: DashboardType;
  uri!: string;
  duration!: number;
  options?: string[];
}

export default class Configuration {
  readonly Dashboards!: IDashboard[];
  readonly IsCECEnabled!: boolean;
  readonly IsHTTPEnabled!: boolean;

  constructor(dashboards: IDashboard[], cec: boolean, http: boolean) {
    this.Dashboards = dashboards;
    this.IsCECEnabled = cec;
    this.IsHTTPEnabled = http;
  }

  static LoadFromFile(filePath: string): Configuration {
    var contents = readFileSync(filePath);
    // JSON Schema validation?
    var config = JSON.parse(contents.toString());

    var dashboards: IDashboard[];
    dashboards = [];
    config.dashboards.forEach((configItem: ConfigItem) => {
      var dashboard: IDashboard;
      switch (configItem.type) {
        case DashboardType.Page: {
          dashboard = new URLDashboard(configItem.uri, configItem.duration);
          break;
        }
        default: {
          dashboard = new URLDashboard("about:blank", 10000);
        }
      }
      dashboards.push(dashboard);
    });

    return new Configuration(dashboards, false, false);
  }
}
