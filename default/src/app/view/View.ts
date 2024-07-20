import { View as BaseView } from "View";

export class View extends BaseView {

    public template: string = "default";

    public head: string = "head";

    public header: string = "header";

    public handleBefore() {
        console.log("handle before ... ok");
    }
}