"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApp = void 0;
const App_1 = require("App");
class MyApp extends App_1.App {
}
exports.MyApp = MyApp;
MyApp.routes = {
    "/": "c:main, a:index",
    "/page1": "c:main, a:page1",
    "/page2/{id}": "c:main, a:page2",
    "/page3/{id1}/{id2?": "c:main, a:page3",
    "/page4/{?id}": "c:main, a:page4",
};
