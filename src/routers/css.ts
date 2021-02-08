import { Router } from "https://deno.land/x/opine/mod.ts";
let css = Router()

css.get("/add.css", (_, res) => {
    res.type("text/css").send(Deno.readFileSync("./site/css/add.css"))
})

css.get("/index.css", (_, res) => {
    res.type("text/css").send(Deno.readFileSync("./site/css/index.css"))
})

export { css }
