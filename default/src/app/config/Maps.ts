import { HomeView } from "app/view/HomeView";
import { Page1View } from "app/view/Page1View";
import { RMap } from "RouteMap";

export const Maps = {

    /** Home */
    home: RMap({ url : "/", view: HomeView }),

    /** Sample Page1 */
    page1: RMap({ url : "/page1", view: Page1View }),
};