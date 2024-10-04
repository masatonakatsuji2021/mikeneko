var platform = "{{platform}}";
var FrontControl = /** @class */ (function () {
    function FrontControl() {
        this.__fn = {};
        this.__fn_static = {};
    }
    FrontControl.prototype.setFn = function (name, callback) {
        this.__fn[name] = callback;
    };
    FrontControl.prototype.getFn = function (name) {
        if (this.__fn_static[name])
            return this.__fn_static[name];
        if (!this.__fn[name])
            throw ("No data available. Check if the file exists in the source file \"" + name + "\".");
        var buffer = this.__fn[name]();
        if (typeof buffer == "object") {
            var c = Object.keys(buffer);
            for (var n = 0; n < c.length; n++) {
                var cn = c[n];
                try {
                    buffer[cn].___PATH___ = name;
                }
                catch (error) { }
            }
        }
        if (this.__fn_static[name] == undefined)
            this.__fn_static[name] = buffer;
        return buffer;
    };
    FrontControl.prototype.exists = function (name) {
        if (this.__fn_static[name])
            return true;
        if (this.__fn[name])
            return true;
        return false;
    };
    FrontControl.prototype.start = function (callback) {
        var _this = this;
        window.onload = function () {
            if (callback) {
                callback.bind(_this)();
            }
            else {
                use("app/index");
            }
        };
    };
    return FrontControl;
}());
var use = function (name) {
    return sfa.getFn(name);
};
var useExists = function (name) {
    return sfa.exists(name);
};
// @ts-ignore
require = use;
var sfa = new FrontControl();
