import { App, AppRouteType, Routes } from "App";

export class MyApp extends App {
    
    public static routeType: AppRouteType = AppRouteType.application;

    public static routes : Routes = {
        "/" : "home",
        "/page1" : "page1",
    };

}