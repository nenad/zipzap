import { App, globalShortcut } from "electron";
import DashboardState from "../Dashboard/DashboardState";

export default class Control {
  private timeout?: NodeJS.Timer;
  private state: DashboardState;

  constructor(state: DashboardState) {
    this.state = state;
  }

  public AutoPlay() {
    this.state.NextDashboard.Preload();
    this.state.CurrentDashboard.Show();
    this.timeout = setTimeout(
      () => {
        this.state.CurrentDashboard.Hide();
        this.state.ChangeNext();
        this.AutoPlay();
      },
      this.state.CurrentDashboard.Duration(),
    );
  }

  public Pause() {
    clearTimeout(this.timeout!);
  }

  public Forward() {
    this.Pause();
    this.state.CurrentDashboard.Hide();
    this.state.ChangeNext();
    this.state.CurrentDashboard.Preload();
    this.state.CurrentDashboard.Show();
    this.timeout = setTimeout(() => this.AutoPlay(), 5000);
  }

  public Rewind() {
    this.Pause();
    this.state.CurrentDashboard.Hide();
    this.state.ChangePrevious();
    this.state.CurrentDashboard.Preload();
    this.state.CurrentDashboard.Show();
    this.timeout = setTimeout(() => this.AutoPlay(), 5000);
  }

  public JumpTo(num: number) {
    this.state.JumpTo(num);
  }
}
