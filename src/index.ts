import { opine } from "https://deno.land/x/opine@1.1.0/mod.ts";

const app = opine();
const port = 3000;

app.get("/", (_req, res) => {
    res.type("text/html").send(Deno.readFileSync("./site/index.html"))
});

app.get("/js/script.js", (_, res) => {
    res.type('text/js').send(Deno.readFileSync('./site/js/script.js'))
})

app.get("/things", (_, res) => {
    res.type("text/json").send(Deno.readFileSync("./site/js/things.json"))
})

app.listen(port, () => {
    Deno.stdout.write(new TextEncoder().encode(`http://localhost:${port}/`))
});
