export interface Routes {
    [url : string] : string | Routes,
}

export enum AppRouteType {
    web = "web",
    application = "application",
}

export class App {

    /**
     * ***appName** : Name of the application
     */
    public static appName : string;

    /**
     * ***routeType*** : Method for page transition.  
     * web = Change the browser URL and move to the page. You can go back by pressing the back button on the browser.  
     * application = 
     */
    public static routeType : AppRouteType = AppRouteType.web;

    /**
     * ***routes*** : Routing Settings
     */
    public static routes: Routes;

    /**
     * ***backgrounds*** : Background class list to run
     */
    public static backgrounds: Array<string>;

    /**
     * ***sessionStorage*** : SessionStorage Identifier
     */
    public static sessionStorage : string;

    /**
     * ***localStorage*** : LocalStorage Identifiers
     */
    public static localStorage : string;
}