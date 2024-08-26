"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.AppRouteType = void 0;
var AppRouteType;
(function (AppRouteType) {
    AppRouteType["web"] = "web";
    AppRouteType["application"] = "application";
})(AppRouteType || (exports.AppRouteType = AppRouteType = {}));
class App {
    /**
     * ***appName** : Name of the application
     */
    static appName;
    /**
     * ***routeType*** : Method for page transition.
     * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
     * application =
     */
    static routeType = AppRouteType.web;
    /**
     * ***routes*** : Routing Settings
     */
    static routes;
    /**
     * ***backgrounds*** : Background class list to run
     */
    static backgrounds;
    /**
     * ***sessionStorage*** : SessionStorage Identifier
     */
    static sessionStorage;
    /**
     * ***localStorage*** : LocalStorage Identifiers
     */
    static localStorage;
    /**
     * +++delay*** : Specify the delay time for screen transitions.
     */
    static delay;
}
exports.App = App;
