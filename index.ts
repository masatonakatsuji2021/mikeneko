import { Builder, BuildOption, BuildPlatrom } from "saiberian/src/Builder";

export class Saiberian {
    public static build (option? : BuildOption) {
        Builder.build(option);
    }
}

export class BuildHandle {

    public static handleBegin(platform : BuildPlatrom) : void {}

    public static handleComplete(platform : BuildPlatrom) : void {}
}