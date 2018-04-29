import { app } from "electron";
import Configuration from "./Configuration/Configuration";
import AutomaticControl from "./Control/AutomaticControl";
import DashboardState from "./Dashboard/DashboardState";
import Main from "./Main";

const config = Configuration.LoadFromFile(process.cwd() + "/config.json");
const state = new DashboardState(config.Dashboards);
const control = new AutomaticControl(state);

const mainApp = new Main(app, state, control, config);
mainApp.Initialize();
