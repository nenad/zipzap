import { BrowserWindow, screen } from "electron";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as tmp from "tmp";

export default class URLDashboard implements IDashboard {
  private uri: string;
  private duration: number;
  private isRawHTML: boolean;
  private uriOptions?: Electron.LoadURLOptions;
  private window!: BrowserWindow;

  constructor(uri: string, duration: number, isRawHTML = false, options?: Electron.LoadURLOptions) {
    this.uri = uri;
    this.duration = duration;
    this.uriOptions = options;
    this.isRawHTML = isRawHTML;
  }

  public Preload(): void {
    this.window = new BrowserWindow({
      backgroundColor: "#333333",
      height: screen.getPrimaryDisplay().workAreaSize.height,
      show: false,
      width: screen.getPrimaryDisplay().workAreaSize.width,
    });

    if (this.isRawHTML) {
      https.get(this.uri, (res: http.IncomingMessage) => {
        let output = "";
        res.setEncoding("utf8");

        res.on("data", (chunk) => {
          output += chunk;
        });

        res.on("end", () => {
          const tmpFile = tmp.fileSync();
          fs.writeSync(tmpFile.fd, output);
          this.window.loadURL("file://" + tmpFile.name, this.uriOptions);
          fs.closeSync(tmpFile.fd);
        });
      });
    } else {
      this.window.loadURL(this.uri, this.uriOptions);
    }
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
