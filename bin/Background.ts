import { Util } from "Util";
import { App } from "App";

export class Background {

    public static async load(){
        
        const MyApp : typeof App = use("app/config/App").MyApp;

        // background class method load.
       if(MyApp.backgrounds){
           for(let n = 0 ; n < MyApp.backgrounds.length ; n++){
                const backgroundName = Util.getModulePath(MyApp.backgrounds[n]);
                const backgroundPath : string = "app/background/" + backgroundName;
                if(!useExists(backgroundPath)) continue;
                const background : typeof Background = use(backgroundPath);
                const bg : Background = new background[backgroundName]();
                await bg.handle();
           }
       }
   }

    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    public handle() : void {}
}