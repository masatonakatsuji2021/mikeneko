import { ModernJSList } from "ModernJS";
import { UI } from "UI";

export class HeaderUI extends UI {

    private static mjs: ModernJSList;

    public handle() {
        HeaderUI.mjs = this.mjs;
    }

    public static title(title: string) {
        this.mjs.title.text = title;
    }
}