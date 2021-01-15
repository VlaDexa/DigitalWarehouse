"use strict";
// Импортирую необходимые модули
import express from "express";
import path from "path"
import fs from "fs"

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../../public'))); //Указываю Экспрессу какой рендер-движок использовать
app.use(express.json())

app.get('/', function (_req, res) { //Когда придёт стандартный запрос GET
    res.redirect('index.html'); //Перенаправить в index.html
});

app.get('/things', (_req, res) => { //Когда придёт запрос GET в /things
    res.sendFile(path.join(__dirname, '../../src/things.json'))// Выслать содержимое файла
})

app.get('/css/index.css', (_req, res) => {//Когда придёт запрос GET в /css/index.css
    res.sendFile(path.join(__dirname, '../css/index.css'))// Выслать содержимое файла
})

app.put('/add', (req, res) => {
    try {
        let json = JSON.parse(String(fs.readFileSync(path.join(__dirname, "../../src/things.json"))))
        json.push(req.body)
        fs.writeFileSync(path.join(__dirname, "../../src/things.json"), JSON.stringify(json))
        res.send("SuccAss")
    } catch (e) {
        console.error(e)
        res.send("EpicFail.gif")
    }
})

app.listen(port, () => { //Ждать подсоединений на порту
    console.log(`Сервер запущен на http://localhost:${port}`)// Выводит в консоль адрес, по которому можно подключится с твоей машины
})
