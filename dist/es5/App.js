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
var App = /** @class */ (function () {
    function App() {
    }
    /**
     * ***routeType*** : Method for page transition.
     * application = A mode for building apps. Screen transition history is managed and operated by the app.
     * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
     */
    App.routeType = AppRouteType.web;
    /**
     * ***delay*** : Specify the delay time for screen transitions.
     * Default is 100 (ms).
     * If you specify 0, the button will transition immediately without executing the animation when pressed.
     */
    App.delay = 100;
    return App;
}());
exports.App = App;
