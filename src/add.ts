let style = document.createElement('style'); // Создаю тег стилей
fetch(`${window.location}/../css/index.css`).then((res) => {
    res.text().then((text) => {
        style.textContent = text; // Задаю тексту в теге стилей полученные данные
        document.head.appendChild(style); //Привязываю тег стиля к тегу head
    });
});

//Функция проверки правильности URL
function isUrl(string: string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true
}

window.onload = () => {
    document.getElementById("send")?.addEventListener("click", () => {
        let name = document.getElementById('new_name') as HTMLInputElement
        let description = document.getElementById('new_description') as HTMLInputElement
        let image = document.getElementById('new_image') as HTMLInputElement
        let output = document.getElementById("output")

        if (!name.value || !description.value) {
            if (output) {
                output.textContent = "Заполни все обязательные поля"
            }
            return
        }

        let body
        if (image) {
            body = { name: name.value, description: description.value, image: image.value }
        } else {
            body = { name: name.value, description: description.value }
        }
        console.log(JSON.stringify(body))

        fetch(`${window.location.href}/../add`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            response.text().then(text => {
                if (text == "SuccAss") {
                    if (output) {
                        output.textContent = "Отправлено"
                    }
                } else {
                    if (output) {
                        output.textContent = "Ошибка"
                    }
                }
            })
        })
    })
}
