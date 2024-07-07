export class Util {

    /**
     * ***getHtml*** : Gets the prepared rendering data for each  
     * @param {string} path rendering data path
     * @returns {string} 
     */
    public static getHtml(path : string) : string {
        let mainView = use("rendering/" + path + ".html");
        mainView =  this.base64Decode(mainView);
        return mainView;
    }

    public static existPublic(path : string) : boolean {
        return useExists("public/" + path);
    }

    /**
     * ***getPublic*** : Get prepared static content data  
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string} 
     */
    public static getPublic(path : string) : string {
        return use("public/" + path);
    }

    public static getModulePath(path : string) : string {
        const paths = path.split("/");
        paths.forEach((p_, index) => {
            if (index == paths.length - 1) {
                p_ = p_.substring(0,1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    }

    public static getModuleName(string : string) : string{
        const strings = string.split("/");
        const string2 = strings[strings.length - 1];
        return string2.substring(0,1).toUpperCase() + string2.substring(1);
    }

    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    public static base64Decode(b64text: string) : string{
        return decodeURIComponent(escape(atob(b64text)));
    }

    /**
     * *** uniqId*** : Generates an arbitrary string of 32 characters
     * @returns {string} uniq id string
     */
     public static uniqId() : string;

    /**
     * *** uniqId*** : generates an arbitrary string of specified length characters.
     * @param {number} length text length
     * @returns {string} uniq id string
     */
    public static uniqId(length : number) : string;
    
    public static uniqId(length? : number) : string{
        if(!length) length = 64;
        const lbn : string = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str : string = "";
        for(var n = 0 ; n < length ; n++){
            let index : number = parseInt((Math.random() * 10000).toString());
            let s : string = lbn[index % lbn.length];   
            str += s;
        }
        return str;
     }

    /**
     * *** datetime*** :  prints the current date and time  
     * Output as fgDateTime class object  
     * @returns {SbnDateTime} FgDateTime class Object  
     */
    public static datetime() : SbnDateTime;

    /**
     * #### datetime
     * Get date and time from given datetime
     * Output as fgDateTime class object
     * @param {string} datetime Specified date and time
     * @returns {SbnDateTime} FgDateTime class Object
     */
    public static datetime(datetime : string) : SbnDateTime;

    public static datetime(datetime? : string) : SbnDateTime{
        return new SbnDateTime(datetime);
    }

    /**
     * ***sleep*** :  Stop processing for a certain period of time.(Synchronous processing)   
     * This method is synchronized by executing it with await inside the asynced function.   
     * 
     * Example) 
     * ```typescript
     * await sleep(1000);        // <= Stop processing for 1000ms
     * ```
     * @param {number} time Stop time
     * @returns {promise<unknown>} Promise Object 
     */
    public static sleep(time : number) : Promise<unknown>{
        return new Promise(function(resolve: Function){
            setTimeout(function(){
                resolve();
            },time);
        });
    }
}

export class SbnDateTime{
    
    private d : Date;

    public constructor(datetime? : string){
        if(datetime){
            this.d = new Date(datetime);
        }
        else{
            this.d = new Date();
        }
    }

    public format(format : string) : string{
        if(format == undefined) format = "YYYY/MM/DD HH:II:SS";
        format = format.split("YYYY").join(this.getYear());
        format = format.split("MM").join(this.getMonth());
        format = format.split("DD").join(this.getDate());
        format = format.split("W").join(this.getDay());
        format = format.split("HH").join(this.getHours());
        format = format.split("II").join(this.getMinutes());
        format = format.split("SS").join(this.getSeconds());
        format = format.split("U").join(this.getTime());  
        return format;
    }

    public getYear() : string{
        return this.d.getFullYear().toString();
    };

    public getMonth() : string{
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    }

    public getDate() : string{
        return ("00" + this.d.getDate()).slice(-2);
    }

    public getDay() : string{
        return this.d.getDay().toString();
    }

    public getHours() : string{
        return ("00" + this.d.getHours()).slice(-2);
    }

    public getMinutes() : string{
        return ("00" + this.d.getMinutes()).slice(-2);
    }

    public getSeconds() : string{
        return ("00" + this.d.getSeconds()).slice(-2);
    }

    public getTime() : string{
        return this.d.getTime().toString();
    }
}
