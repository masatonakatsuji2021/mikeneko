"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page2View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const Routes_1 = require("app/config/Routes");
/**
 * Page2 View Class
 */
class Page2View extends View_1.View {
    handle() {
        this.title = "Page2";
        this.vdos.description.text = "Description Text Text Text...";
        // item (first)
        const first = this.vdos.item.first;
        first.text += "(First)";
        first.style({ color: "pink" });
        // item (last)
        const last = this.vdos.item.last;
        last.text += "(Last)";
        last.style({ color: "lightgreen" });
        // item (index = 2)
        const id3 = this.vdos.item.index(2);
        id3.text += "(target)";
        id3.style({ color: "yellow" });
        // button1
        const button1 = this.vdos.button1;
        button1.datas.alertMessage = "Alert Message Test Sample ....";
        button1.onClick = (_, my) => {
            setTimeout(() => {
                alert(my.datas.alertMessage);
            }, 200);
        };
        // link 
        this.vdos.link1.onClick = () => {
            Response_1.Response.next(Routes_1.RURL.Page2.getDetail(1));
        };
        this.vdos.link2.onClick = () => {
            Response_1.Response.next(Routes_1.RURL.Page2.getDetail(2));
        };
        this.vdos.link3.onClick = () => {
            Response_1.Response.next(Routes_1.RURL.Page2.getDetail(3));
        };
    }
}
exports.Page2View = Page2View;
