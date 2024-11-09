"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = void 0;
var Lib_1 = require("Lib");
var Shortcode_1 = require("Shortcode");
var ModernJS_1 = require("ModernJS");
var Render = /** @class */ (function () {
    function Render() {
    }
    Object.defineProperty(Render.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Render.prototype, "vdos", {
        /**
         * ***vdos*** : Virtual DOM List of ModernJS Classes.
         * (``mjs`` is also available as a proxy.)
         *
         * Example: First, place a v attribute tag in the HTML file.
         * ```html
         * <h1 v="mainTitle"></h1>
         * ```
         * Insert text in the View class etc. as follows:
         * ```typescript
         * this.vdos.mainTitle.text = "MainTitle Text...";
         * ```
         * [How to use VirtualDOM is described in ModernJS classes.](./ModernJS.ts)
         */
        get: function () {
            return this.mjs;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***getHtml** : Get Rendering HTML content information.
     * @param {string} path rendering html Name
     * @returns {string}
     */
    Render.getHtml = function (path) {
        if (!path)
            path = Lib_1.Lib.getRenderingPath(this.___PATH___.substring("app/".length), this.type);
        var renderPath = "rendering/" + path + ".html";
        if (!useExists(renderPath)) {
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.");
            return;
        }
        var content = use(renderPath);
        content = Lib_1.Lib.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    };
    Render.renderConvert = function (content) {
        var tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0)
            tagName = "tbody";
        var el0 = document.createElement(tagName);
        el0.innerHTML = content;
        // link tag check...
        var links = el0.querySelectorAll("link");
        links.forEach(function (el) {
            var href = el.attributes["href"].value;
            if (!Lib_1.Lib.existResource(href))
                return;
            var resource = Lib_1.Lib.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        var imgs = el0.querySelectorAll("img");
        imgs.forEach(function (el) {
            var src = el.attributes["src"].value;
            if (!Lib_1.Lib.existResource(src))
                return;
            var resource = Lib_1.Lib.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    };
    /**
     * ***bindUI*** : Bind the Render content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @param {string} path render Path
     * @param {any} sendData Transmission data contents
     * @param {any} defaultClass Default Response Class Object
     * @returns {Render | UI | View | Template | Dialog}
     */
    Render.bind = function (mjs, path, sendData, defaultClass) {
        mjs.html = this.getHtml(path);
        return this.loadClass(mjs, path, sendData, defaultClass);
    };
    /**
     * ***bindUI*** : Appends the Render content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @param {string} path render Path
     * @param {any} sendData Transmission data contents
     * @param {any} defaultClass Default Response Class Object
     * @returns {Render | UI | View | Template | Dialog}
     */
    Render.append = function (mjs, path, sendData, defaultClass) {
        var myMjs = new ModernJS_1.ModernJS();
        mjs.append(this.getHtml(path), true);
        mjs.reload(myMjs);
        return this.loadClass(myMjs, path, sendData, defaultClass);
    };
    Render.loadClass = function (mjs, path, sendData, defaultClass) {
        if (path) {
            path = path + this.type;
        }
        else {
            path = this.___PATH___;
        }
        var className = Lib_1.Lib.getModuleName(path);
        var classPath = Lib_1.Lib.getModulePath("app/" + path);
        var classObj;
        try {
            var classObj_ = require(classPath);
            classObj = new classObj_[className]();
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }
        catch (error) {
            if (defaultClass) {
                classObj = new defaultClass();
            }
            else {
                classObj = new Render();
            }
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }
        if (classObj.handle)
            classObj.handle(sendData);
        return classObj;
    };
    return Render;
}());
exports.Render = Render;
