import { Builder, BuildOption, BuildPlatform } from "mikeneko/src/Builder";

export * from "mikeneko/src/Builder";

export class Mikeneko {
    public static build (option? : BuildOption) {
        Builder.build(option);
    }
}

export class BuildHandle {

    public static handleBegin(platform : BuildPlatform) : void {}

    public static handleComplete(platform : BuildPlatform) : void {}
}