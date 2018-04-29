export default class DashboardState {
  Start(): any {
    throw new Error("Method not implemented.");
  }
  private dashboards: IDashboard[];
  private currentIndex = 0;
  private currentDashboard?: IDashboard;

  constructor(dashboards: IDashboard[]) {
    if (dashboards.length === 0) {
      throw new Error("You must have at least one dashboard.");
    }
    this.dashboards = dashboards;
    this.currentDashboard = dashboards[this.currentIndex];
  }

  public ChangeNext() {
    this.currentIndex = this.nextIndex;
    this.currentDashboard! = this.NextDashboard;
  }

  public ChangePrevious() {
    this.currentIndex = this.prevIndex;
    this.currentDashboard! = this.PreviousDashboard;
  }

  get PreviousDashboard(): IDashboard {
    return this.dashboards[this.prevIndex];
  }

  get CurrentDashboard(): IDashboard {
    return this.dashboards[this.currentIndex];
  }

  get NextDashboard(): IDashboard {
    return this.dashboards[this.nextIndex];
  }

  private get nextIndex(): number {
    return this.currentIndex + 1 === this.dashboards.length
      ? 0
      : this.currentIndex + 1;
  }

  private get prevIndex(): number {
    return this.currentIndex - 1 < 0
      ? this.dashboards.length - 1
      : this.currentIndex - 1;
  }
}
