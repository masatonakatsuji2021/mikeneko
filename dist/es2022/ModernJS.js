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
class ModernJS {
    static buffers = {};
    /**
     * ***els*** : List of target Element classes in the virtual DOM class.
     */
    els = [];
    /**
     * ***childs*** : The child ModernJS class for this virtual DOM.
     */
    childs = {};
    /**
     * ***datas*** : Virtual Data Objects.
     */
    datas = {};
    /**
     * ***parent*** : The virtual DOM class of this virtual DOM's parent element。
     */
    parent;
    fileBuffers = [];
    static reload() {
        const c = Object.keys(this.buffers);
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const buffer = this.buffers[name];
            buffer.els.forEach((el, index) => {
                if (!document.body.contains(el))
                    buffer.els.splice(index);
            });
            if (!buffer.els.length)
                delete this.buffers[name];
        }
        this.virtualAttributes("v", (parent, attrValue, el) => {
            if (parent) {
                if (!parent.childs[attrValue])
                    parent.childs[attrValue] = new ModernJS();
                parent.childs[attrValue].addEl(el);
            }
            else {
                if (!this.buffers[attrValue])
                    this.buffers[attrValue] = new ModernJS();
                this.buffers[attrValue].addEl(el);
            }
        });
        return this.buffers;
    }
    static virtualAttributes(target, handler) {
        const qss = document.querySelectorAll("[" + target + "]");
        qss.forEach((el) => {
            let attrValue = el.attributes[target].value;
            el.removeAttribute(target);
            let parent;
            const attrValues = attrValue.split(".");
            if (attrValues.length > 1) {
                attrValue = attrValues[attrValues.length - 1];
                attrValues.forEach((a_, index) => {
                    if (index == (attrValues.length - 1))
                        return;
                    if (index == 0) {
                        if (!this.buffers[a_])
                            this.buffers[a_] = new ModernJS();
                        parent = this.buffers[a_];
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
    }
    static create(text, tagName) {
        const mjs = new ModernJS();
        if (!tagName)
            tagName = "div";
        if (text.indexOf("<tr") === 0 || text.indexOf("<td") === 0)
            tagName = "table";
        const el = document.createElement(tagName);
        mjs.addEl(el);
        if (text)
            mjs.html = text;
        return mjs;
    }
    /**
     * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    static dom(queryString) {
        const mjs = new ModernJS();
        const qss = document.querySelectorAll(queryString);
        qss.forEach((el) => {
            mjs.addEl(el);
        });
        return mjs;
    }
    /**
     * ***addEl*** : Manually adding elements to the Virtual DOM.
     * @param {HTMLElement} el HTMLElement
     * @returns {MOdernJS}
     */
    addEl(el) {
        this.els.push(el);
        if (el.tagName != "INPUT")
            return;
        if (!el.attributes["type"])
            return;
        if (el.attributes["type"].value != "file")
            return;
        this.fileBuffers = [];
        el.addEventListener("change", (e) => {
            // @ts-ignore
            const el = e.target;
            for (let n = 0; n < el.files.length; n++) {
                const file = el.files[n];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const file_ = file;
                    const content = e.target.result;
                    file_.result = content;
                    this.fileBuffers.push(file_);
                };
                reader.readAsText(file);
            }
        });
        return this;
    }
    /**
     * ***reload*** : Get the virtual DOM of the v-child attribute from the virtual DOM element.
     * The results can be obtained in children.
     * @param {ModernJS?} context
     */
    reload(context) {
        ModernJS.reload();
        this.els.forEach((el) => {
            const qss = el.querySelectorAll("[v-child]");
            qss.forEach((el2) => {
                const vname = el2.attributes["v-child"].value;
                el2.removeAttribute("v-child");
                if (context) {
                    if (!context.childs[vname])
                        context.childs[vname] = new ModernJS();
                    context.childs[vname].parent = this;
                    context.childs[vname].addEl(el2);
                }
                else {
                    if (!this.childs[vname])
                        this.childs[vname] = new ModernJS();
                    this.childs[vname].parent = this;
                    this.childs[vname].addEl(el2);
                }
            });
        });
    }
    /**
     * ***length*** : Get the number of elements
     */
    get length() {
        return this.els.length;
    }
    /**
     * ***first*** : Get the virtual DOM class that contains the first element
     */
    get first() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[0]);
        return mjs;
    }
    /**
     * ***last*** : Get the virtual DOM class that contains the last element.
     */
    get last() {
        const mjs = new ModernJS();
        mjs.addEl(this.els[this.els.length - 1]);
        return mjs;
    }
    /**
     * ***index*** : Gets the virtual DOM class that contains the element at the specified index.
     * @param {number} index Element Index Number
     * @returns {ModernJS}
     */
    index(index) {
        const mjs = new ModernJS();
        if (!this.els[index])
            return;
        mjs.addEl(this.els[index]);
        return mjs;
    }
    /**
     * ***prev*** : Get the prev element in the virtual DOM by its virtual DOM class.
     */
    get prev() {
        // @ts-ignore
        const prevEl = this.els[0].previousElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    /**
     * ***next*** : Get the next element in the virtual DOM by its virtual DOM class.
     */
    get next() {
        // @ts-ignore
        const prevEl = this.els[0].nextElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }
    /**
     * ***tagName*** : Get tag name.
     */
    get tagName() {
        return this.els[0].tagName;
    }
    /**
     * ***querySelector*** : Searches for an element in the virtual DOM for the specified query path and returns the Virtual DOM Class that contains that element.
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    querySelector(queryString) {
        const mjs = new ModernJS();
        this.els.forEach((el) => {
            const qss = el.querySelectorAll(queryString);
            qss.forEach((qs) => {
                mjs.addEl(qs);
            });
        });
        return mjs;
    }
    /**
     * ***text*** : Gets or sets the specified text.
     */
    set text(value) {
        this.setText(value);
    }
    /**
     * ***text*** : Gets or sets the specified text.
     */
    get text() {
        return this.els[0].innerText;
    }
    setText(value, noReload) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            el.innerText = value.toString();
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    }
    /**
     * ***brText*** : Set the text content.
     * Line breaks will be converted to line break tags.
     */
    set brText(value) {
        value = value.toString().split("\n").join("<br>");
        this.text = value;
    }
    /**
     * ***html*** : Gets or sets an HTML tag.
     */
    set html(value) {
        this.setHtml(value);
    }
    /**
     * ***html*** : Gets or sets an HTML tag.
     */
    get html() {
        return this.els[0].innerHTML;
    }
    /**
     * ***setHtml*** : Gets or sets an HTML tag.
     * @param {string | HTMLElement | ModernJS} value HTML tag content or HTMLElement, ModernJS class
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    setHtml(value, noReload) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
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
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    }
    /**
     * ***outerHTML*** : Get or set the outerHTML.
     */
    set outerHtml(value) {
        this.els.forEach((el) => {
            el.childNodes.forEach((c) => {
                el.removeChild(c);
            });
            el.outerHTML = value;
        });
        this.reload();
    }
    /**
     * ***outerHTML*** : Get or set the outerHTML.
     */
    get outerHtml() {
        return this.els[0].outerHTML;
    }
    afterBegin(value, noReload) {
        this.els.forEach((el) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("afterbegin", value);
            }
            else if (value instanceof HTMLElement) {
                el.insertAdjacentElement("afterbegin", value);
            }
            else if (value instanceof ModernJS) {
                el.insertAdjacentElement("afterbegin", value.els[0]);
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    }
    append(value, noReload) {
        this.els.forEach((el) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("beforeend", value);
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);
                const c = Object.keys(value.childs);
                for (let n = 0; n < c.length; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) {
            this.reload();
        }
        return this;
    }
    /**
     * ***remove*** : Delete the target element.
     * @returns {ModernJS}
     */
    remove() {
        this.els.forEach((el) => {
            el.remove();
        });
        return this;
    }
    /**
     * ***style*** : Setting style(stylesheets) attributes for an element
     * @param {[name : string] : string | number} stylesheets Style attribute information
     * @returns {ModernJS}
     */
    style(stylesheets) {
        const c = Object.keys(stylesheets);
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const value = stylesheets[name];
            this.els.forEach((el) => {
                el.style[name] = value;
            });
        }
        return this;
    }
    /**
     * ***getStyle*** : Get style information for the specified selector.
     * @param {string} name selector
     * @returns {string | number}
     */
    getStyle(name) {
        return this.els[0].style[name];
    }
    attr(name, value) {
        if (value != undefined) {
            this.els.forEach((el) => {
                el.setAttribute(name, value.toString());
            });
            return this;
        }
        else {
            return this.els[0].attributes[name].value;
        }
    }
    /**
     * ***isAttr*** : Whether the specified attribute name exists for the element.
     * @param {string} name attribute name
     * @returns {boolean}
     */
    isAttr(name) {
        if (!this.els[0])
            return false;
        if (this.els[0].attributes[name])
            return true;
        return false;
    }
    /**
     * ***removeAttr*** : Remove attribute information from an element
     * @param {string} name The name of the attribute to be deleted.
     * @returns {ModernJS}
     */
    removeAttr(name) {
        this.els.forEach((el) => {
            el.removeAttribute(name);
        });
        return this;
    }
    /**
     * ***src*** : Get or set the src attribute value.
     */
    set src(value) {
        this.attr("src", value);
    }
    /**
     * ***src*** : Get or set the src attribute value.
     */
    get src() {
        return this.attr("src");
    }
    /**
     * ***placeHolder*** : Get or set the placeholder attribute value.
     */
    set placeHolder(value) {
        this.attr("placeholder", value);
    }
    /**
     * ***placeHolder*** : Get or set the placeholder attribute value.
     */
    get placeHolder() {
        return this.attr("placeholder");
    }
    /**
     * ***href*** : Get or set the href attribute value.
     */
    set href(value) {
        this.attr("href", value);
    }
    /**
     * ***href*** : Get or set the href attribute value.
     */
    get href() {
        return this.attr("href");
    }
    /**
     * ***display*** : Set whether elements are visible or hidden.
     */
    set display(status) {
        if (status) {
            this.style({ display: null });
        }
        else {
            this.style({ display: "none" });
        }
    }
    /**
     * ***id*** : Gets or sets the ID attribute value of an element.
     */
    set id(value) {
        this.attr("id", value);
    }
    /**
     * ***id*** : Gets or sets the ID attribute value of an element.
     */
    get id() {
        return this.attr("id");
    }
    /**
     * ***name*** : Gets or sets the name attribute value of an element.
     */
    set name(value) {
        this.attr("name", value);
    }
    /**
     * ***name*** : Gets or sets the name attribute value of an element.
     */
    get name() {
        return this.attr("name");
    }
    /**
     * ***isClass*** : Gets whether the class attribute of an element exists.
     * @param {string} className Target class attribute
     * @returns {boolean}
     */
    isClass(className) {
        return this.els[0].classList.contains(className);
    }
    /**
     * ***addClass*** : Adds the specified class attribute to an element.
     * @param {string} className add class attribute
     * @returns {ModernJS}
     */
    addClass(className) {
        this.els.forEach((el) => {
            el.classList.add(className);
        });
        return this;
    }
    /**
     * ***removeClass*** : Remove a class attribute from an element.
     * @param {string} className delete class attribute
     * @returns {ModernJS}
     */
    removeClass(className) {
        this.els.forEach((el) => {
            el.classList.remove(className);
        });
        return this;
    }
    data(name, value) {
        if (value != undefined) {
            this.datas[name] = value;
            return this;
        }
        else {
            return this.datas[name];
        }
    }
    /**
     * ***removeData*** : Deletes data stored in the virtual DOM.
     * @param {string} name delete data name
     * @returns {ModernJS}
     */
    removeData(name) {
        delete this.datas[name];
        return this;
    }
    on(event, listener, options) {
        this.els.forEach((el) => {
            const listener_ = (event) => {
                const my = new ModernJS();
                my.addEl(el);
                my.datas = this.datas;
                listener(event, my);
            };
            el.addEventListener(event, listener_, options);
        });
        return this;
    }
    /**
     * ***onClick*** : Set an event listener for when an element is clicked.
     */
    set onClick(listener) {
        this.on("click", listener);
    }
    /**
     * ***onDblClick*** : Sets an event listener for when an element is double-clicked
     */
    set onDblClick(listener) {
        this.on("dblclick", listener);
    }
    /**
     * ***onFocus*** : Sets an event listener for when an element is focused.
     */
    set onFocus(listener) {
        this.on("focus", listener);
    }
    /**
     * ***onChange*** : Sets an event listener for when an element's input value is changed.
     */
    set onChange(listener) {
        this.on("change", listener);
    }
    /**
     * ***onMouseDown*** : Sets an event listener for when the mouse button is pressed on an element.
     */
    set onMouseDown(listener) {
        this.on("mousedown", listener);
    }
    /**
     * ***onMouseUp*** : Sets an event listener for when a mouse button is released on an element.
     */
    set onMouseUp(listener) {
        this.on("mouseup", listener);
    }
    /**
     * ***onMouseMove*** : Sets an event listener for when the mouse cursor moves within an element.
     */
    set onMouseMove(listener) {
        this.on("mousemove", listener);
    }
    /**
     * ***dispatch*** : Executes a specified event on an element.
     * @param {HTMLElementEventMap} eventName dispatch event name
     * @returns {ModernJS}
     */
    dispatch(eventName) {
        this.els.forEach((el) => {
            let event = new Event(eventName);
            el.dispatchEvent(event);
        });
        return this;
    }
    /**
     * ***value*** : If the element is an input field, gets the entered or selected value.
     */
    get value() {
        if (!(this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"))
            return;
        // @ts-ignore
        let value;
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    if (el.checked)
                        value = el.value;
                });
            }
            else if (this.attr("type") == "checkbox") {
                let values = [];
                this.els.forEach((el) => {
                    if (el.checked)
                        values.push(el.value);
                });
                value = values;
            }
            else if (this.attr("type") == "file") {
                value = this.fileBuffers;
            }
            else {
                if (this.length > 1) {
                    let values = [];
                    this.els.forEach((el) => {
                        values.push(el.value);
                    });
                    value = values;
                }
                else {
                    // @ts-ignore
                    const el = this.els[0];
                    value = el.value;
                }
            }
        }
        else {
            if (this.length > 1) {
                let values = [];
                this.els.forEach((el) => {
                    values.push(el.value);
                });
                value = values;
            }
            else {
                // @ts-ignore
                const el = this.els[0];
                value = el.value;
            }
        }
        return value;
    }
    /**
     * ***value*** : If the element is an input field, set the input value or selected value.
     */
    set value(value) {
        if (!(this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"))
            return;
        if (typeof value == "number")
            value = value.toString();
        // @ts-ignore
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    if (value === el.value)
                        el.checked = true;
                });
            }
            else if (this.attr("type") == "checkbox") {
                if (typeof value == "string")
                    value = [value];
                value.forEach((v, index) => {
                    value[index] = v.toString();
                });
                this.els.forEach((el) => {
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
                this.els.forEach((el, index) => {
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
            this.els.forEach((el, index) => {
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
    }
    /**
     * ***checked*** : If the element is a checkbox, sets whether it can be selected.
     */
    set checked(status) {
        // @ts-ignore
        const el = this.els[0];
        el.checked = status;
    }
    /**
     * ***checked*** : If the element is a checkbox, gets the selection status.
     */
    get checked() {
        // @ts-ignore
        const el = this.els[0];
        return el.checked;
    }
    /**
     * ***reset*** : If the element is an input field, resets the input or selected value.
     * @returns {ModernJS}
     */
    reset() {
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el) => {
                    el.checked = false;
                });
            }
            else if (this.attr("type") == "checkbox") {
                this.els.forEach((el) => {
                    el.checked = false;
                });
            }
            else {
                this.els.forEach((el, index) => {
                    el.value = "";
                });
                if (this.attr("type") == "file") {
                    this.fileBuffers = [];
                }
            }
        }
        else {
            this.els.forEach((el, index) => {
                if (this.tagName == "SELECT") {
                    // @ts-ignore
                    el.selectedIndex = 0;
                }
                else {
                    el.value = "";
                }
            });
        }
        return this;
    }
    selectAddParam(params, optgroup) {
        const c = Object.keys(params);
        for (let n = 0; n < c.length; n++) {
            const value = c[n];
            const text = params[value];
            if (typeof text == "string" || typeof text == "number") {
                const optionEL = document.createElement("option");
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
                const optGroupEL = document.createElement("optgroup");
                optGroupEL.label = value;
                this.selectAddParam(text, optGroupEL);
                this.append(optGroupEL);
            }
        }
        return this;
    }
    /**
     * ***selectEmpty*** : If the element is a select tag, set the empty selection.
     * @param {string} text Selection Text Name
     * @returns {ModernJS}
     */
    selectEmpty(text) {
        const optionEl = document.createElement("option");
        optionEl.value = "";
        optionEl.innerHTML = text;
        this.els.forEach((el) => {
            el.insertAdjacentElement("afterbegin", optionEl);
        });
        return this;
    }
    /**
     * ***selectResetParam*** : If the element is a Select tag, reset the options.
     * @returns {ModernJS}
     */
    selectResetParam() {
        this.text = "";
        return this;
    }
    /**
     * ***selectedText*** : If the element is a checkbox, gets the display text of the selected item.
     */
    get selectedText() {
        const values = [];
        this.els.forEach((el) => {
            const value = el.options[el.selectedIndex].text;
            values.push(value);
        });
        if (this.length > 1) {
            return values;
        }
        else {
            return values[0];
        }
    }
    /**
     * ***childValues*** : Get all input values ​​of virtual DOM of childs.
     */
    get childValues() {
        const c = Object.keys(this.childs);
        let values = {};
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const child = this.childs[name];
            values[name] = child.value;
        }
        return values;
    }
}
exports.ModernJS = ModernJS;
/**
 * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
 * @param {string} queryString QueryString
 * @returns {ModernJS}
 */
exports.dom = ModernJS.dom;
exports.mjs = ModernJS.reload;
