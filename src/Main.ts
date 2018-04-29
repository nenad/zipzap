import { BrowserWindow, globalShortcut } from "electron";
import { format } from "url";
import Configuration from "./Configuration/Configuration";
import Control from "./Control/Control";
import DashboardState from "./Dashboard/DashboardState";

export default class Main {
  public static control: Control;
  public static state: DashboardState;
  private static configuration: Configuration;
  private static application: Electron.App;

  constructor(app: Electron.App, state: DashboardState, control: Control, config: Configuration) {
    Main.application = app;
    Main.configuration = config;
    Main.state = state;
    Main.control = control;
  }

  public Initialize() {
    Main.application.on("ready", () => this.onReady());
  }

  private onReady() {
    this.registerKeys();
    // Display index file until first dashboard is ready
    const indexWindow = this.loadIndex();
    indexWindow.show();

    // Start loading first dashboard
    Main.state.CurrentDashboard.Preload();
    Main.state.CurrentDashboard.OnceReady(() => {
      Main.control.AutoPlay();
      indexWindow.hide();
    });
  }

  private registerKeys(): void {
    globalShortcut.register("Left", () => {
      Main.control.Rewind();
    });

    globalShortcut.register("Right", () => {
      Main.control.Forward();
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
