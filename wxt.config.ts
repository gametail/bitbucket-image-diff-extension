import { defineConfig } from "wxt";
import { resolve } from "node:path";

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: "chrome",
    modules: ["@wxt-dev/module-react"],
    srcDir: "src",
    runner: {
        // page thats visited on run dev
        // startUrls: ["http://localhost:5173/"],

        //persist dev browser data Mac/Linux
        chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],

        //persist dev browser data Windows, the path must be absolute
        // chromiumProfile: resolve(".wxt/chrome-data"),
        // keepProfileChanges: true,
    },
});
