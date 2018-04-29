import DashboardState from "../Dashboard/DashboardState";

export default class AutomaticControl {
  private timeout?: NodeJS.Timer;
  private state: DashboardState;

  constructor(state: DashboardState) {
    this.state = state;
  }

  public Play() {
    const self = this;

    this.state.NextDashboard.Preload();
    this.state.CurrentDashboard.Show();
    this.timeout = setTimeout(
      () => self.Forward(),
      self.state.CurrentDashboard.Duration(),
    );
  }

  public Pause() {
    clearTimeout(this.timeout!);
  }

  public Forward() {
    this.state.CurrentDashboard.Hide();
    this.state.ChangeNext();
    this.Play();
  }
}
