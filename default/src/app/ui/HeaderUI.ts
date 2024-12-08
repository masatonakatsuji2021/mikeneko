import { VirtualDomList } from "VirtualDom";
import { UI } from "UI";

export class HeaderUI extends UI {

    private static vdos: VirtualDomList;

    public handle() {
        HeaderUI.vdos = this.vdos;
    }

    public static title(title: string) {
        this.vdos.title.text = title;
    }
}