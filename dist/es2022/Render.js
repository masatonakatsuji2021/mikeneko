"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = void 0;
const Lib_1 = require("Lib");
const Shortcode_1 = require("Shortcode");
const VirtualDom_1 = require("VirtualDom");
class Render {
    static type;
    static ___PATH___;
    /**
     * ***myMjs*** : Virtual Dom for content.
     * @deprecated The role of this variable has been changed to **vdo**.
     * [VirtualDom is described here](VirtualDom.ts)
     */
    myMjs;
    /**
     * ***mjs**** : Virtual DOM List of VirtualDom Classes.
     * @deprecated The role of this variable has been changed to **vdos**.
     * [VirtualDom is described here](VirtualDom.ts)
     *
     * Example: First, place a v attribute tag in the HTML file.
     * ```html
     * <h1 v="mainTitle"></h1>
     * ```
     * Insert text in the View class etc. as follows:
     * ```typescript
     * this.mjs.mainTitle.text = "MainTitle Text...";
     * ```
     * [How to use VirtualDOM is described in VirtualDom classes.](./VirtualDom.ts)
     */
    mjs;
    /**
     * ***vdo*** : Virtual Dom for content.
     * [VirtualDom is described here](VirtualDom.ts)
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of VirtualDom Classes.
     * (``mjs`` is also available as a proxy.)
     *
     * [VirtualDom is described here](VirtualDom.ts)
     *
     * Example: First, place a v attribute tag in the HTML file.
     * ```html
     * <h1 v="mainTitle"></h1>
     * ```
     * Insert text in the View class etc. as follows:
     * ```typescript
     * this.vdos.mainTitle.text = "MainTitle Text...";
     * ```
     * [How to use VirtualDOM is described in VirtualDom classes.](./VirtualDom.ts)
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***sendData*** :
     */
    sendData;
    /**
     * ***getHtml** : Get Rendering HTML content information.
     * @param {string} path rendering html Name
     * @returns {string}
     */
    static getHtml(path) {
        if (!path)
            path = Lib_1.Lib.getRenderingPath(this.___PATH___.substring("app/".length), this.type);
        const renderPath = "rendering/" + path + ".html";
        if (!useExists(renderPath)) {
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.");
            return;
        }
        let content = use(renderPath);
        if (globalThis.webpack)
            content = content.split("data:text/html;base64,").join("");
        content = Lib_1.Lib.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    }
    static renderConvert(content) {
        let tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0)
            tagName = "tbody";
        let el0 = document.createElement(tagName);
        el0.innerHTML = content;
        // link tag check...
        const links = el0.querySelectorAll("link");
        links.forEach((el) => {
            const href = el.attributes["href"].value;
            if (!Lib_1.Lib.existResource(href))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        const imgs = el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Lib_1.Lib.existResource(src))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    }
    /**
     * ***bindUI*** : Bind the Render content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Bind Virtual Dom
     * @param {string} path render Path
     * @param {any} sendData Transmission data contents
     * @param {any} defaultClass Default Response Class Object
     * @returns {Render | UI | View | Template | Dialog}
     */
    static bind(mjs, path, sendData, defaultClass) {
        mjs.html = this.getHtml(path);
        return this.loadClass(mjs, path, sendData, defaultClass);
    }
    /**
     * ***bindUI*** : Appends the Render content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Append Virtual Dom
     * @param {string} path render Path
     * @param {any} sendData Transmission data contents
     * @param {any} defaultClass Default Response Class Object
     * @returns {Render | UI | View | Template | Dialog}
     */
    static append(mjs, path, sendData, defaultClass) {
        const myMjs = new VirtualDom_1.VirtualDom();
        mjs.append(this.getHtml(path), true);
        mjs.reload(myMjs);
        return this.loadClass(myMjs, path, sendData, defaultClass);
    }
    static loadClass(mjs, path, sendData, defaultClass) {
        if (path) {
            path = path + this.type;
        }
        else {
            path = this.___PATH___;
        }
        const className = Lib_1.Lib.getModuleName(path);
        const classPath = Lib_1.Lib.getModulePath("app/" + path);
        let classObj;
        try {
            if (!useExists(classPath))
                throw Error();
            const classObj_ = use(classPath);
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
    }
}
exports.Render = Render;
