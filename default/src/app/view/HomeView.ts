import { Response } from "Response";
import { View } from "app/view/View";

export class HomeView extends View {

    public handle() {
        console.log("home handle ... ok");

        this.title = "Mikeneko";

        this.mjs.page1.onClick = () => {
            Response.next("/page1");
        };
    }
}