import DashboardState from "../Dashboard/DashboardState";

export default class AutomaticControl {
  private timeout?: NodeJS.Timer;
  private coordinator: DashboardState;

  constructor(coordinator: DashboardState) {
    this.coordinator = coordinator;
  }

  public Play() {
    var self = this;

    this.coordinator.NextDashboard.Preload();
    this.coordinator.CurrentDashboard.Show();
    this.timeout = setTimeout(
      () => self.Forward(),
      self.coordinator.CurrentDashboard.Duration()
    );
  }

  public Pause() {
    clearTimeout(this.timeout!);
  }

  public Forward() {
    this.coordinator.CurrentDashboard.Hide();
    this.coordinator.ChangeNext();
    this.Play();
  }
}
