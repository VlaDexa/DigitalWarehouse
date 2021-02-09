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
let items: {
  name: string;
  size: string;
  weight: string;
  uuid: string;
}[];

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
      items = el;
      res.send(JSON.stringify(el));
    }).catch((err) => console.error(err));
  } catch (err) {
    res.send('{"err": "Error"}');
  }
});

app.put("/warehouse", (req, res) => {
  let textArray: string[] = req.body;
  let size = textArray[0].split("*").map(Number);

  if (size[0]> 2000 || size[1]> 2000 || size[2]> 2000) res.send("Remote")

  if (size[1] > 1000 && size[0] > 1000) {
    if (scheme["4"].length > 0) {
      res.send(JSON.stringify(scheme["4"].shift()));
    } else res.send("Remote");
  } else if (size[0] > 1000 || size[1] > 1000) {
    if (scheme["2"].length > 0) {
      res.send(JSON.stringify(scheme["2"].shift()));
    } else {
      res.send("Remote");
    }
  } else {
    if (scheme["1"].length > 0) res.send(JSON.stringify(scheme["1"].shift()));
    else res.send("Remote");
  }
});

app.get("/favicon.ico", (_, res) => {
  res.type("icon").sendFile(Deno.cwd() + "/views/favicon.ico");
});

app.listen(port, () => {
  console_log(`http://localhost:${port}/`);
  GetScheme().then((result) => {
    scheme = result;
  }).catch((err) => {
    Deno.stderr.write(new TextEncoder().encode(err));
  });
});
