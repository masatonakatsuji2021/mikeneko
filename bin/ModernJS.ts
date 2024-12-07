export interface ModernJSList {
    [name : string] : ModernJS,
}

export interface ModernJSFile extends File {
    result? : string | ArrayBuffer,
}

export interface ModernJSSelectOption {
    [value : string | number] : string | ModernJSSelectOption,
}

/**
 * ***ModernJS*** : Virtual DOM Classes.  
 * When you specify the v attribute in an HTML tag, it is recognized as a virtual DOM.  
 * The v attribute is considered a globally available virtual DOM.
 * ```html
 * <div v="test"></div>
 * ```
 */
export class ModernJS {

    /**
     * ***els*** : List of target Element classes in the virtual DOM class.
     */
    public els : Array<HTMLElement> = [];

    /**
     * ***childs*** : The child ModernJS class for this virtual DOM.  
     * The ModernJS class of the child can be set by specifying it in the v attribute of the HTML tag, separated by .
     * ```html
     * <div v="main.sub"></div>
     * ```
     * In the above case, the following code can be used to manipulate the DOM as a child ModernJS
     * ```typescript
     * mjs.main.childs.sub.text = "Sub Text....";
     * ```
     */
    public childs : ModernJSList = {};

    /**
     * ***datas*** : Virtual Data Objects.
     */
    public datas : {[name : string] : any} = {};

    /**
     * ***parent*** : The virtual DOM class of this virtual DOM's parent element。
     */
    public parent : ModernJS;

    private fileBuffers : Array<any> = [];
    
    /**
     * ***create*** : Create an empty virtual DOM class.
     * @returns {ModernJS}
     */
    public static create() : ModernJS;

    /**
     * ***create*** : Creates a virtual DOM class with the specified content tag.
     * @param {string} text Content Tags
     * @returns {ModernJS}
     */
    public static create(text : string) : ModernJS;

    /**
     * ***create*** : Creates a virtual DOM class with the specified content tag.  
     * You can also specify the tag name.
     * @param {string} text Content Tags
     * @param {string} tagName Tag Name
     * @returns {ModernJS}
     */
    public static create(text : string, tagName : string) : ModernJS;

    public static create(text? : string, tagName? : string) : ModernJS {
        const mjs = new ModernJS();
        if (!tagName) tagName = "div";
        if (text.indexOf("<tr") === 0 || text.indexOf("<td") === 0) tagName = "table";
        const el = document.createElement(tagName);
        mjs.addEl(el);
        if (text) mjs.html = text;
        return mjs;
    }

    /**
     * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.  
     * For example, prepare the following HTML:
     * ```html
     * <div class="item"></div>
     * ```
     * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:
     * ```typescript
     * const subQuery : ModernJS = ModernJS.dom(".item");
     * ```
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    public static dom(queryString : string) : ModernJS {
        const mjs = new ModernJS();
        const qss = document.querySelectorAll(queryString);
        qss.forEach((el : HTMLElement) => {
            mjs.addEl(el);
        });
        return mjs;
    }

    /**
     * ***addEl*** : Manually adding elements to the Virtual DOM.   
     * For example, after getting the p tag as an element,   
     * write the following code in TypeScript to create an empty ModernJS class and add the p tag element to it.
     * ```typescript
     * const el = document.querySelector("p");
     * const mjs = ModernJS.create();
     * mjs.addEl(el);
     * ```
     * @param {HTMLElement} el HTMLElement
     * @returns {MOdernJS}
     */
    public addEl(el : HTMLElement) : ModernJS {
        this.els.push(el);

        if (el.tagName != "INPUT") return;
        if (!el.attributes["type"]) return;
        if (el.attributes["type"].value != "file") return;
        this.fileBuffers = [];
        el.addEventListener("change", (e : Event)=>{
            // @ts-ignore
            const el : HTMLInputElement = e.target;       
            for(let n = 0 ; n < el.files.length ; n++) {
                const file = el.files[n];
                const reader = new FileReader();
                reader.onload = (e) =>  {
                    const file_ : ModernJSFile = file;
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
     * ***reload*** : Get the virtual DOM of the v attribute from the virtual DOM element.  
     * The results can be obtained in children.
     * @param {ModernJS?} context 
     */
    public reload(context? : ModernJS) {
        if (!context) context = this;
        this.virtualAttributes("v", context, (parent: ModernJS, attrValue: string, el: HTMLElement) => {
            if (parent) {
                if (!parent.childs[attrValue]) parent.childs[attrValue] = new ModernJS();
                parent.childs[attrValue].addEl(el);
            }
            else {
                if (!context.childs[attrValue]) context.childs[attrValue] = new ModernJS();
                context.childs[attrValue].addEl(el);
            }
        });
    }

    private virtualAttributes(target : string, context: ModernJS, handler : (parent: ModernJS, attrValue: string, el : HTMLElement) => void) {
        const qss = document.querySelectorAll("[" + target + "]");
        qss.forEach((el : HTMLElement) => {
            let attrValue = el.attributes[target].value;
            el.removeAttribute(target);
            let parent : ModernJS;
            const attrValues = attrValue.split(".");
            if (attrValues.length > 1) {
                attrValue = attrValues[attrValues.length -1];
                attrValues.forEach((a_, index) => {
                    if (index == (attrValues.length - 1)) return;
                    if (index == 0) {
                        if (!context.childs[a_]) context.childs[a_] = new ModernJS();
                        parent = context.childs[a_];
                        if (!parent.els.length) parent.addEl(el);
                    }
                    else {
                        if (!parent.childs[a_]) parent.childs[a_] = new ModernJS();
                        parent = parent.childs[a_];
                    }
                });
            }

            handler(parent, attrValue, el);
        });
    }


    /**
     * ***length*** : Get the number of elements.
     */
    public get length() : number {
        return this.els.length;
    }

    /**
     * ***first*** : Get the virtual DOM class that contains the first element  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const first : ModernJS = mjs.first;
     * ```
     */
    public get first() : ModernJS {
        const mjs = new ModernJS();
        mjs.addEl(this.els[0]);
        return mjs;
    }

    /**
     * ***last*** : Get the virtual DOM class that contains the last element.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const last : ModernJS = mjs.last;
     * ```
     */
    public get last() : ModernJS {
        const mjs = new ModernJS();
        mjs.addEl(this.els[this.els.length - 1]);
        return mjs;
    }

    /**
     * ***index*** : Gets the virtual DOM class that contains the element at the specified index.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const three : ModernJS = mjs.index(2);
     * ```
     * @param {number} index Element Index Number
     * @returns {ModernJS}
     */
    public index(index: number) : ModernJS {
        const mjs = new ModernJS();
        if (!this.els[index]) return;
        mjs.addEl(this.els[index]);
        return mjs;
    }

    /**
     * ***prev*** : Get the prev element in the virtual DOM by its virtual DOM class.
     */
    public get prev() : ModernJS {
        // @ts-ignore
        const prevEl : HTMLElement = this.els[0].previousElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }

    /**
     * ***next*** : Get the next element in the virtual DOM by its virtual DOM class.
     */
    public get next() : ModernJS {
        // @ts-ignore
        const prevEl : HTMLElement = this.els[0].nextElementSibling;
        const mjs = new ModernJS();
        mjs.addEl(prevEl);
        return mjs;
    }

    /**
     * ***tagName*** : Get tag name.
     */
    public get tagName() : string {
        return this.els[0].tagName;
    }

    /**
     * ***querySelector*** : Searches for an element in the virtual DOM for the specified query path and returns the Virtual DOM Class that contains that element.
     * For example, prepare the following HTML:
     * ```html
     * <div v="main">
     *      <div class="item"></div>
     * </div>
     * ```
     * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:  
     * (The variable main is the ModernJS class v="main" above.)
     * ```typescript
     * const item : ModernJS = main.querySelector(".item");
     * ```
     * @param {string} queryString QueryString
     * @returns {ModernJS}
     */
    public querySelector(queryString: string) : ModernJS {
        const mjs = new ModernJS();
        this.els.forEach((el : HTMLElement) => {
            const qss = el.querySelectorAll(queryString);
            qss.forEach((qs : HTMLElement) => {
                mjs.addEl(qs);
            });
        });
        return mjs;
    }

    /**
     * ***text*** : Gets or sets the specified text.  
     * The following is an example of how to set text:
     * ```typescript
     * mjs.text = "Text Area Sample Text.....";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const text : string = mjs.text;
     * ```
     */
    public set text(value : string | number) {
        this.setText(value);
    }

    public get text() : string {
        return this.els[0].innerText;
    }

    /**
     * ***setText*** : Gets or sets the specified text.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.setText("Text Area Sample Text .....");
     * ```
     * @param {string | number} value Text content
     * @returns {ModernJS}
     */
    public setText(value : string | number) : ModernJS;

    /**
     * ***setText*** : Gets or sets the specified text.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.setText("Text Area Sample Text .....", true);
     * ```
     * @param {string | number} value Text content
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    public setText(value : string | number, noReload : boolean) : ModernJS;

    public setText(value : string | number, noReload? : boolean) : ModernJS  {
        this.els.forEach((el : HTMLElement) => {
            el.childNodes.forEach((c)=>{
                el.removeChild(c);
            });
            el.innerText = value.toString();
        });
        if (!noReload) this.reload(); 
        return this;
    }

    /**
     * ***html*** : Gets or sets an HTML tag.  
     * The following is an example of how to set text:
     * ```typescript
     * mjs.html = "<h1>HTML Tag Test Sample ....</h1>";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const html : string = mjs.html;
     * ```
     */
    public set html(value : string | HTMLElement | ModernJS) {
        this.setHtml(value);
    }

    public get html() : string {
        return this.els[0].innerHTML;
    }


    /**
     * ***setHtml*** : Gets or sets an HTML tag.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.setHtml("<h1>HTML Tag Test Sample ....</h1>");
     * ```
     * @param {string | HTMLElement | ModernJS} value HTML tag content or HTMLElement, ModernJS class
     * @returns {ModernJS}
     */
    public setHtml(value : string | HTMLElement | ModernJS) : ModernJS;

    /**
     * ***setHtml*** : Gets or sets an HTML tag.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.setHtml("<h1>HTML Tag Test Sample ....</h1>", true);
     * ```
     * @param {string | HTMLElement | ModernJS} value HTML tag content or HTMLElement, ModernJS class
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    public setHtml(value : string | HTMLElement | ModernJS, noReload : boolean) : ModernJS;

    public setHtml(value : string | HTMLElement | ModernJS, noReload? : boolean) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            el.childNodes.forEach((c)=>{
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
                for (let n = 0 ; n < c.length ; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) this.reload();
        return this;
    }

    /**
     * ***outerHTML*** : Get or set the outerHTML.  
     * The following is an example of how to set text:
     * ```typescript
     * mjs.outerHTML = "<h1>Outer HTML Tag Test Sample ....</h1>";
     * ```
     * The following is an example of how to get text:
     * ```typescript
     * const outerHTML : string = mjs.outerHTML;
     * ```
     */
    public set outerHtml(value : string) {
        this.els.forEach((el : HTMLElement) => {
            el.childNodes.forEach((c)=>{
                el.removeChild(c);
            });
            el.outerHTML = value;
        });
        this.reload();
    }

    public get outerHtml() : string {
        return this.els[0].outerHTML;
    }

    /**
     * ***afterBegin*** : Inserts content immediately below the target element, before the first child.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.afterBegin("<h1>afterBegin HTML Tag Test Sample ....</h1>");
     * ```
     * @param {string | HTMLElement | ModernJS} value Inserted Content
     * @returns {ModernJS}
     */
    public afterBegin(value : string | HTMLElement | ModernJS) : ModernJS;

    /**
     * ***afterBegin*** : Inserts content immediately below the target element, before the first child.
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.afterBegin("<h1>afterBegin HTML Tag Test Sample ....</h1>", true);
     * ```
     * @param {string | HTMLElement | ModernJS} value Inserted Content
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    public afterBegin(value : string | HTMLElement | ModernJS, noReload : boolean) : ModernJS;

    public afterBegin(value : string | HTMLElement | ModernJS, noReload? : boolean) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("afterbegin", value);
            }
            else if (value instanceof HTMLElement) {
                el.insertAdjacentElement("afterbegin", value);
            }
            else if (value instanceof ModernJS) {
                el.insertAdjacentElement("afterbegin", value.els[0]);

                const c = Object.keys(value.childs);
                for (let n = 0 ; n < c.length ; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) this.reload();
        return this;
    }

    /**
     * ***append*** : Inserts content directly below the target element, after the last child.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.append("<h1>append HTML Tag Test Sample ....</h1>");
     * ```
     * @param {string | HTMLElement | ModernJS} value Inserted Content
     * @returns {ModernJS}
     */
    public append(value : string | HTMLElement | ModernJS) : ModernJS;

    /**
     * ***append*** : Inserts content directly below the target element, after the last child.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.append("<h1>append HTML Tag Test Sample ....</h1>", true);
     * ```
     * @param {string | HTMLElement | ModernJS} value Inserted Content
     * @param {boolean?} noReload Whether or not reload can be executed
     * @returns {ModernJS}
     */
    public append(value : string | HTMLElement | ModernJS, noReload : boolean) : ModernJS;

    public append(value : string | HTMLElement | ModernJS, noReload? : boolean) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            if (typeof value == "string") {
                el.insertAdjacentHTML("beforeend", value);
            }
            else if (value instanceof HTMLElement) {
                el.append(value);
            }
            else if (value instanceof ModernJS) {
                el.append(value.els[0]);

                const c = Object.keys(value.childs);
                for (let n = 0 ; n < c.length ; n++) {
                    const cname = c[n];
                    const child = value.childs[cname];
                    this.childs[cname] = child;
                }
            }
        });
        if (!noReload) this.reload();
        return this;
    }

    /**
     * ***remove*** : Delete the target element.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.remove();
     * ``` 
     * @returns {ModernJS}
     */
    public remove() : ModernJS {
        this.els.forEach((el : HTMLElement)=>{
            el.remove();
        });
        return this;
    }

    /**
     * ***style*** : Setting style(stylesheets) attributes for an element.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.style({ background: "rgb(255,100,0" });
     * ``` 
     * @param {[name : string] : string | number} stylesheets Style attribute information
     * @returns {ModernJS}
     */
    public style(stylesheets : {[name : string] : string | number}) : ModernJS {
        const c = Object.keys(stylesheets);
        for (let n = 0 ; n < c.length ; n++) {
            const name = c[n];
            const value = stylesheets[name];

            this.els.forEach((el : HTMLElement) => {
                el.style[name] = value;
            });
        }
        return this;
    }

    /**
     * ***getStyle*** : Get style information for the specified selector.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const background : string = mjs.getStyle("background");
     * ``` 
     * @param {string} name selector
     * @returns {string | number}
     */
    public getStyle(name: string) : string | number {
        return this.els[0].style[name];
    }

    /**
     * ***attr** : Get the value for an element attribute name.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const max : string = mjs.attr("max");
     * ``` 
     * @param {string} name attribute name
     * @returns {string}
     */
    public attr(name : string) : string;

    /**
     * ***attr*** : Set attribute information for an element.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.attr("max", 128);
     * ``` 
     * @param {string} name attribute name
     * @param {string | number} value attribute value
     * @returns {ModernJS}
     */
    public attr(name : string, value : string | number) : ModernJS;

    public attr(name : string, value? : string | number) : string | ModernJS {
        if (value != undefined) {
            this.els.forEach((el : HTMLElement) => {
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
     * A code sample of TypeScript is shown below.
     * ```typescript
     * const exists : boolean = mjs.isAttr("min");
     * ``` 
     * @param {string} name attribute name
     * @returns {boolean}
     */
    public isAttr(name : string) : boolean {
        if (!this.els[0]) return false;
        if (this.els[0].attributes[name]) return true;
        return false;
    }

    /**
     * ***removeAttr*** : Remove attribute information from an element.  
     * A code sample of TypeScript is shown below.
     * ```typescript
     * mjs.removeAttr("min");
     * ``` 
     * @param {string} name The name of the attribute to be deleted.
     * @returns {ModernJS}
     */
    public removeAttr(name : string) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            el.removeAttribute(name);
        });    
        return this;
    }

    /**
     * ***src*** : Get or set the src attribute value.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.src = "img/sample.png";
     * ``` 
     * An example of getting the src attribute is below.
     * ```typescript
     * const src : string = mjs.src;
     * ``` 
     */
    public set src(value : string) {
        this.attr("src", value);
    }

    public get src() : string {
        return this.attr("src");
    }

    /**
     * ***placeHolder*** : Get or set the placeholder attribute value.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.placeHolder = "Placeholder text.....";
     * ``` 
     * An example of getting the src attribute is below.
     * ```typescript
     * const placeHolder : string = mjs.placeHolder;
     * ``` 
     */
    public set placeHolder(value: string) {
        this.attr("placeholder", value);
    }

    public get placeHolder() : string {
        return this.attr("placeholder");
    }

    /**
     * ***href*** : Get or set the href attribute value.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.href = "css/style.css";
     * ``` 
     * An example of getting the src attribute is below.
     * ```typescript
     * const href : string = mjs.href;
     * ``` 
     */
    public set href(value : string) {
        this.attr("href", value);
    }

    public get href() : string {
        return this.attr("href");
    }

    /**
     * ***display*** : Set whether elements are visible or hidden.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.display = true;
     * ``` 
     */
    public set display(status: boolean) {
        if (status) {
            this.style({ display: null});
        }
        else {
            this.style({ display: "none"});
        }
    }

    /**
     * ***disable*** : Specifies whether the element can be disabled.
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.disable = true;
     * ``` 
     */
    public set disable(status: number) {
        if (status) {
            this.attr("disable", 1);
        }
        else {
            this.removeAttr("disable");
        }
    }

    /**
     * ***id*** : Gets or sets the ID attribute value of an element.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.id = "ancher1";
     * ``` 
     * An example of getting the src attribute is below.
     * ```typescript
     * const id : string = mjs.id;
     * ``` 
     */
    public set id(value: string) {
        this.attr("id", value);
    }

    public get id() : string {
        return this.attr("id");
    }

    /**
     * ***name*** : Gets or sets the name attribute value of an element.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.name = "tagname1";
     * ``` 
     * An example of getting the src attribute is below.
     * ```typescript
     * const name : string = mjs.name;
     * ``` 
     */
    public set name(value : string) {
        this.attr("name", value);
    }

    public get name() : string {
        return this.attr("name");
    }

    /**
     * ***isClass*** : Gets whether the class attribute of an element exists.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * const exists : boolean = mjs.isClass("class1");
     * ``` 
     * @param {string} className Target class attribute
     * @returns {boolean}
     */
    public isClass(className : string)  : boolean {
        return this.els[0].classList.contains(className);
    }

    /**
     * ***addClass*** : Adds the specified class attribute to an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.addClass("class2");
     * ``` 
     * @param {string} className add class attribute
     * @returns {ModernJS}
     */
    public addClass(className : string) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            el.classList.add(className);
        });
        return this;
    }

    /**
     * ***removeClass*** : Remove a class attribute from an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.removeClass("class2");
     * ``` 
     * @param {string} className delete class attribute
     * @returns {ModernJS}
     */
    public removeClass(className : string) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            el.classList.remove(className);
        });
        return this;
    }

    /**
     * ***data*** : Get the data stored in the Virtual DOM class.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * const data = mjs.data("data01");
     * ``` 
     * @param {string} name data name
     * @returns {any}
     */
    public data(name : string) : any;

    /**
     * ***data*** : Storing data in virtual DOM classes.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.data("data01", { name: "name1", value: "value1" });
     * ``` 
     * @param {string} name save data name
     * @param {any} value value
     * @returns {ModernJS}
     */
    public data(name : string, value : any) : ModernJS;

    public data(name : string, value? : any) : any | ModernJS {
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
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.removeData("data01");
     * ``` 
     * @param {string} name delete data name
     * @returns {ModernJS}
     */
    public removeData(name : string) : ModernJS {
        delete this.datas[name];
        return this;
    }

    /**
     * ***on*** : Sets a listener for events on a virtual DOM element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.on("click", (e: Event, context: ModernJS) => {
     *      context.style({ color: "red" });
     * });
     * ``` 
     * @param {HTMLElementEventMap} event Event name
     * @param {event : Event, context: ModernJS) => void} listener Event Listener
     * @returns {ModernJS}
     */
    public on(event : keyof HTMLElementEventMap, listener : (event : Event, context: ModernJS) => void) : ModernJS;

    /**
     * ***on*** : Sets a listener for events on a virtual DOM element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.on("click", (e: Event, context: ModernJS) => {
     *      context.style({ color: "red" });
     * }, { passive: true });
     * ``` 
     * @param {HTMLElementEventMap} event Event name
     * @param {event : Event, context: ModernJS) => void} listener Event Listener
     * @param {boolean | AddEventListenerOptions} options option settings
     * @returns {ModernJS}
     */
    public on(event : keyof HTMLElementEventMap, listener : (event : Event, context: ModernJS) => void, options?: boolean | AddEventListenerOptions) : ModernJS;

    public on(event : keyof HTMLElementEventMap, listener : (event : Event, context: ModernJS) => void, options?: boolean | AddEventListenerOptions) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            const listener_ = (event : Event) => {
                const my : ModernJS = new ModernJS();
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
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onClick = (e: Event, context: ModernJS) => {
     *      console.log("click event...");
     *      context.style({ color: "red" });
     * };
     * ``` 
     */
    public set onClick (listener : (event : Event, context: ModernJS )=>void) {
        this.on("click", listener);
    }

    /**
     * ***onDblClick*** : Sets an event listener for when an element is double-clicked.   
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onDblClick = (e: Event, context: ModernJS) => {
     *      console.log("double click event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onDblClick (listener : (event : Event, context: ModernJS )=>void) {
        this.on("dblclick", listener);
    }

    /**
     * ***onFocus*** : Sets an event listener for when an element is focused.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onFocus = (e: Event, context: ModernJS) => {
     *      console.log("focus event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onFocus (listener : (event : Event, context: ModernJS )=>void) {
        this.on("focus", listener);
    }

    /**
     * ***onChange*** : Sets an event listener for when an element's input value is changed.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onChange = (e: Event, context: ModernJS) => {
     *      console.log("change event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onChange (listener : (event : Event, context: ModernJS )=>void) {
        this.on("change", listener);
    }

    /**
     * ***onMouseDown*** : Sets an event listener for when the mouse button is pressed on an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onMouseDown = (e: Event, context: ModernJS) => {
     *      console.log("mouse down event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onMouseDown (listener : (event : Event, context: ModernJS )=>void) {
        this.on("mousedown", listener);
    }

    /**
     * ***onMouseUp*** : Sets an event listener for when a mouse button is released on an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onMouseUp = (e: Event, context: ModernJS) => {
     *      console.log("mouse up event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onMouseUp (listener : (event : Event, context: ModernJS )=>void) {
        this.on("mouseup", listener);
    }

    /**
     * ***onMouseMove*** : Sets an event listener for when the mouse cursor moves within an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.onMouseMove = (e: Event, context: ModernJS) => {
     *      console.log("mouse move event...");
     *      context.style({ color: "red" });
     * };
     * ```
     */
    public set onMouseMove (listener : (event : Event, context: ModernJS )=>void) {
        this.on("mousemove", listener);
    }

    /**
     * ***dispatch*** : Executes a specified event on an element.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.dispatch("click");
     * ```
     * @param {HTMLElementEventMap} eventName dispatch event name
     * @returns {ModernJS}
     */
    public dispatch(eventName : keyof HTMLElementEventMap) : ModernJS {
        this.els.forEach((el : HTMLElement) => {
            let event = new Event(eventName);
            el.dispatchEvent(event);
        });
        return this;
    }

    /**
     * ***value*** : If the element is an input field, gets the entered or selected value.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * const value = mjs.value;
     * ```
     */
    public get value() : string | number | Array<string | number> {
        if (!(
            this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"
        )) return;

        // @ts-ignore
        let value : string | Array<string>;
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el : HTMLInputElement) => {
                    if (el.checked) value = el.value;
                });
            }
            else if(this.attr("type") == "checkbox") {
                let values = [];
                this.els.forEach((el : HTMLInputElement) => {
                    if (el.checked) values.push(el.value);
                });
                value = values;
            }
            else if(this.attr("type") == "file") {
                value = this.fileBuffers;
            }
            else {
                if (this.length > 1) {
                    let values = [];
                    this.els.forEach((el : HTMLInputElement) => {
                        values.push(el.value);
                    });
                    value = values;
                }
                else {
                    // @ts-ignore
                    const el : HTMLInputElement = this.els[0];
                    value = el.value;
                }
            }
        }
        else {
            if (this.length > 1) {
                let values = [];
                this.els.forEach((el : HTMLInputElement) => {
                    values.push(el.value);
                });
                value = values;
            }
            else {
                // @ts-ignore
                const el : HTMLInputElement = this.els[0];
                value = el.value;
            }
        }

        return value;
    }

    /**
     * ***value*** : If the element is an input field, set the input value or selected value.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.value("value text ....");
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const value = mjs.value;
     * ```
     */
    public set value(value : string | number | Array<string | number>) {
        if (!(
            this.tagName == "INPUT" ||
            this.tagName == "SELECT" ||
            this.tagName == "TEXTAREA"
        )) return;

        if (typeof value == "number") value = value.toString();

        // @ts-ignore
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el : HTMLInputElement) => {
                    if (value === el.value) el.checked = true;
                });
            }
            else if(this.attr("type") == "checkbox") {
                if (typeof value == "string") value = [ value ];
                value.forEach((v, index)=>{
                    value[index] = v.toString();
                });
                this.els.forEach((el : HTMLInputElement) => {
                    // @ts-ignore
                    if (value.indexOf(el.value) > -1) {
                        el.checked = true;
                    }
                    else{
                        el.checked = false;
                    }
                });
            }
            else if(this.attr("type") == "file") {
                return;
            }
            else {
                this.els.forEach((el : HTMLInputElement, index :  number) => {
                    if (typeof value == "string") {
                        el.value = value;
                    }
                    else {
                        if (value[index]) {
                            el.value = value[index].toString();
                        }
                        else{
                            el.value = "";
                        }
                    }    
                });
            }
        }
        else {
            this.els.forEach((el : HTMLInputElement, index :  number) => {
                if (typeof value == "string") {
                    el.value = value;
                }
                else {
                    if (value[index]) {
                        el.value = value[index].toString();
                    }
                    else{
                        el.value = "";
                    }
                }    
            });
        }
        this.dispatch("change");
    }

    /**
     * ***checked*** : If the element is a checkbox, sets whether it can be selected.  
     * A code sample of TypeScript is shown below.  
     * An example of setting the src attribute is as follows:
     * ```typescript
     * mjs.checked = true;
     * ```
     * An example of getting the src attribute is below.
     * ```typescript
     * const checked : boolean = mjs.checked;
     * ```
     */
    public set checked(status: boolean) {
        // @ts-ignore
        const el : HTMLInputElement = this.els[0];
        el.checked = status;
    }

    public get checked() : boolean {
        // @ts-ignore
        const el : HTMLInputElement = this.els[0];
        return el.checked;
    }

    /**
     * ***reset*** : If the element is an input field, resets the input or selected value.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.reset();
     * ```
     * @returns {ModernJS}
     */
    public reset() : ModernJS {
        if (this.tagName == "INPUT") {
            if (this.attr("type") == "radio") {
                this.els.forEach((el : HTMLInputElement) => {
                    el.checked = false;
                });
            }
            else if(this.attr("type") == "checkbox") {
                this.els.forEach((el : HTMLInputElement) => {
                    el.checked = false;
                });
            }
            else {
                this.els.forEach((el : HTMLInputElement, index :  number) => {
                    el.value = "";
                });
                if (this.attr("type") == "file") {
                    this.fileBuffers = [];
                }
            }
        }
        else {
            this.els.forEach((el : HTMLInputElement, index :  number) => {
                if (this.tagName == "SELECT") {
                    // @ts-ignore
                    el.selectedIndex = 0;
                }
                else{
                    el.value = "";
                }
            });
        }
        return this;
    }

    /**
     * ***selectAddParam*** : If the element is a select tag, add an item option.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.selectAddParam({
     *      0: "select colum 0",
     *      1: "select colum 1",
     *      2: "select colum 2",
     *      3: "select colum 3",
     * });
     * ```
     * @param {ModernJSSelectOption} params Item options
     * @returns {ModernJS}
     */
    public selectAddParam(params : ModernJSSelectOption) : ModernJS;

    /**
     * ***selectAddParam*** : If the element is a select tag, add an item option.
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.selectAddParam({
     *      0: "select colum 0",
     *      1: "select colum 1",
     *      2: "select colum 2",
     *      3: "select colum 3",
     * });
     * ```
     * @param {ModernJSSelectOption} params Item options
     * @param {HTMLOptGroupElement} optgroup optgroup element
     * @returns {ModernJS}
     */
    public selectAddParam(params : ModernJSSelectOption, optgroup : HTMLOptGroupElement) : ModernJS;

    public selectAddParam(params : ModernJSSelectOption, optgroup? : HTMLOptGroupElement) : ModernJS {
        const c = Object.keys(params);
        for (let n = 0 ; n < c.length ; n++) {
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
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.selectEmpty("--- Select ----");
     * ```
     * @param {string} text Selection Text Name
     * @returns {ModernJS}
     */
    public selectEmpty(text : string) : ModernJS {
        const optionEl = document.createElement("option");
        optionEl.value = "";
        optionEl.innerHTML = text;
        this.els.forEach((el)=>{
            el.insertAdjacentElement("afterbegin", optionEl);
        });
        return this;
    }

    /**
     * ***selectResetParam*** : If the element is a Select tag, reset the options.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * mjs.selectResetParam();
     * ```
     * @returns {ModernJS}
     */
    public selectResetParam() : ModernJS {
        this.text = "";
        return this;
    }

    /**
     * ***selectedText*** : If the element is a checkbox, gets the display text of the selected item.  
     * A code sample of TypeScript is shown below.  
     * ```typescript
     * const selected : string = mjs.selectedText;
     * ```
     */
    public get selectedText() : string | Array<string> {
        const values = [];
        this.els.forEach((el : HTMLSelectElement) => {
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
    public get childValues() : {[name : string] : string | number | Array<string | number>} {
        const c = Object.keys(this.childs);
        let values = {};
        for (let n = 0 ; n < c.length ; n++) {
            const name = c[n];
            const child = this.childs[name];
            values[name] = child.value;
        }
        return values;
    }
}

/**
 * ***dom*** : Finds an element for the specified query path and returns the virtual DOM class that contains the element.
 * For example, prepare the following HTML:
 * ```html
 * <div class="item"></div>
 * ```
 * To get the tag with the class attribute item as a virtual DOM, write the following code in TypeScript:
 * ```typescript
 * const subQuery : ModernJS = dom(".item");
 * ``` 
 * @param {string} queryString QueryString
 * @returns {ModernJS}
 */
export const dom = ModernJS.dom;