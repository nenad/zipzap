import { app } from "electron";
import Main from "./Main";
import Configuration from "./Configuration/Configuration";
import DashboardState from "./Dashboard/DashboardState";
import AutomaticControl from "./Control/AutomaticControl";

var config = Configuration.LoadFromFile(process.cwd() + "/config.json");

var coordinator = new DashboardState(config.Dashboards);

var control = new AutomaticControl(coordinator);

var mainApp = new Main(app, coordinator, control, config);
mainApp.Initialize();
