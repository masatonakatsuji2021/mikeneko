export interface Routes {
    [url : string] : string,
}

export class App {

    public static appName : string;

    public static routes: Routes;

    public static backgrounds: Array<string>;
}