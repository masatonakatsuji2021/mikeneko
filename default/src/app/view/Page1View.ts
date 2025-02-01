import { Transition } from "Transition";
import { View } from "app/view/View";

export class Page1View extends View {

    public handle() {
        console.log("page1 handle ... ok");

        this.title = "Page1";

        this.vdos.description.text = "page1 description text sample....";

        this.vdos.back.onClick = () => {
            Transition.back();
        };
    }
}