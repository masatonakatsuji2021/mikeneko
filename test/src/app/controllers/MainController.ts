import { VDom } from "Dom";
import { Controller } from "Controller";

export class MainController extends Controller{

    public template: string = "default";

    public head : string = "head";

    public handleBefore(beginStatus?: boolean): void {
        console.log("Main Controller Before .... OK");
    }
    
    public handleAfter(beginStatus?: boolean): void {
        console.log("Main Controller After .... OK");
    }

    public index(){
        console.log("Main Controller Index ...OK");
    }

    public page1(){
        const a = VDom("button1");

        a.on("click", ()=>{
            alert("Page1 Click ... OK");
        });
    }

}