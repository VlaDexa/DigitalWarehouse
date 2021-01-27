import { json, opine } from "https://deno.land/x/opine@1.1.0/mod.ts";
import { css, js, media } from "./routers/mod.ts"

let console_log = async (output: string) => {
    Deno.stdout.write(new TextEncoder().encode(output + "\n"))
}

const app = opine();
const port = 3000;

app.use(json())

app.get("/", (_req, res) => {
    res.type("text/html").send(Deno.readFileSync("./site/index.html"))
});

app.use("/js", js);

app.use("/css", css);

app.use("/media", media);

app.get("/things", (_, res) => {
    res.type("application/json").send(Deno.readFileSync("./site/js/things.json"))
})

app.get("/favicon.ico", (_, res) => {
    res.type("icon").sendFile(Deno.cwd() + "/site/favicon.ico")
})

app.get("/add.html", (_, res) => {
    res.sendFile(Deno.cwd() + "/site/add.html")
})

app.put('/add', (req, res) => {
    try {
        let json: { name: string, description: string, size: number, image?: string }[] = JSON.parse(new TextDecoder().decode(Deno.readFileSync("./site/js/things.json")))
        json.push(req.body)
        res.send("SuccAss")
        Deno.writeFile("./site/js/things.json", new TextEncoder().encode(JSON.stringify(json)))
    } catch (e) {
        Deno.stderr.write(new TextEncoder().encode(e))
        res.send("EpicFail.gif")
    }
})

app.listen(port, () => {
    console_log(`http://localhost:${port}/`)
});
