"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.AppRouteType = void 0;
var AppRouteType;
(function (AppRouteType) {
    AppRouteType["web"] = "web";
    AppRouteType["application"] = "application";
})(AppRouteType || (exports.AppRouteType = AppRouteType = {}));
/**
 * ***App*** : Class for initial settings of the application.
 */
class App {
    /**
     * ***appName** : Name of the application
     */
    static appName;
    /**
     * ***routeType*** : Method for page transition.
     * application = A mode for building apps. Screen transition history is managed and operated by the app.
     * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
     */
    static routeType = AppRouteType.web;
    /**
     * ***routes*** : Routing Settings.
     * Enter the View or Controller name to be applied to the route path (URL) as shown below.
     * (If there is no ``c:`` or ``a:`` description, it is the View class name.)
     * ```typescript
     * public static routes : Routes = {
     *    "/" : "home",
     *    "/page1": "page1",
     *    "/page2": "page2",
     *    "/page3": {
     *       "/" : "c: page3, a: index",            // <= The index method of Page3Controller
     *       "/edit" : "c: page3, a: edit",         // <= The edit method of Page3Controller
     *    },
     *    ....
     * };
     * ```
     */
    static routes;
    /**
     * ***backgrounds*** : Background class list to run.
     * Each background class is listed in the order in which it will run.
     * ```typescript
     * public static backgrounds : Array<string> = [
     *    "Sample1",
     *    "Sample2",
     *    ...
     * ];     *
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
     * ***delay*** : Specify the delay time for screen transitions.
     * Default is 100 (ms).
     * If you specify 0, the button will transition immediately without executing the animation when pressed.
     */
    static delay = 100;
}
exports.App = App;
