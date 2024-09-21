"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Lib_1 = require("Lib");
/**
 * ***Background*** : Classes that execute and manipulate business logic in the background.
 * This class starts executing immediately after the app is launched, regardless of each screen transition.
 * To use it in advance, you need to list it in backgrounds in ``app/config/App.ts``
 *
 * ```typescript
 * public backgrounds : Array<string> = [
 *    "Sample1",
 *    "Sample2",
 *    ...
 * ];
 * ```
 */
class Background {
    static async load() {
        const MyApp = use("app/config/App").MyApp;
        // background class method load.
        if (MyApp.backgrounds) {
            for (let n = 0; n < MyApp.backgrounds.length; n++) {
                const backgroundName = Lib_1.Lib.getModulePath(MyApp.backgrounds[n]);
                const backgroundPath = "app/background/" + backgroundName;
                if (!useExists(backgroundPath))
                    continue;
                const background = use(backgroundPath);
                const bg = new background[backgroundName]();
                await bg.handle();
            }
        }
    }
    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    handle() { }
}
exports.Background = Background;
