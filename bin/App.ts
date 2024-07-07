export interface Routes {
    [url : string] : string,
}

export class App {

    /**
     * ***appName** : Name of the application
     */
    public static appName : string;

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