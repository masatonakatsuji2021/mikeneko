"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.AppRouteType = void 0;
var AppRouteType;
(function (AppRouteType) {
    AppRouteType["web"] = "web";
    AppRouteType["application"] = "application";
})(AppRouteType || (exports.AppRouteType = AppRouteType = {}));
var App = /** @class */ (function () {
    function App() {
    }
    /**
     * ***routeType*** : Method for page transition.
     * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.
     * application =
     */
    App.routeType = AppRouteType.web;
    return App;
}());
exports.App = App;
