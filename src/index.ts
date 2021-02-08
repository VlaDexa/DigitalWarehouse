import { json, opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";
import { css, js, media } from "./routers/mod.ts"
import { GetItems, GetScheme } from "../API/api.ts";

let console_log = async (output: unknown) => {
    switch (typeof (output)) {
        case "string":
            Deno.stdout.write(new TextEncoder().encode(output + "\n"))
            break
        default:
            console.log(output)
    }
}

const app = opine();
const port = 3000;
let scheme;
let items: {
    name: string;
    size: string;
    weight: string;
    uuid: string;
}[];

app.use(json())

app.engine("ejs", renderFileToString)

app.set("view engine", 'ejs')

app.use(serveStatic(Deno.cwd() + "/views"))

app.get("/", (_req, res) => {
    res.render("index", { css: new TextDecoder().decode(Deno.readFileSync("./views/css/index.css")) })
});

app.use("/js", js);

app.use("/css", css);

app.use("/media", media);

app.get("/things", (_, res) => {
    res.type("application/json").send(Deno.readFileSync("./views/js/things.json"))
})

app.put("/things", (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
        GetItems(req.body.body).then((el) => { items = el })
        res.send(items)
    } catch (err) {
        console_log(err)
        res.send('{"err": "Error"}')
    }
})

app.get("/favicon.ico", (_, res) => {
    res.type("icon").sendFile(Deno.cwd() + "/views/favicon.ico")
})

app.get("/add.html", (_, res) => {
    res.sendFile(Deno.cwd() + "/views/add.html")
})

app.put('/add', (req, res) => {
    try {
        res.send("SuccAss")
        Deno.writeFile("./views/js/things.json", new TextEncoder().encode(JSON.stringify(json)))
    } catch (e) {
        Deno.stderr.write(new TextEncoder().encode(e))
        res.send("EpicFail.gif")
    }
})

app.listen(port, () => {
    console_log(`http://localhost:${port}/`)
    GetScheme().then((result) => {
        console_log(result)
        scheme = result
    }).catch((err) => {
        Deno.stderr.write(new TextEncoder().encode(err))
    });
});
