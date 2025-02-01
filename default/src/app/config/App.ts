import { App, AppRouteType } from "App";
import { RouteMaps } from "RouteMap";
import { Maps } from "app/config/Maps";

export class MyApp extends App {
    
    public static routeType: AppRouteType = AppRouteType.application;

    public static maps : RouteMaps = Maps;

}