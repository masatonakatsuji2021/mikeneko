"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcode = void 0;
/**
 * ***Shortcode*** : Classes for creating shortcodes
 */
class Shortcode {
    static shortCodes = {};
    static add(name, handle) {
        this.shortCodes[name] = handle;
    }
    static getHandle(name) {
        return this.shortCodes[name];
    }
    static analysis(codeString) {
        const regex = /\[short_(.*?)\]/g;
        const matchs = codeString.match(regex);
        if (!matchs)
            return codeString;
        matchs.forEach((match) => {
            const match_ = match.substring("[short_".length, match.length - 1);
            const ms = match_.split(",");
            let name;
            let args = {};
            for (let n = 0; n < ms.length; n++) {
                const ms_ = ms[n];
                if (n == 0) {
                    name = ms_;
                    continue;
                }
                const ms__ = ms_.split("=");
                const field = ms__[0].trim();
                const value = ms__[1].trim();
                args[field] = value;
            }
            if (!this.shortCodes[name])
                return;
            let result = this.shortCodes[name](args);
            if (!result)
                result = "";
            codeString = codeString.split(match).join(result);
        });
        return codeString;
    }
}
exports.Shortcode = Shortcode;
