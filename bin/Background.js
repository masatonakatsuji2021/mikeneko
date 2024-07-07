"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Util_1 = require("Util");
const App_1 = require("app/config/App");
class Background {
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            // background class method load.
            if (App_1.MyApp.backgrounds) {
                for (let n = 0; n < App_1.MyApp.backgrounds.length; n++) {
                    const backgroundName = Util_1.Util.getModulePath(App_1.MyApp.backgrounds[n]);
                    const backgroundPath = "app/backgrounds/" + backgroundName;
                    if (!useExists(backgroundPath))
                        continue;
                    const bg = use(backgroundPath);
                    yield bg.handle();
                }
            }
        });
    }
    /**
     * ***handle*** : A handler that is executed immediately after the application starts.
     */
    handle() { }
}
exports.Background = Background;
