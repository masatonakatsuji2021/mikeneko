import { Transition } from "Transition";
import { View } from "app/view/View";
import { Maps } from "app/config/Maps";

export class HomeView extends View {

    public handle() {
        console.log("home handle ... ok");

        this.title = "Mikeneko";

        this.vdos.page1.onClick = () => {
            Transition.move(Maps.page1);
        };
    }
}