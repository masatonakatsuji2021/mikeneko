"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mjs = exports.dom = exports.ModernJS = void 0;
/**
 * ***ModernJS*** : Virtual DOM Classes.
 * When you specify the v attribute or v-child attribute in an HTML tag, it is recognized as a virtual DOM.
 * The v attribute is considered a globally available virtual DOM.
 * ```html
 * <div v="test"></div>
 * ```
 * The v-child attribute is recognized as a separate virtual DOM in UI, Dialog, etc.
 * ```html
 * <div v-child="name"></div>
 * ```
 */
var ModernJS = /** @class */ (function () {
    function ModernJS() {
        /**
         * ***els*** : List of target Element classes in the virtual DOM class.
         */
        this.els = [];
        /**
         * ***childs*** : The child ModernJS class for this virtual DOM.
         */
        this.childs = {};
        /**
         * ***datas*** : Virtual Data Objects.
         */
        this.datas = {};
        this.fileBuffers = [];
    }
    ModernJS.reload = function () {
        var _this = this;
        var c = Object.keys(this.buffers);
        var _loop_1 = function (n) {
            var name_1 = c[n];
            var buffer = this_1.buffers[name_1];
            buffer.els.forEach(function (el, index) {
                if (!document.body.contains(el))
                    buffer.els.splice(index);
            });
            if (!buffer.els.length)
                delete this_1.buffers[name_1];
        };
        var this_1 = this;
        for (var n = 0; n < c.length; n++) {
            _loop_1(n);
        }
        this.virtualAttributes("v", function (parent, attrValue, el) {
            if (parent) {
                if (!parent.childs[attrValue])
                    parent.childs[attrValue] = new ModernJS();
                parent.childs[attrValue].addEl(el);
            }
            else {
                if (!_this.buffers[attrValue])
                    _this.buffers[attrValue] = new ModernJS();
                _this.buffers[attrValue].addEl(el);
            }
        });
        return this.buffers;
    };
    ModernJS.virtualAttributes = function (target, handler) {
        var _this = this;
        var qss = document.querySelectorAll("[" + target + "]");
        qss.forEach(function (el) {
            var attrValue = el.attributes[target].value;
            el.removeAttribute(target);
            var parent;
            var attrValues = attrValue.split(".");
            if (attrValues.length > 1) {
                attrValue = attrValues[attrValues.length - 1];
                attrValues.forEach(function (a_, index) {
                    if (index == (attrValues.length - 1))
                        return;
                    if (index == 0) {
                        if (!_this.buffers[a_])
                            _this.buffers[a_] = new ModernJS();
                        parent = _this.buffers[a_];
                        if (!parent.els.length)
                            parent.addEl(el);
                    }
                    else {
                        if (!parent.childs[a_])
                            parent.childs[a_] = new ModernJS();
                        parent = parent.childs[a_];
                    }
                });
            }
            handler(parent, attrValue, el);
        });
    };
    ModernJS.create = function (text, tagName) {
        var mjs = new ModernJS();
        if (!tagName)
            tagName = "div";
        if (text.indexOf("<tr") === 0 || text.indexOf("<td") === 0)
            tagName = "table";
        var el = document.createElement(tagName);
        mjs.addEl(el);
        if (text)
            mjs.html = text;
        return mjs;
    };
    /**
     * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    ModernJS.dom = function (queryString) {
        var mjs = new ModernJS();
        var qss = document.querySelectorAll(queryString);
        qss.forEach(function (el) {
            mjs.addEl(el);
        });
        return mjs;
    };
    /**
     * ***addEl*** : Manually adding elements to the Virtual DOM.
     * @param {HTMLElement} el HTMLElement
     * @returns {MOdernJS}
     */
    ModernJS.prototype.addEl = function (el) {
        var _this = this;
        this.els.push(el);
        if (el.tagName != "INPUT")
            return;
        if (!el.attributes["type"])
            return;
        if (el.attributes["type"].value != "file")
            return;
        this.fileBuffers = [];
        el.addEventListener("change", function (e) {
            // @ts-ignore
            var el = e.target;
            var _loop_2 = function (n) {
                var file = el.files[n];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var file_ = file;
                    var content = e.target.result;
                    file_.result = content;
                    _this.fileBuffers.push(file_);
                };
                reader.readAsText(file);
            };
            for (var n = 0; n < el.files.length; n++) {
                _loop_2(n);
            }
        });
        return this;
    };
    /**
     * ***reload*** : Get the virtual DOM of the v-child attribute from the virtual DOM element.
     * The results can be obtained in children.
     * @param {ModernJS?} context
     */
    ModernJS.prototype.reload = function (context) {
        var _this = this;
        ModernJS.reload();
        this.els.forEach(function (el) {
            var qss = el.querySelectorAll("[v-child]");
            qss.forEach(function (el2) {
                var vname = el2.attributes["v-child"].value;
                el2.removeAttribute("v-child");
                if (context) {
                    if (!context.childs[vname])
                        context.childs[vname] = new ModernJS();
                    context.childs[vname].parent = _this;
                    context.childs[vname].addEl(el2);
                }
                else {
                    if (!_this.childs[vname])
                        _this.childs[vname] = new ModernJS();
                    _this.childs[vname].parent = _this;
                    _this.childs[vname].addEl(el2);
                }
            });
        });
    };
    Object.defineProperty(ModernJS.prototype, "length", {
        /**
         * ***length*** : Get the number of elements
         */
        get: function () {
            return this.els.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "first", {
        /**
         * ***first*** : Get the virtual DOM class that contains the first element
         */
        get: function () {
            var mjs = new ModernJS();
            mjs.addEl(this.els[0]);
            return mjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "last", {
        /**
         * ***last*** : Get the virtual DOM class that contains the last element.
         */
        get: function () {
            var mjs = new ModernJS();
            mjs.addEl(this.els[this.els.length - 1]);
            return mjs;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***index*** : Gets the virtual DOM class that contains the element at the specified index.
     * @param {number} index Element Index Number
     * @returns {ModernJS}
     */
    ModernJS.prototype.index = function (index) {
        var mjs = new ModernJS();
        if (!this.els[index])
            return;
        mjs.addEl(this.els[index]);
        return mjs;
    };
    Object.defineProperty(ModernJS.prototype, "prev", {
        /**
         * ***prev*** : Get the prev element in the virtual DOM by its virtual DOM class.
         */
        get: function () {
            // @ts-ignore
            var prevEl = this.els[0].previousElementSibling;
            var mjs = new ModernJS();
            mjs.addEl(prevEl);
            return mjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "next", {
        /**
         * ***next*** : Get the next element in the virtual DOM by its virtual DOM class.
         */
        get: function () {
            // @ts-ignore
            var prevEl = this.els[0].nextElementSibling;
            var mjs = new ModernJS();
            mjs.addEl(prevEl);
            return mjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "tagName", {
        /**
         * ***tagName*** : Get tag name.
         */
        get: function () {
            return this.els[0].tagName;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***querySelector*** : Searches for an element in the virtual DOM for the specified query path and returns the Virtual DOM Class that contains that element.
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    ModernJS.prototype.querySelector = function (queryString) {
        var mjs = new ModernJS();
        this.els.forEach(function (el) {
            var qss = el.querySelectorAll(queryString);
            qss.forEach(function (qs) {
                mjs.addEl(qs);
            });
        });
        return mjs;
    };
    Object.defineProperty(ModernJS.prototype, "text", {
        /**
         * ***text*** : Gets or sets the specified text.
         */
        get: function () {
            return this.els[0].innerText;
        },
        /**
         * ***text*** : Gets or sets the specified text.
         */
        set: function (value) {
            this.setText(value);
        },
        enumerable: false,
        configurable: true
    });
    ModernJS.prototype.setText = function (value, noReload) {
        this.els.forEach(function (el) {
            el.childNodes.forEach(function (c) {
                el.removeChild(c);
            });
            el.innerText = value.toString();
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "brText", {
        /**
         * ***brText*** : Set the text content.
         * Line breaks will be converted to line break tags.
         */
        set: function (value) {
            value = value.toString().split("\n").join("<br>");
            this.text = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "html", {
        /**
         * ***html*** : Gets or sets an HTML tag.
         */
        get: function () {
            return this.els[0].innerHTML;
        },
        /**
         * ***html*** : Gets or sets an HTML tag.
         */
        set: function (value) {
            this.setHtml(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***setHtml*** : Gets or sets an HTML tag.
     * @param {string | HTMLElement | ModernJS} value HTML tag content or HTMLElement, ModernJS class
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    ModernJS.prototype.setHtml = function (value, noReload) {
        var _this = this;
        this.els.forEach(function (el) {
            el.childNodes.forEach(function (c) {
                el.removeChild(c);
            });
            if (typeof value == "string") {
                el.innerHTML = value;
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);
                var c = Object.keys(value.childs);
                for (var n = 0; n < c.length; n++) {
                    var cname = c[n];
                    var child = value.childs[cname];
                    _this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "outerHtml", {
        /**
         * ***outerHTML*** : Get or set the outerHTML.
         */
        get: function () {
            return this.els[0].outerHTML;
        },
        /**
         * ***outerHTML*** : Get or set the outerHTML.
         */
        set: function (value) {
            this.els.forEach(function (el) {
                el.childNodes.forEach(function (c) {
                    el.removeChild(c);
                });
                el.outerHTML = value;
            });
            this.reload();
        },
        enumerable: false,
        configurable: true
    });
    ModernJS.prototype.afterBegin = function (value, noReload) {
        var _this = this;
        this.els.forEach(function (el) {
            if (typeof value == "string") {
                el.insertAdjacentHTML("afterbegin", value);
            }
            else if (value instanceof HTMLElement) {
                el.insertAdjacentElement("afterbegin", value);
            }
            else if (value instanceof ModernJS) {
                el.insertAdjacentElement("afterbegin", value.els[0]);
                var c = Object.keys(value.childs);
                for (var n = 0; n < c.length; n++) {
                    var cname = c[n];
                    var child = value.childs[cname];
                    _this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    };
    ModernJS.prototype.append = function (value, noReload) {
        var _this = this;
        this.els.forEach(function (el) {
            if (typeof value == "string") {
                el.insertAdjacentHTML("beforeend", value);
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);
                var c = Object.keys(value.childs);
                for (var n = 0; n < c.length; n++) {
                    var cname = c[n];
                    var child = value.childs[cname];
                    _this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    };
    /**
     * ***remove*** : Delete the target element.
     * @returns {ModernJS}
     */
    ModernJS.prototype.remove = function () {
        this.els.forEach(function (el) {
            el.remove();
        });
        return this;
    };
    /**
     * ***style*** : Setting style(stylesheets) attributes for an element
     * @param {[name : string] : string | number} stylesheets Style attribute information
     * @returns {ModernJS}
     */
    ModernJS.prototype.style = function (stylesheets) {
        var c = Object.keys(stylesheets);
        var _loop_3 = function (n) {
            var name_2 = c[n];
            var value = stylesheets[name_2];
            this_2.els.forEach(function (el) {
                el.style[name_2] = value;
            });
        };
        var this_2 = this;
        for (var n = 0; n < c.length; n++) {
            _loop_3(n);
        }
        return this;
    };
    /**
     * ***getStyle*** : Get style information for the specified selector.
     * @param {string} name selector
     * @returns {string | number}
     */
    ModernJS.prototype.getStyle = function (name) {
        return this.els[0].style[name];
    };
    ModernJS.prototype.attr = function (name, value) {
        if (value != undefined) {
            this.els.forEach(function (el) {
                el.setAttribute(name, value.toString());
            });
            return this;
        }
        else {
            return this.els[0].attributes[name].value;
        }
    };
    /**
     * ***isAttr*** : Whether the specified attribute name exists for the element.
     * @param {string} name attribute name
     * @returns {boolean}
     */
    ModernJS.prototype.isAttr = function (name) {
        if (!this.els[0])
            return false;
        if (this.els[0].attributes[name])
            return true;
        return false;
    };
    /**
     * ***removeAttr*** : Remove attribute information from an element
     * @param {string} name The name of the attribute to be deleted.
     * @returns {ModernJS}
     */
    ModernJS.prototype.removeAttr = function (name) {
        this.els.forEach(function (el) {
            el.removeAttribute(name);
        });
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "src", {
        /**
         * ***src*** : Get or set the src attribute value.
         */
        get: function () {
            return this.attr("src");
        },
        /**
         * ***src*** : Get or set the src attribute value.
         */
        set: function (value) {
            this.attr("src", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "placeHolder", {
        /**
         * ***placeHolder*** : Get or set the placeholder attribute value.
         */
        get: function () {
            return this.attr("placeholder");
        },
        /**
         * ***placeHolder*** : Get or set the placeholder attribute value.
         */
        set: function (value) {
            this.attr("placeholder", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "href", {
        /**
         * ***href*** : Get or set the href attribute value.
         */
        get: function () {
            return this.attr("href");
        },
        /**
         * ***href*** : Get or set the href attribute value.
         */
        set: function (value) {
            this.attr("href", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "display", {
        /**
         * ***display*** : Set whether elements are visible or hidden.
         */
        set: function (status) {
            if (status) {
                this.style({ display: null });
            }
            else {
                this.style({ display: "none" });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "id", {
        /**
         * ***id*** : Gets or sets the ID attribute value of an element.
         */
        get: function () {
            return this.attr("id");
        },
        /**
         * ***id*** : Gets or sets the ID attribute value of an element.
         */
        set: function (value) {
            this.attr("id", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "name", {
        /**
         * ***name*** : Gets or sets the name attribute value of an element.
         */
        get: function () {
            return this.attr("name");
        },
        /**
         * ***name*** : Gets or sets the name attribute value of an element.
         */
        set: function (value) {
            this.attr("name", value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***isClass*** : Gets whether the class attribute of an element exists.
     * @param {string} className Target class attribute
     * @returns {boolean}
     */
    ModernJS.prototype.isClass = function (className) {
        return this.els[0].classList.contains(className);
    };
    /**
     * ***addClass*** : Adds the specified class attribute to an element.
     * @param {string} className add class attribute
     * @returns {ModernJS}
     */
    ModernJS.prototype.addClass = function (className) {
        this.els.forEach(function (el) {
            el.classList.add(className);
        });
        return this;
    };
    /**
     * ***removeClass*** : Remove a class attribute from an element.
     * @param {string} className delete class attribute
     * @returns {ModernJS}
     */
    ModernJS.prototype.removeClass = function (className) {
        this.els.forEach(function (el) {
            el.classList.remove(className);
        });
        return this;
    };
    ModernJS.prototype.data = function (name, value) {
        if (value != undefined) {
            this.datas[name] = value;
            return this;
        }
        else {
            return this.datas[name];
        }
    };
    /**
     * ***removeData*** : Deletes data stored in the virtual DOM.
     * @param {string} name delete data name
     * @returns {ModernJS}
     */
    ModernJS.prototype.removeData = function (name) {
        delete this.datas[name];
        return this;
    };
    ModernJS.prototype.on = function (event, listener, options) {
        var _this = this;
        this.els.forEach(function (el) {
            var listener_ = function (event) {
                var my = new ModernJS();
                my.addEl(el);
                my.datas = _this.datas;
                listener(event, my);
            };
            el.addEventListener(event, listener_, options);
        });
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "onClick", {
        /**
         * ***onClick*** : Set an event listener for when an element is clicked.
         */
        set: function (listener) {
            this.on("click", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onDblClick", {
        /**
         * ***onDblClick*** : Sets an event listener for when an element is double-clicked
         */
        set: function (listener) {
            this.on("dblclick", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onFocus", {
        /**
         * ***onFocus*** : Sets an event listener for when an element is focused.
         */
        set: function (listener) {
            this.on("focus", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onChange", {
        /**
         * ***onChange*** : Sets an event listener for when an element's input value is changed.
         */
        set: function (listener) {
            this.on("change", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onMouseDown", {
        /**
         * ***onMouseDown*** : Sets an event listener for when the mouse button is pressed on an element.
         */
        set: function (listener) {
            this.on("mousedown", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onMouseUp", {
        /**
         * ***onMouseUp*** : Sets an event listener for when a mouse button is released on an element.
         */
        set: function (listener) {
            this.on("mouseup", listener);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "onMouseMove", {
        /**
         * ***onMouseMove*** : Sets an event listener for when the mouse cursor moves within an element.
         */
        set: function (listener) {
            this.on("mousemove", listener);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***dispatch*** : Executes a specified event on an element.
     * @param {HTMLElementEventMap} eventName dispatch event name
     * @returns {ModernJS}
     */
    ModernJS.prototype.dispatch = function (eventName) {
        this.els.forEach(function (el) {
            var event = new Event(eventName);
            el.dispatchEvent(event);
        });
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "value", {
        /**
         * ***value*** : If the element is an input field, gets the entered or selected value.
         */
        get: function () {
            if (!(this.tagName == "INPUT" ||
                this.tagName == "SELECT" ||
                this.tagName == "TEXTAREA"))
                return;
            // @ts-ignore
            var value;
            if (this.tagName == "INPUT") {
                if (this.attr("type") == "radio") {
                    this.els.forEach(function (el) {
                        if (el.checked)
                            value = el.value;
                    });
                }
                else if (this.attr("type") == "checkbox") {
                    var values_1 = [];
                    this.els.forEach(function (el) {
                        if (el.checked)
                            values_1.push(el.value);
                    });
                    value = values_1;
                }
                else if (this.attr("type") == "file") {
                    value = this.fileBuffers;
                }
                else {
                    if (this.length > 1) {
                        var values_2 = [];
                        this.els.forEach(function (el) {
                            values_2.push(el.value);
                        });
                        value = values_2;
                    }
                    else {
                        // @ts-ignore
                        var el = this.els[0];
                        value = el.value;
                    }
                }
            }
            else {
                if (this.length > 1) {
                    var values_3 = [];
                    this.els.forEach(function (el) {
                        values_3.push(el.value);
                    });
                    value = values_3;
                }
                else {
                    // @ts-ignore
                    var el = this.els[0];
                    value = el.value;
                }
            }
            return value;
        },
        /**
         * ***value*** : If the element is an input field, set the input value or selected value.
         */
        set: function (value) {
            if (!(this.tagName == "INPUT" ||
                this.tagName == "SELECT" ||
                this.tagName == "TEXTAREA"))
                return;
            if (typeof value == "number")
                value = value.toString();
            // @ts-ignore
            if (this.tagName == "INPUT") {
                if (this.attr("type") == "radio") {
                    this.els.forEach(function (el) {
                        if (value === el.value)
                            el.checked = true;
                    });
                }
                else if (this.attr("type") == "checkbox") {
                    if (typeof value == "string")
                        value = [value];
                    value.forEach(function (v, index) {
                        value[index] = v.toString();
                    });
                    this.els.forEach(function (el) {
                        // @ts-ignore
                        if (value.indexOf(el.value) > -1) {
                            el.checked = true;
                        }
                        else {
                            el.checked = false;
                        }
                    });
                }
                else if (this.attr("type") == "file") {
                    return;
                }
                else {
                    this.els.forEach(function (el, index) {
                        if (typeof value == "string") {
                            el.value = value;
                        }
                        else {
                            if (value[index]) {
                                el.value = value[index].toString();
                            }
                            else {
                                el.value = "";
                            }
                        }
                    });
                }
            }
            else {
                this.els.forEach(function (el, index) {
                    if (typeof value == "string") {
                        el.value = value;
                    }
                    else {
                        if (value[index]) {
                            el.value = value[index].toString();
                        }
                        else {
                            el.value = "";
                        }
                    }
                });
            }
            this.dispatch("change");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "checked", {
        /**
         * ***checked*** : If the element is a checkbox, gets the selection status.
         */
        get: function () {
            // @ts-ignore
            var el = this.els[0];
            return el.checked;
        },
        /**
         * ***checked*** : If the element is a checkbox, sets whether it can be selected.
         */
        set: function (status) {
            // @ts-ignore
            var el = this.els[0];
            el.checked = status;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***reset*** : If the element is an input field, resets the input or selected value.
     * @returns {ModernJS}
     */
    ModernJS.prototype.reset = function () {
        var _this = this;
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach(function (el) {
                    el.checked = false;
                });
            }
            else if (this.attr("type") == "checkbox") {
                this.els.forEach(function (el) {
                    el.checked = false;
                });
            }
            else {
                this.els.forEach(function (el, index) {
                    el.value = "";
                });
                if (this.attr("type") == "file") {
                    this.fileBuffers = [];
                }
            }
        }
        else {
            this.els.forEach(function (el, index) {
                if (_this.tagName == "SELECT") {
                    // @ts-ignore
                    el.selectedIndex = 0;
                }
                else {
                    el.value = "";
                }
            });
        }
        return this;
    };
    ModernJS.prototype.selectAddParam = function (params, optgroup) {
        var c = Object.keys(params);
        for (var n = 0; n < c.length; n++) {
            var value = c[n];
            var text = params[value];
            if (typeof text == "string" || typeof text == "number") {
                var optionEL = document.createElement("option");
                optionEL.value = value;
                optionEL.innerHTML = text;
                if (optgroup) {
                    optgroup.append(optionEL);
                }
                else {
                    this.append(optionEL);
                }
            }
            else {
                var optGroupEL = document.createElement("optgroup");
                optGroupEL.label = value;
                this.selectAddParam(text, optGroupEL);
                this.append(optGroupEL);
            }
        }
        return this;
    };
    /**
     * ***selectEmpty*** : If the element is a select tag, set the empty selection.
     * @param {string} text Selection Text Name
     * @returns {ModernJS}
     */
    ModernJS.prototype.selectEmpty = function (text) {
        var optionEl = document.createElement("option");
        optionEl.value = "";
        optionEl.innerHTML = text;
        this.els.forEach(function (el) {
            el.insertAdjacentElement("afterbegin", optionEl);
        });
        return this;
    };
    /**
     * ***selectResetParam*** : If the element is a Select tag, reset the options.
     * @returns {ModernJS}
     */
    ModernJS.prototype.selectResetParam = function () {
        this.text = "";
        return this;
    };
    Object.defineProperty(ModernJS.prototype, "selectedText", {
        /**
         * ***selectedText*** : If the element is a checkbox, gets the display text of the selected item.
         */
        get: function () {
            var values = [];
            this.els.forEach(function (el) {
                var value = el.options[el.selectedIndex].text;
                values.push(value);
            });
            if (this.length > 1) {
                return values;
            }
            else {
                return values[0];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModernJS.prototype, "childValues", {
        /**
         * ***childValues*** : Get all input values ​​of virtual DOM of childs.
         */
        get: function () {
            var c = Object.keys(this.childs);
            var values = {};
            for (var n = 0; n < c.length; n++) {
                var name_3 = c[n];
                var child = this.childs[name_3];
                values[name_3] = child.value;
            }
            return values;
        },
        enumerable: false,
        configurable: true
    });
    ModernJS.buffers = {};
    return ModernJS;
}());
exports.ModernJS = ModernJS;
/**
 * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
 * @param {string} queryString QueryString
 * @returns {ModernJS}
 */
exports.dom = ModernJS.dom;
exports.mjs = ModernJS.reload;
