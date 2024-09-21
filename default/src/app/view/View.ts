import { View as BaseView } from "View";
import { HeaderUI } from "app/ui/HeaderUI";

export class View extends BaseView {

    public template: string = "default";

    public head: string = "head";

    public header: string = "header";

    public handleBefore() {
        console.log("handle before ... ok");
    }

    public set title(title: string) {
        HeaderUI.title(title);
    }
}