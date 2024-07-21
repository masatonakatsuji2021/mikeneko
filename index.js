"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHandle = exports.Saiberian = void 0;
const Builder_1 = require("saiberian/src/Builder");
class Saiberian {
    static build(option) {
        Builder_1.Builder.build(option);
    }
}
exports.Saiberian = Saiberian;
class BuildHandle {
    static handleBegin(platform) { }
    static handleComplete(platform) { }
}
exports.BuildHandle = BuildHandle;
