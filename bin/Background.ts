import { Util } from "Util";
// @ts-ignore
import { MyApp } from "app/config/App";

export class Background {

    public static async load(){
        // background class method load.
       if(MyApp.backgrounds){
           for(let n = 0 ; n < MyApp.backgrounds.length ; n++){
               const backgroundName = Util.getModulePath(MyApp.backgrounds[n]);
               const backgroundPath : string = "app/background/" + backgroundName;
               if(!useExists(backgroundPath)) continue;
               const bg : Background = use(backgroundPath);
               await bg.handle();
           }
       }
   }

    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    public handle() : void {}
}