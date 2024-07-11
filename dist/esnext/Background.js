"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Util_1 = require("Util");
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
                const bg = use(backgroundPath);
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
