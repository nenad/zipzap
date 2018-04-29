import { BrowserWindow, screen } from "electron";

export default class URLDashboard implements IDashboard {
  uri: string;
  duration: number;
  uriOptions?: Electron.LoadURLOptions;
  window!: BrowserWindow;

  constructor(
    uri: string,
    duration: number,
    options?: Electron.LoadURLOptions
  ) {
    this.uri = uri;
    this.duration = duration;
    this.uriOptions = options;
  }

  Preload(): void {
    this.window = new BrowserWindow({
      backgroundColor: "#333333",
      width: screen.getPrimaryDisplay().workAreaSize.width,
      height: screen.getPrimaryDisplay().workAreaSize.height,
      show: false
    });
    this.window.loadURL(this.uri, this.uriOptions);
  }

  Show(): void {
    this.window.show();
    this.window.setFullScreen(true);
  }

  Duration(): number {
    return this.duration;
  }

  Hide(): void {
    this.window.destroy();
  }

  OnReady(callback: Function): void {
    this.window.on("ready-to-show", callback);
  }

  OnceReady(callback: Function): void {
    this.window.once("ready-to-show", callback);
  }
}
