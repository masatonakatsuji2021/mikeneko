"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHandle = exports.Mikeneko = void 0;
const Builder_1 = require("mikeneko/src/Builder");
class Mikeneko {
    static build(option) {
        Builder_1.Builder.build(option);
    }
}
exports.Mikeneko = Mikeneko;
class BuildHandle {
    static handleBegin(platform) { }
    static handleComplete(platform) { }
}
exports.BuildHandle = BuildHandle;
