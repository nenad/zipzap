import { BrowserWindow, screen } from "electron";

export default class URLDashboard implements IDashboard {
  private uri: string;
  private duration: number;
  private uriOptions?: Electron.LoadURLOptions;
  private window!: BrowserWindow;

  constructor(uri: string, duration: number, options?: Electron.LoadURLOptions) {
    this.uri = uri;
    this.duration = duration;
    this.uriOptions = options;
  }

  public Preload(): void {
    this.window = new BrowserWindow({
      backgroundColor: "#333333",
      height: screen.getPrimaryDisplay().workAreaSize.height,
      show: false,
      width: screen.getPrimaryDisplay().workAreaSize.width,
    });
    this.window.loadURL(this.uri, this.uriOptions);
  }

  public Show(): void {
    this.window.show();
    this.window.setFullScreen(true);
  }

  public Duration(): number {
    return this.duration;
  }

  public Hide(): void {
    this.window.destroy();
  }

  public OnReady(callback: () => void): void {
    this.window.on("ready-to-show", callback);
  }

  public OnceReady(callback: () => void): void {
    this.window.once("ready-to-show", callback);
  }
}
