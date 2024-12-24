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
exports.HomeView = void 0;
const Lib_1 = require("Lib");
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
const Routes_1 = require("app/config/Routes");
/**
 * Home View Class
 * Display screen immediately after launching the app.
 */
class HomeView extends View_1.View {
    handleLeave() {
        console.log("handle leave ..... OK");
    }
    handleLeaveBack() {
        console.log("handle leave Back ..... OK");
    }
    handleLeaveNext() {
        console.log("handle leave next ..... OK");
    }
    handle() {
        this.back = false;
        this.title = "Home";
        // When the page1 button is pressed.
        this.vdos.page1.onClick = () => {
            // next to Page1.
            Response_1.Response.next(Routes_1.RURL.Page1.Top);
        };
        // When the page2 button is pressed.
        this.vdos.page2.onClick = () => {
            // next to Page2.
            Response_1.Response.next(Routes_1.RURL.Page2.Top);
        };
        // When the page3 button is pressed.
        this.vdos.page3.onClick = () => {
            // next to Page3.
            Response_1.Response.next(Routes_1.RURL.Page3);
        };
        // When the page4 button is pressed.
        this.vdos.page4.onClick = () => {
            // next to Page4.
            Response_1.Response.next(Routes_1.RURL.Page4.Top);
        };
        // When the page5 button is pressed.
        this.vdos.page5.onClick = () => {
            // next to Page5.
            Response_1.Response.next(Routes_1.RURL.Page5);
        };
        // When the page6 button is pressed.
        this.vdos.page6.onClick = () => __awaiter(this, void 0, void 0, function* () {
            // Lock and stop screen transition function
            Response_1.Response.lock = true;
            // Loading Dialog Open
            const load = LoadingDialog_1.LoadingDialog.open();
            load.message = "wait(1/3)....";
            // 1s wait...
            yield Lib_1.Lib.sleep(1000);
            load.message = "wait(2/3)....";
            // 1s wait...
            yield Lib_1.Lib.sleep(1000);
            load.message = "wait(3/3)....";
            // 1s wait...
            yield Lib_1.Lib.sleep(1000);
            // Loading Dialog Close.
            load.close();
            // Unlock screen transitions
            Response_1.Response.lock = false;
            // next to Page6..
            Response_1.Response.next(Routes_1.RURL.Page6);
        });
        // When the page7 button is pressed.
        this.vdos.page7.onClick = () => {
            // next to Page7.
            Response_1.Response.next(Routes_1.RURL.Page7);
        };
        // When the not found page accessed..
        this.vdos.pageNotfound.onClick = () => {
            // next to Arekore
            Response_1.Response.next(Routes_1.RURL.Arekore);
        };
    }
}
exports.HomeView = HomeView;
