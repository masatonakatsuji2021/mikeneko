"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VDom = exports.Dom = exports.DomControl = exports.DomStatic = void 0;
var Util_1 = require("Util");
/*
const EventTypes = [
    "click",
    "dblclick",
    "contextmenu",
    "change",
    "focus",
    "mousemove",
    "mouseup",
    "mousedown",
    "keyup",
    "keydown",
    "keypress",
] as const;
*/
var DomStatic = /** @class */ (function () {
    function DomStatic() {
    }
    DomStatic.uids = {};
    DomStatic.events = {};
    return DomStatic;
}());
exports.DomStatic = DomStatic;
var DomControl = /** @class */ (function () {
    function DomControl(qs) {
        this._qs = null;
        this._virtual = false;
        this.renderingRefreshStatus = true;
        this._qs = qs;
        for (var n = 0; n < this._qs.length; n++) {
            var qs_ = this._qs[n];
            if (!qs_.uid) {
                var uid = Util_1.Util.uniqId();
                qs_.uid = uid;
            }
        }
    }
    DomControl.load = function (selector) {
        var fullSelector = "";
        if (selector) {
            if (typeof selector == "string") {
                fullSelector = "html " + selector;
            }
            else {
                var selectList = [];
                if (!Array.isArray(selector)) {
                    if (selector instanceof NodeList) {
                        // @ts-ignore
                        selectList = selector;
                    }
                    else {
                        selectList = [selector];
                    }
                }
                else {
                    selectList = selector;
                }
                return new DomControl(selectList);
            }
        }
        else {
            fullSelector = "html *";
        }
        var qs = document.querySelectorAll(fullSelector);
        return new DomControl(qs);
    };
    DomControl.loadOnVirtual = function (refName) {
        var v = [];
        if (refName) {
            var v1 = void 0;
            var v2 = void 0;
            v1 = DomControl.load().findOnVirtual("__ref", refName);
            for (var n = 0; n < v1._qs.length; n++) {
                var q_ = v1._qs[n];
                v.push(q_);
            }
            if (refName.indexOf("*") > -1) {
                var rns = refName.split("*");
                var selector = "";
                if (!rns[0].trim()) {
                    selector = "[ref$=\"" + rns[1] + "\"]";
                }
                else {
                    selector = "[ref^=\"" + rns[0] + "\"]";
                }
                v2 = DomControl.load(selector);
                for (var n = 0; n < v2.length; n++) {
                    var v2_ = v2.index(n);
                    var refName2 = v2_.attr("ref");
                    v2_.virtual("__ref", refName2);
                }
            }
            else {
                v2 = DomControl.load("[ref=\"" + refName + "\"]");
                v2.virtual("__ref", refName);
            }
            v2.removeAttr("ref");
            for (var n = 0; n < v2._qs.length; n++) {
                var q_ = v2._qs[n];
                v.push(q_);
            }
        }
        var vdo = new DomControl(v);
        vdo._virtual = true;
        return vdo;
    };
    Object.defineProperty(DomControl.prototype, "get", {
        /**
         * ***get*** :
         * Get the document information of the get DOM.
         */
        get: function () {
            return this._qs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "length", {
        /**
         * ***length*** :
         * Get the number of elements in the get DOM.
         * @returns {number} length
         */
        get: function () {
            return this._qs.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "exists", {
        /**
         * ***exists*** :
         * Determine whether an element exists.
         * @returns {bolean} judgment result
         */
        get: function () {
            if (this._qs.length) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "first", {
        /**
         * ***first*** :
         * Specifies the first element.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[0]]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "last", {
        /**
         * ***last*** :
         * Specifies the last element.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[this._qs.length - 1]]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "parent", {
        /**
         * ***parent*** :
         * Specifies the parent element one level above.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var res = new DomControl([this._qs[this._qs.length - 1].parentNode]);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***index*** :
     * Specifies the element at the index specified by the argument
     * @param {number} index element index
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.index = function (index) {
        var res = new DomControl([this._qs[index]]);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    Object.defineProperty(DomControl.prototype, "even", {
        /**
         * ***even*** :
         * Extract even element information only.
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var qs_ = [];
            for (var n = 0; n < this._qs.length; n++) {
                var q_ = this._qs[n];
                if (n % 2 == 0) {
                    qs_.push(q_);
                }
            }
            var res = new DomControl(qs_);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "odd", {
        /**
         * ***odd*** :
         * Extract only odd element information
         * @returns {DomControl} DomControl Class Object
         */
        get: function () {
            var qs_ = [];
            for (var n = 0; n < this._qs.length; n++) {
                var q_ = this._qs[n];
                if (n % 2 == 1) {
                    qs_.push(q_);
                }
            }
            var res = new DomControl(qs_);
            res._virtual = this._virtual;
            res.renderingRefreshStatus = this.renderingRefreshStatus;
            return res;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***findOnAttr*** :
     * Specifies only elements that contain attribute information that matches the conditions of the argument.
     * @param {string} name attribute name
     * @param {string|number} value attribute value
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.findOnAttr = function (name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.attributes[name]) {
                continue;
            }
            if (qs.attributes[name].value == value) {
                qss.push(qs);
            }
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    /**
     * ***findOnVirtual*** :
     * Specify only elements that contain Virtual attribute information that matches the argument conditions.
     * @param {string} name virtual attribute name
     * @param {any} value virtual attribute value
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.findOnVirtual = function (name, value) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!qs.uid) {
                continue;
            }
            if (!DomStatic.uids[qs.uid]) {
                continue;
            }
            var uids = DomStatic.uids[qs.uid];
            if (!uids.virtual) {
                continue;
            }
            if (!uids.virtual[name]) {
                continue;
            }
            var targetValue = uids.virtual[name].toString();
            if (value.toString().indexOf("*") > -1) {
                var vns = value.split("*");
                var judge = false;
                if (!vns[0].trim()) {
                    if (targetValue.indexOf(vns[1]) > 0) {
                        judge = true;
                    }
                }
                else {
                    if (targetValue.indexOf(vns[0]) === 0) {
                        judge = true;
                    }
                }
                if (!judge) {
                    continue;
                }
            }
            else {
                if (uids.virtual[name] != value) {
                    continue;
                }
            }
            qss.push(qs);
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    DomControl.prototype.child = function (selector) {
        if (this._virtual) {
            return this.childVirtual(selector);
        }
        else {
            return this.childDom(selector);
        }
    };
    DomControl.prototype.childDom = function (selector) {
        var qss = [];
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var buff = void 0;
            if (selector) {
                buff = qs.querySelectorAll(selector);
            }
            else {
                buff = qs.childNodes;
            }
            buff.forEach(function (b_) {
                qss.push(b_);
            });
        }
        var res = new DomControl(qss);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    DomControl.prototype.childVirtual = function (refName) {
        var v = [];
        var v1;
        var v2;
        v1 = this.childDom().findOnVirtual("__ref", refName);
        for (var n = 0; n < v1._qs.length; n++) {
            var q_ = v1._qs[n];
            v.push(q_);
        }
        if (!refName) {
            refName = "*";
        }
        if (refName.indexOf("*") > -1) {
            var rns = refName.split("*");
            if (!rns[0].trim()) {
                v2 = this.childDom("[ref$=\"" + rns[1] + "\"]");
            }
            else {
                v2 = this.childDom("[ref^=\"" + rns[0] + "\"]");
            }
            for (var n = 0; n < v2.length; n++) {
                var v2_ = v2.index(n);
                var ref = v2_.attr("ref");
                v2_.virtual("__ref", ref);
            }
        }
        else {
            v2 = this.childDom("[ref=\"" + refName + "\"]");
            v2.virtual("__ref", refName);
        }
        v2.removeAttr("ref");
        for (var n = 0; n < v2._qs.length; n++) {
            var q_ = v2._qs[n];
            v.push(q_);
        }
        var res = new DomControl(v);
        res._virtual = this._virtual;
        res.renderingRefreshStatus = this.renderingRefreshStatus;
        return res;
    };
    Object.defineProperty(DomControl.prototype, "text", {
        /**
         * ***text*** :
         * get/set the text inside the element tag
         */
        get: function () {
            return this._qs[this._qs.length - 1].innerText;
        },
        set: function (text) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerText = text;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "html", {
        /**
         * ***html*** :
         * Get/Set the HTML inside the element tag (innerHTML)
         */
        get: function () {
            return this._qs[this._qs.length - 1].innerHTML;
        },
        set: function (html) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.innerHTML = html;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "outerHtml", {
        /**
         * ***outerHtml*** :
         * Get/Set the HTML inside the element tag (outerHTML)
         */
        get: function () {
            return this._qs[this._qs.length - 1].outerHTML;
        },
        set: function (html) {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.outerHtml = html;
            }
            this.renderingRefresh();
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.append = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforeend", contents);
            }
            else {
                qs.append(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    /**
     * ***stamp*** :
     *
     * @param {string} stampSource
     * @param {Function} callback
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.stamp = function (stampSource, callback) {
        this.append(stampSource);
        var target = this.childDom().last;
        callback(target);
        return this;
    };
    DomControl.prototype.before = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("beforebegin", contents);
            }
            else {
                qs.before(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    DomControl.prototype.after = function (contents) {
        this._qs.forEach(function (qs) {
            if (typeof contents == "string") {
                qs.insertAdjacentHTML("afterend", contents);
            }
            else {
                qs.after(contents);
            }
        });
        this.renderingRefresh();
        return this;
    };
    /**
     * ***remove*** :
     * remove the element
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.remove = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.remove();
        }
        return this;
    };
    /**
     * ***empty*** :
     * clear inside element
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.empty = function () {
        this.html = "";
        return this;
    };
    /**
     * ***on*** :
     * set the event handler.
     * @param {DocumentEventMap} eventName event name
     * @param {Function} callback callback function
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.on = function (eventName, callback, bindClass) {
        var eventCallback = function (e) {
            var targetDom = new DomControl([e.target]);
            if (bindClass) {
                callback = callback.bind(bindClass);
            }
            callback(targetDom, e);
        };
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.addEventListener(eventName, eventCallback);
        }
        if (!DomStatic.events[qs.uid])
            DomStatic.events[qs.uid] = {};
        if (!DomStatic.events[qs.uid][eventName])
            DomStatic.events[qs.uid][eventName] = [];
        DomStatic.events[qs.uid][eventName].push(eventCallback);
        console.log(DomStatic.events);
        return this;
    };
    Object.defineProperty(DomControl.prototype, "onClick", {
        /**
         * ***onClick*** :
         * Wrapper function when eventname of on method is set to "click".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("click", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onContextmenu", {
        /**
         * ***onContextmenu*** :
         * Wrapper function when eventname of on method is set to "contextmenu".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("contextmenu", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onChange", {
        /**
         * ***onChange*** :
         * Wrapper function when eventname of on method is set to "change".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("change", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyUp", {
        /**
         * ***onKeyUp*** :
         * Wrapper function when eventname of on method is set to "keyup".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keyup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyDown", {
        /**
         * ***onKeyDown*** :
         * Wrapper function when eventname of on method is set to "onKeyDown".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keyup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onKeyPress", {
        /**
         * ***onKeyPress*** :
         * Wrapper function when eventname of on method is set to "keypress".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("keypress", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseUp", {
        /**
         * ***onMouseUp**** :
         * Wrapper function when eventname of on method is set to "mouseup".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mouseup", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseDown", {
        /**
         * ***onMouseDown*** :
         * Wrapper function when eventname of on method is set to "mousedown".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mousedown", callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "onMouseMove", {
        /**
         * ***onMouseMove*** :
         * Wrapper function when eventname of on method is set to "mousemove".
         * @param {Function} callback callback function
         */
        set: function (callback) {
            this.on("mousemove", callback);
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.attribute = function (name, value) {
        if (value == undefined) {
            return this._qs[this._qs.length - 1].attributes[name].value;
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                qs.setAttribute(name, value);
            }
            return this;
        }
    };
    DomControl.prototype.attr = function (name, value) {
        return this.attribute(name, value);
    };
    /**
     * ***removeAttribute*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeAttribute = function (name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.removeAttribute(name);
        }
        return this;
    };
    /**
     * ***removeAttr*** :
     * Delete attribute information
     * @param {string} name attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeAttr = function (name) {
        return this.removeAttribute(name);
    };
    DomControl.prototype.virtual = function (name, value) {
        if (this._qs.length == 0) {
            return;
        }
        if (value == undefined) {
            var qs = this._qs[this._qs.length - 1];
            if (!DomStatic.uids[qs.uid]) {
                return null;
            }
            var uids = DomStatic.uids[qs.uid];
            if (!uids.virtual) {
                return null;
            }
            if (!uids.virtual[name]) {
                return null;
            }
            return uids.virtual[name];
        }
        else {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (!DomStatic.uids[qs.uid]) {
                    DomStatic.uids[qs.uid] = {};
                }
                if (!DomStatic.uids[qs.uid].virtual) {
                    DomStatic.uids[qs.uid].virtual = {};
                    DomStatic.uids[qs.uid].target = qs;
                }
                DomStatic.uids[qs.uid].virtual[name] = value;
            }
            return this;
        }
    };
    /**
     * ***removeVirtual*** :
     * Delete virtual attribute information
     * @param {string} name virtual attribute name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeVirtual = function (name) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            if (!DomStatic.uids[qs.uid]) {
                continue;
            }
            if (!DomStatic.uids[qs.uid].virtual) {
                continue;
            }
            delete DomStatic.uids[qs.uid].virtual[name];
            // @ts-ignore
            if (DomStatic.uids[qs.uid].virtual == {}) {
                delete DomStatic.uids[qs.uid].virtual;
            }
            // @ts-ignore
            if (DomStatic.uids[qs.uid] == {}) {
                delete DomStatic.uids[qs.uid];
            }
        }
        return this;
    };
    /**
     * ***style*** :
     * Sets stylesheet information.
     * @param {object} options stylesheet attribute information
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.style = function (options) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var columns = Object.keys(options);
            for (var n2 = 0; n2 < columns.length; n2++) {
                var key = columns[n2];
                var val = options[key];
                qs.style[key] = val;
            }
        }
        return this;
    };
    DomControl.prototype.getStyle = function (name) {
        var qs = this._qs[this._qs.length - 1];
        if (name) {
            if (!qs.style[name]) {
                return null;
            }
            return qs.style[name];
        }
        else {
            return qs.style;
        }
    };
    DomControl.prototype.addClass = function (className) {
        if (typeof className == "string") {
            className = [className];
        }
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            for (var n2 = 0; n2 < className.length; n2++) {
                var c = className[n2];
                qs.classList.add(c);
            }
        }
        return this;
    };
    /**
     * ***removeClass*** :
     * remove the class attribute
     * @param {string} className Delete class name
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.removeClass = function (className) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.classList.remove(className);
        }
        return this;
    };
    /**
     * ***isClass*** :
     * Checks if the specified class exists in the element
     * @param {string} className Delete class name
     * @returns {boolean} exists status
     */
    DomControl.prototype.isClass = function (className) {
        var qs = this._qs[this._qs.length - 1];
        return qs.classList.contains(className);
    };
    DomControl.prototype.value = function (value) {
        if (value == undefined) {
            return this.get_value_default(0);
        }
        else {
            return this.set_value_Default(0, value);
        }
    };
    DomControl.prototype.default = function (value) {
        if (value == undefined) {
            return this.get_value_default(1);
        }
        else {
            return this.set_value_Default(1, value);
        }
    };
    DomControl.prototype.get_value_default = function (mode) {
        var qs = this._qs[this._qs.length - 1];
        if (qs.type == "radio") {
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    return qs.value;
                }
            }
        }
        else if (qs.type == "checkbox") {
            var result = [];
            for (var n = 0; n < this._qs.length; n++) {
                var qs = this._qs[n];
                if (qs.checked == true) {
                    result.push(qs.value);
                }
            }
            return result;
        }
        else {
            return qs.value;
        }
    };
    DomControl.prototype.set_value_Default = function (mode, value) {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            var type = qs.type;
            if (type == "radio") {
                if (qs.value == value) {
                    if (mode == 0) {
                        qs.checked = true;
                    }
                    else {
                        qs.setAttribute("checked", true);
                    }
                }
                else {
                    if (mode == 0) {
                        qs.checked = false;
                    }
                    else {
                        qs.removeAttribute("checked");
                    }
                }
            }
            else if (type == "checkbox") {
                if (typeof value == "string") {
                    value = [value];
                }
                if (mode == 0) {
                    qs.checked = false;
                }
                else {
                    qs.removeAttribute("checked");
                }
                for (var n2 = 0; n2 < value.length; n2++) {
                    var v = value[n2];
                    if (qs.value == v) {
                        if (mode == 0) {
                            qs.checked = true;
                        }
                        else {
                            qs.setAttribute("checked", true);
                        }
                    }
                }
            }
            else {
                if (mode == 0) {
                    qs.value = value;
                }
                else {
                    qs.setAttribute("value", value);
                }
            }
        }
        return this;
    };
    DomControl.prototype.valueIncrement = function (step) {
        var value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        var min = this.attr("min");
        var max = this.attr("max");
        value++;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    };
    DomControl.prototype.valueDecrement = function (step) {
        var value = this.value();
        if (!step) {
            step = parseInt(this.attr("step"));
        }
        var min = this.attr("min");
        var max = this.attr("max");
        value--;
        if (min) {
            if (value < min) {
                value = min;
            }
        }
        if (max) {
            if (value > max) {
                value = max;
            }
        }
        return this.value(value);
    };
    Object.defineProperty(DomControl.prototype, "nodeName", {
        /**
         * ***nodeName*** :
         * get the node name of an element.
         */
        get: function () {
            var qs = this._qs[this._qs.length - 1];
            return qs.localName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DomControl.prototype, "type", {
        /**
         * ***type*** :
         * get the type attribute.
         */
        get: function () {
            return this.attr("type");
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***click*** :
     * performs a click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.click = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.click();
        }
        return this;
    };
    /**
     * ***dblclick*** :
     * Performs a double click on an element.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.dblclick = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    };
    /**
     * ***submit*** :
     * Executes element submission.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.submit = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.dblclick();
        }
        return this;
    };
    /**
     * ***focus*** :
     * Performs element focus.
     * @returns {DomControl} DomControl Class Object
     */
    DomControl.prototype.focus = function () {
        for (var n = 0; n < this._qs.length; n++) {
            var qs = this._qs[n];
            qs.focus();
        }
        return this;
    };
    /**
   * ***refresh*** :
   * @returns {VDomControl} VDomCOntrol Class Object
   */
    DomControl.prototype.refresh = function () {
        if (!this._virtual)
            return this;
        var c = Object.keys(DomStatic.uids);
        for (var n = 0; n < c.length; n++) {
            var uid = c[n];
            var obj = DomStatic.uids[uid];
            if (!document.body.contains(obj.target)) {
                delete DomStatic.uids[uid];
            }
        }
        return this;
    };
    Object.defineProperty(DomControl.prototype, "ref", {
        get: function () {
            if (this._virtual) {
                return this.virtual("__ref");
            }
        },
        enumerable: false,
        configurable: true
    });
    DomControl.prototype.renderingRefresh = function () {
        if (this.renderingRefreshStatus)
            return;
        /*
        for(let n = 0 ; n < EventTypes.length; n++){
            const eventType = EventTypes[n];
            const target = "v-on-" + eventType;
            const search = DomControl.load("[" + target + "]");
            for(let n2 = 0 ; n2 < search.length ; n2++){
                const s_ = search.index(n2);
                const handleName = s_.attribute(target);
                s_.removeAttribute(target);
                if(Data.__before_controller){
                    if(Data.__before_controller[handleName]){
                        s_.on(eventType, Data.__before_controller[handleName], Data.__before_controller);
                    }
                }
                if(Data.__before_view){
                    if(Data.__before_view[handleName]){
                        s_.on(eventType, Data.__before_view[handleName], Data.__before_view);
                    }
                }

                if(Data.__child_classs){
                    const c = Object.keys(Data.__child_classs);
                    for(let n = 0 ; n < c.length ; n++){
                        const classPath = c[n];
                        const childClass = Data.__child_classs[classPath];
                        if(childClass[handleName]){
                            s_.on(eventType, childClass[handleName], childClass);
                        }
                    }
                }
            }
        }
        */
    };
    return DomControl;
}());
exports.DomControl = DomControl;
exports.Dom = DomControl.load;
exports.VDom = DomControl.loadOnVirtual;
