import { Router } from "https://deno.land/x/opine/mod.ts";
let js = Router()

js.get("/script.js", (_, res) => {
    res.type('application/js').send(Deno.readFileSync('./site/js/script.js'))
})

export { js }
