import { app } from "electron";
import Main from "./Main";
import Configuration from "./Configuration/Configuration";
import DashboardState from "./Dashboard/DashboardState";
import AutomaticControl from "./Control/AutomaticControl";

var config = Configuration.LoadFromFile(process.cwd() + "/config.json");
var state = new DashboardState(config.Dashboards);
var control = new AutomaticControl(state);

var mainApp = new Main(app, state, control, config);
mainApp.Initialize();
