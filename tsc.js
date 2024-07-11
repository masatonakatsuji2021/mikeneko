const { execSync } = require("child_process");

console.log("TransComplie Start");

console.log("tsc");

execSync("tsc");

console.log("tsc(es5)");
execSync("cd ./bin && tsc --project tsconfigs/es5.json");

console.log("tsc(es6)");
execSync("cd ./bin && tsc --project tsconfigs/es6.json");

console.log("tsc(es2016)");
execSync("cd ./bin && tsc --project tsconfigs/es2016.json");

console.log("tsc(es2017)");
execSync("cd ./bin && tsc --project tsconfigs/es2017.json");

console.log("tsc(es2018)");
execSync("cd ./bin && tsc --project tsconfigs/es2018.json");

console.log("tsc(es2019)");
execSync("cd ./bin && tsc --project tsconfigs/es2019.json");

console.log("tsc(es2020)");
execSync("cd ./bin && tsc --project tsconfigs/es2020.json");

console.log("tsc(es2021)");
execSync("cd ./bin && tsc --project tsconfigs/es2021.json");

console.log("tsc(es2022)");
execSync("cd ./bin && tsc --project tsconfigs/es2022.json");

console.log("tsc(esnext)");
execSync("cd ./bin && tsc --project tsconfigs/esnext.json");

console.log("......Complete!");