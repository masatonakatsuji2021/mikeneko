import { Builder, BuildOption, BuildPlatrom } from "mikeneko/src/Builder";

export class Mikeneko {
    public static build (option? : BuildOption) {
        Builder.build(option);
    }
}

export class BuildHandle {

    public static handleBegin(platform : BuildPlatrom) : void {}

    public static handleComplete(platform : BuildPlatrom) : void {}
}