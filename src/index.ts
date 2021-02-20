//Как же я ненавижу веб програмирование
import { json, opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";
import { js } from "./routers/mod.ts";
import { GetItems, GetScheme, Scheme } from "../API/api.ts";

let console_log = async (output: unknown) => {
    switch (typeof (output)) {
        case "string":
            Deno.stdout.write(new TextEncoder().encode(output + "\n"));
            break;
        default:
            console.log(output);
    }
};

const app = opine();
const port = 3000;
let scheme: Scheme;

app.use(json());

app.engine("ejs", renderFileToString);

app.set("view engine", "ejs");

app.use(serveStatic(Deno.cwd() + "/views"));

app.get("/", (_req, res) => {
    res.render(
        "index",
        {
            css: new TextDecoder().decode(Deno.readFileSync("./views/css/index.css")),
        },
    );
});

app.use("/js", js);

app.put("/things", (req, res) => {
    try {
        GetItems(req.body.body).then((el) => {
            res.send(JSON.stringify(el));
        }).catch((err) => console.error(err));
    } catch (err) {
        res.send('{"err": "Error"}');
    }
});

app.put("/warehouse", (req, res) => {
    let textArray: string[] = req.body;
    let size = textArray[0].split("*").map(Number);
    const status = size[0] > 2000 || size[1] > 2000 || size[2] > 2000 ? 3 : size[1] > 1000 && size[0] > 1000 ? 2 : size[0] > 1000 || size[1] > 1000 ? 1 : 0;

    switch (status) {
        case 0:
            if (scheme["1"].length > 0) {
                res.send(JSON.stringify(scheme["1"].shift()));
                break
            }
        case 1:
            if (scheme["2"].length > 0) {
                res.send(JSON.stringify(scheme["2"].shift()));
                break
            }
        case 2:
            if (scheme["4"].length > 0) {
                res.send(JSON.stringify(scheme["4"].shift()));
                break
            }
        default: res.send("Remote");
    }
});

app.get("/favicon.ico", (_, res) => {
    res.type("icon").sendFile(Deno.cwd() + "/views/favicon.ico");
});

app.listen(port, () => {
    console_log(`http://localhost:${port}/`);
    GetScheme().then((result) => {
        scheme = result;
    }).catch(() => {
        throw new TypeError("Сервер Кейса не запущен")
    });
});
