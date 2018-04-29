import { BrowserWindow } from "electron";
import { format } from "url";
import Configuration from "./Configuration/Configuration";
import AutomaticControl from "./Control/AutomaticControl";
import DashboardState from "./Dashboard/DashboardState";

export default class Main {
  public static control: AutomaticControl;
  public static state: DashboardState;
  private static configuration: Configuration;
  private static application: Electron.App;

  constructor(app: Electron.App, state: DashboardState, control: AutomaticControl, config: Configuration) {
    Main.application = app;
    Main.configuration = config;
    Main.state = state;
    Main.control = control;
  }

  public Initialize() {
    const self = this;
    Main.application.on("ready", () => self.onReady());
  }

  private onReady() {
    // Display index file until first dashboard is ready
    const indexWindow = this.loadIndex();
    indexWindow.show();

    // Start loading first dashboard
    Main.state.CurrentDashboard.Preload();
    Main.state.CurrentDashboard.OnceReady(() => {
      Main.control.Play();
      indexWindow.destroy();
    });
  }

  private loadIndex(): BrowserWindow {
    const indexWindow = new BrowserWindow({ fullscreen: true });
    indexWindow.loadURL(
      format({
        pathname: process.cwd() + "/assets/index.html",
        protocol: "file",
        slashes: true,
      }),
    );
    return indexWindow;
  }
}
