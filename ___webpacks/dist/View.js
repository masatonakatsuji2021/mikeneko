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
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Render_1 = require("Render");
const VirtualDom_1 = require("VirtualDom");
const Lib_1 = require("Lib");
const Data_1 = require("Data");
/**
 * ***View*** : Main class for each screen.
 */
class View extends Render_1.Render {
    constructor() {
        super(...arguments);
        /**
         * ***beginStatus*** :
         */
        this.beginStatus = false;
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
         */
        this.view = null;
        /**
         * ***template*** :
         * If you have a template HTML file, specify it here.
         */
        this.template = null;
    }
    static bind(mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return super.bind(mjs, ViewName, sendData, this);
    }
    static append(mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return super.append(mjs, ViewName, sendData, this);
    }
    static stackOpen(...aregments) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const view = new this();
            const MyApp = require("app/config/App").MyApp;
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
            if (MyApp.delay)
                yield Lib_1.Lib.sleep(MyApp.delay);
            const article = VirtualDom_1.VirtualDom.create(this.getHtml(), "article");
            const main = (0, VirtualDom_1.dom)("main");
            main.append(article);
            view.mjs = main.childs;
            Data_1.Data.set("backHandle", () => __awaiter(this, void 0, void 0, function* () {
                if (MyApp.animationCloseClassName)
                    (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
                if (MyApp.animationOpenClassName)
                    (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                if (MyApp.delay)
                    yield Lib_1.Lib.sleep(MyApp.delay);
                (0, VirtualDom_1.dom)("main article:last-child").remove();
                if (MyApp.animationCloseClassName)
                    (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                if (MyApp.animationOpenClassName)
                    (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                const output = yield view.handleLeaveStackClose();
                resolve(output);
            }));
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
            if (aregments) {
                yield view.handle(...aregments);
            }
            else {
                yield view.handle();
            }
        }));
    }
    /**
     * ***handle*** :
     * A handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * handleNext
     * A handler that runs automatically when the screen is painted after advancing from the previous screen.
     */
    handleNext(...aregment) { }
    /**
     * handleBack
     * A handler that runs automatically when painting after returning from the previous screen.
     */
    handleBack(...aregment) { }
    /**
     * ***handleAlways*** : A handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    /**
     * ***handleBegin*** : A handler executed just before transitioning to the page.
     */
    handleBegin() { }
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus) { }
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus) { }
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus) { }
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus) { }
    /**
     * ***handleLeave*** : A handler executed when leaving the page.
     */
    handleLeave() { }
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     */
    handleLeaveBack() { }
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     */
    handleLeaveNext() { }
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged(template) { }
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged(head) { }
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged(header) { }
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    handleFooterChanged(footer) { }
    /**
     * ***handleLeaveStackClose*** : Handler that is executed when the screen is removed after being temporarily displayed foreground using stackOpen
     * @returns
     */
    handleLeaveStackClose() { return; }
}
exports.View = View;
View.type = "View";