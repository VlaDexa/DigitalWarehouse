import { Router, serveStatic } from "https://deno.land/x/opine/mod.ts";
let media = Router()

media.use(serveStatic("site/media"))

export { media }
