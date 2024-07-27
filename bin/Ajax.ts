export enum AjaxMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface AjaxOption {
    
    url : string,

    method? : AjaxMethod,

    data? : {[name : string] : string | number},

    type? : string,
}

export class Ajax {

    public static send(params : AjaxOption) {

    }
}