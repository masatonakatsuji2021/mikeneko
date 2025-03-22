import { View as BaseView } from "View";

/**
 * ### View
 * Inheritance class of each View
 */
export class View extends BaseView {

    public template: string = "default";

    public head: string = "head";

    public header: string = "header";
}