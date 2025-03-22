import { VirtualDomList } from "VirtualDom";
import { UI } from "UI";

/**
 * ### HeaderUI
 * Header UI Class.  
 * [renderin Html see here.](../../rendering/ui/header.html)
 */
export class HeaderUI extends UI {

    private static vdos: VirtualDomList;

    public handle() {
        HeaderUI.vdos = this.vdos;
    }

    /**
     * ### title
     * Setting the Header Title.
     * @param {string} title Display Title
     */
    public static title(title: string) {
        this.vdos.title.text = title;
    }
}