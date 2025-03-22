import { Transition } from "Transition";
import { GetMaps } from "RouteMap";
import { View } from "app/view/View";
import { HeaderUI } from "app/ui/HeaderUI";

/**
 * ### HomeView
 * Main screen View class.  
 * [renderin Html see here.](../../rendering/view/home.html)
 */
export class HomeView extends View {

    /**
     * ### handle
     * Event handler after screen display.
     */
    public handle() {

        // set header title
        HeaderUI.title("Mikeneko");

        // set view background
        this.vdo.css.background = "rgb(255, 240, 200)";

        // Event handler for pressing the page1 button.
        this.vdos.page1.onClick = () => {

            // Go to page1 screen
            Transition.move(GetMaps().page1);
        };
    }
}