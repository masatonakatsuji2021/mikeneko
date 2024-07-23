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
class Background {
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
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
