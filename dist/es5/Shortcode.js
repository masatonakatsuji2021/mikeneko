"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcode = void 0;
var Shortcode = /** @class */ (function () {
    function Shortcode() {
    }
    Shortcode.add = function (name, handle) {
        this.shortCodes[name] = handle;
    };
    Shortcode.getHandle = function (name) {
        return this.shortCodes[name];
    };
    Shortcode.analysis = function (codeString) {
        var _this = this;
        var regex = /\[short (.*?)\]/g;
        var matchs = codeString.match(regex);
        if (!matchs)
            return codeString;
        matchs.forEach(function (match) {
            var match_ = match.substring("[short ".length, match.length - 1);
            var ms = match_.split(" ");
            var name;
            var args = {};
            for (var n = 0; n < ms.length; n++) {
                var ms_ = ms[n];
                if (n == 0) {
                    name = ms_;
                    continue;
                }
                var ms__ = ms_.split("=");
                var field = ms__[0].trim();
                var value = ms__[1].trim();
                args[field] = value;
            }
            if (!_this.shortCodes[name])
                return;
            var result = _this.shortCodes[name](args);
            if (!result)
                result = "";
            codeString = codeString.split(match).join(result);
        });
        return codeString;
    };
    Shortcode.shortCodes = {};
    return Shortcode;
}());
exports.Shortcode = Shortcode;
