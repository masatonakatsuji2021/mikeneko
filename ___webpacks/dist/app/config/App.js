"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
const Routes_1 = require("app/config/Routes");
/**
 * ***App Initial Setup***
 */
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
// routeType
MyApp.routeType = App_1.AppRouteType.application;
// routes
MyApp.routes = Routes_1.MyRoutes;
MyApp.notFoundView = "notFound";
MyApp.delay = 200;
MyApp.animationOpenClassName = "open";
MyApp.animationCloseClassName = "close";
