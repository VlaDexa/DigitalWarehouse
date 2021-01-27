"use strict";
let styles = document.createElement('style'); // Создаю тег стилей
fetch(`${window.location.href}css/index.css`).then((res) => {
    res.text().then((text) => {
        styles.textContent = text; // Задаю тексту в теге стилей полученные данные
        document.head.appendChild(styles); //Привязываю тег стиля к тегу head
    });
});
//Функция для создания боксов
const CreateDIV = async (name, description, size, image) => {
    let node = document.getElementsByClassName("main")[0];
    let div = node.appendChild(document.createElement("div"));
    div.className = "article";
    if (image) {
        let createdImage = document.createElement("img");
        createdImage.className = "image";
        createdImage.src = image;
        div.appendChild(createdImage);
    }
    let createdName = document.createElement("p");
    createdName.textContent = name;
    createdName.className = "name";
    div.appendChild(createdName);
    let createdDescription = document.createElement("p");
    createdDescription.className = "description";
    createdDescription.textContent = description;
    div.appendChild(createdDescription);
    let createdSize = document.createElement("p");
    createdSize.className = "size"
    createdSize.textContent = size
    div.appendChild(createdSize)
};
const things = fetch(`${window.location.href}things`).then(async (response) => {
    return JSON.parse(await response.text()); //Преобразую полученное в текст и потом возвращаю объект
});
window.onload = async () => {
    things.then((thingis) => {
        thingis.forEach((element) => {
            CreateDIV(element.name, element.description, element.size, element.image); //Для каждого объекта из массива создаю бокс
        });
    });
    // Функция поиска
    const search_bar = document.getElementById("search-bar"); //Получаю инпут
    search_bar.addEventListener('input', () => {
        Array.from(document.getElementsByClassName("name")).forEach(name => {
            if (name.parentElement) {
                if (!name.innerHTML.includes(search_bar.value)) { //Фильтрую боксы: Если name в них содержит то, что есть в search-box, то они становятся видимы, иначе не видимы
                    name.parentElement.hidden = true;
                }
                else {
                    name.parentElement.hidden = false;
                }
            }
        });
    });
};
