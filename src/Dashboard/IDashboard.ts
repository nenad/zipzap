interface IDashboard {
  /**
   * Preload prepares the screen for showing
   * e.g. Creates BrowserWindow and calls loadURL on it
   */
  Preload(): void;

  /**
   * The callback is called when Preload finishes for the first time
   */
  OnceReady(callback: () => void): void;

  /**
   * The callback is called when Preload finishes
   */
  OnReady(callback: () => void): void;

  /**
   * Show displays the dashboard
   */
  Show(): void;

  /**
   * Duration returns the duration in milliseconds
   */
  Duration(): number;

  /**
   * Hide hides the dashboard
   */
  Hide(): void;
}
