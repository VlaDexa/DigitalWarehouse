"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Импортирую необходимые модули
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public'))); //Указываю Экспрессу какой рендер-движок использовать
app.use(express_1.default.json());
app.get('/', function (_req, res) {
    res.redirect('index.html'); //Перенаправить в index.html
});
app.get('/things', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../src/things.json')); // Выслать содержимое файла
});
app.get('/css/index.css', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../css/index.css')); // Выслать содержимое файла
});
app.put('/add', (req, res) => {
    try {
        let json = JSON.parse(String(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../src/things.json"))));
        json.push(req.body);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../src/things.json"), JSON.stringify(json));
        res.send("SuccAss");
    }
    catch (e) {
        console.error(e);
        res.send("EpicFail.gif");
    }
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`); // Выводит в консоль адрес, по которому можно подключится с твоей машины
});
