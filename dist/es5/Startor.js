"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.Startor = void 0;
var App_1 = require("App");
var Routes_1 = require("Routes");
var Render_1 = require("Render");
var Lib_1 = require("Lib");
var Data_1 = require("Data");
var View_1 = require("View");
var UI_1 = require("UI");
var Template_1 = require("Template");
var Background_1 = require("Background");
var Response_1 = require("Response");
var Shortcode_1 = require("Shortcode");
var Startor = /** @class */ (function () {
    function Startor() {
        var _this = this;
        var MyApp = require("app/config/App");
        if (!MyApp) {
            throw Error("App Class is not found.");
        }
        if (!MyApp.MyApp) {
            throw Error("App Class is not found.");
        }
        this.MyApp = MyApp.MyApp;
        this.setShortcode();
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.addEventListener("click", function (e) {
                            return _this.clickHandleDelegate(e);
                        });
                        window.addEventListener("popstate", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.popStateHandleDelegate(e)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Background_1.Background.load()];
                    case 1:
                        _a.sent();
                        url = this.MyApp.beginURL;
                        if (this.MyApp.routeType == App_1.AppRouteType.web) {
                            if (location.hash)
                                url = location.hash.substring(1);
                        }
                        Response_1.Response.next(url);
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    Startor.prototype.clickHandleDelegate = function (e) {
        if (Response_1.Response.lock)
            return false;
        // @ts-ignore
        var target = e.target;
        for (var n = 0; n < 10; n++) {
            try {
                if (!target.tagName)
                    return;
            }
            catch (error) {
                return;
            }
            if (target.tagName == "A")
                break;
            // @ts-ignore
            target = target.parentNode;
        }
        try {
            if (!target.attributes)
                return;
        }
        catch (error) {
            return;
        }
        if (!target.attributes["url"])
            return;
        // @ts-ignore
        var url = target.getAttribute("url");
        if (!url)
            return;
        Response_1.Response.next(url);
    };
    Startor.prototype.popStateHandleDelegate = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeUrl, url, route;
            return __generator(this, function (_a) {
                if (Data_1.Data.get("pageDisable")) {
                    beforeUrl = Data_1.Data.get("beforeUrl");
                    if (beforeUrl) {
                        history.pushState(null, null, beforeUrl);
                    }
                    else {
                        history.pushState(null, null);
                    }
                    return [2 /*return*/, false];
                }
                Data_1.Data.set("beforeUrl", location.hash);
                url = location.hash.substring(1);
                if (!url)
                    url = "/";
                route = Routes_1.Routes.searchRoute(url);
                Response_1.Response.rendering(route).then(function () {
                    Response_1.Response.isBack = false;
                });
                return [2 /*return*/];
            });
        });
    };
    Startor.prototype.setShortcode = function () {
        Shortcode_1.Shortcode.add("rendering", function (args) {
            if (!args.path)
                return;
            return Render_1.Render.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("view", function (args) {
            if (!args.path)
                return;
            return View_1.View.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("ui", function (args) {
            if (!args.path)
                return;
            return UI_1.UI.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("template", function (args) {
            if (!args.path)
                return;
            return Template_1.Template.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("resource", function (args) {
            if (!args.url)
                return;
            return Lib_1.Lib.getResource(args.url);
        });
        Shortcode_1.Shortcode.add("resource_dataurl", function (args) {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceDataUrl(args.url);
        });
        Shortcode_1.Shortcode.add("resource_mimtype", function (args) {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceMimeType(args.url);
        });
        Shortcode_1.Shortcode.add("uniqId", function (args) {
            if (!args.length)
                args.length = "";
            return Lib_1.Lib.uniqId(parseInt(args.length));
        });
    };
    return Startor;
}());
exports.Startor = Startor;
exports.string = Startor.toString();
