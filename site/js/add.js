"use strict";
let style = document.createElement('style'); // Создаю тег стилей
fetch(`${window.location}/../css/index.css`).then((res) => {
    res.text().then((text) => {
        style.textContent = text; // Задаю тексту в теге стилей полученные данные
        document.head.appendChild(style); //Привязываю тег стиля к тегу head
    });
});
//Функция проверки правильности URL
function isUrl(string) {
    try {
        new URL(string);
    }
    catch (_) {
        return false;
    }

}
window.onload = () => {
    document.getElementById("send")?.addEventListener("click", () => {
        let name = document.getElementById('new_name');
        let description = document.getElementById('new_description');
        let image = document.getElementById('new_image');
        let output = document.getElementById("output");
        let size = document.getElementById("new_size")
        if (name.value == "" || description.value == "" || size.value == "") {
            if (output) {
                output.textContent = "Заполни все обязательные поля";
            }
            return;
        }
        const body = (image) ? { name: name.value, description: description.value, size: size.value, image: image.value } : { name: name.value, description: description.value, size: size.value }
        fetch(`${window.location.href}/../add`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            response.text().then(text => {
                output.textContent = (text == "SuccAss") ? "Отправлено" : "Ошибка";
            });
        });
    });
};
