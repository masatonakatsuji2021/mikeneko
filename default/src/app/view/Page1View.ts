import { Transition } from "Transition";
import { HeaderUI } from "app/ui/HeaderUI";
import { View } from "app/view/View";

/**
 * ### Page1View
 * Page1 screen View class.  
 * [renderin Html see here.](../../rendering/view/page1.html)
 */
export class Page1View extends View {

    /**
     * ### handle
     * Event handler after screen display.
     */
    public handle() {

        // set header title
        HeaderUI.title("Page1");

        // set description
        this.vdos.description.text = "page1 description text sample....";

        // Back button press event handler.
        this.vdos.back.onClick = () => {

            // Return to previous screen
            Transition.back();
        };
    }
}