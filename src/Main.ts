import "path";
import Configuration from "./Configuration/Configuration";
import DashboardState from "./Dashboard/DashboardState";
import AutomaticControl from "./Control/AutomaticControl";

export default class Main {
  static control: AutomaticControl;
  static state: DashboardState;
  private static configuration: Configuration;
  private static application: Electron.App;

  constructor(
    app: Electron.App,
    state: DashboardState,
    control: AutomaticControl,
    config: Configuration
  ) {
    Main.application = app;
    Main.configuration = config;
    Main.state = state;
    Main.control = control;
  }

  public Initialize() {
    Main.application.on("ready", this.onReady);
    //TODO Handle all windows closed
  }

  private onReady() {
    Main.state.CurrentDashboard.Preload();
    Main.state.CurrentDashboard.OnceReady(() => {
      Main.control.Play();
    });
  }
}
