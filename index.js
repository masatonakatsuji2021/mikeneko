"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildHandle = exports.Mikeneko = void 0;
const Builder_1 = require("mikeneko/src/Builder");
__exportStar(require("mikeneko/src/Builder"), exports);
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
