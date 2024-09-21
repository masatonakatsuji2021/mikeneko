import { Response } from "Response";
import { View } from "app/view/View";

export class Page1View extends View {

    public handle() {
        console.log("page1 handle ... ok");

        this.title = "Page1";

        this.mjs.description.text = "page1 description text sample....";

        this.mjs.back.onClick = () => {
            Response.back();
        };
    }
}