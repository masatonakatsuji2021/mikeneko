"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Util_1 = require("Util");
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
                const backgroundName = Util_1.Util.getModulePath(MyApp.backgrounds[n]);
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
