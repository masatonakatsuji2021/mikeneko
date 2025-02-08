const { Builder } = require("mikeneko-build");

Builder.build({
    platforms: [
        {
            name: "web",
            debug: true,
            mapping: true,
        },
    ]
});
