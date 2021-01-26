import { Router, serveStatic } from "https://deno.land/x/opine@1.1.0/mod.ts";
let media = Router()

media.use(serveStatic("site/media"))

export { media }
