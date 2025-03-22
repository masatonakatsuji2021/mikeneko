import { App, AppRouteType } from "App";
import { RouteMaps } from "RouteMap";
import { Maps } from "app/config/Maps";

export class MyApp extends App {
    
    /**
     * ### routeType
     * Changed routing method for each platform.
     */
    public static get routeType() :  AppRouteType{

        // If platform is "web":
        if (platform == "web") {
            return AppRouteType.web;
        }
        // If platform is "app":
        else {
            return AppRouteType.application;
        }
    }
    
    public static maps : RouteMaps = Maps;
}