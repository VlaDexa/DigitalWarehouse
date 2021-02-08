import { Router } from "https://deno.land/x/opine/mod.ts";
let js = Router()

js.get("/script.js", (_, res) => {
    res.type('application/js').send(Deno.readFileSync('./site/js/script.js'))
})

js.get("/add.js", (_, res) => {
    res.type('application/js').send(Deno.readFileSync('./site/js/add.js'))
})

export { js }
