let styles = document.createElement('style') // Создаю тег стилей
fetch(`${window.location.href}css/index.css`).then((res) => { //Получаю файл стилей с сервера
    res.text().then((text) => { // Преобразую полученное в текст
        styles.textContent = text // Задаю тексту в теге стилей полученные данные
        document.head.appendChild(styles) //Привязываю тег стиля к тегу head
    })
})

//Функция для создания боксов
const CreateDIV = async (name: string, description: string, image?: string) => {
    let node = document.getElementsByClassName("main")[0];
    let div = node.appendChild(document.createElement("div"))
    div.className = "article"
    if (image) {
        let createdImage = document.createElement("img");
        createdImage.className = "image"
        createdImage.src = image;
        div.appendChild(createdImage)
    }

    let createdName = document.createElement("p")
    createdName.textContent = name;
    createdName.className = "name";
    div.appendChild(createdName);

    let createdDescription = document.createElement("p")
    createdDescription.className = "description";
    createdDescription.textContent = description;
    div.appendChild(createdDescription);
}

const things: Promise<{ name: string, description: string, image?: string }[]> = fetch(`${window.location.href}things`).then(async (response) => {//Запрашиваю с сервера данные склада
    return JSON.parse(await response.text()) //Преобразую полученное в текст и потом возвращаю объект
})

window.onload = async () => { //Событие загрузки страницы
    things.then((thingis) => {
        thingis.forEach((element: { name: string, description: string, image?: string }) => {
            CreateDIV(element.name, element.description, element.image) //Для каждого объекта из массива создаю бокс
        });
    })

    // Функция поиска
    const search_bar = document.getElementById("search-bar") as HTMLInputElement; //Получаю инпут
    search_bar.addEventListener('input', () => { //Создаю функцию, которая будет вызываться на каждый input
        Array.from(document.getElementsByClassName("name")).forEach(name => {
            if (name.parentElement) {
                if (!name.innerHTML.includes(search_bar.value)) { //Фильтрую боксы: Если name в них содержит то, что есть в search-box, то они становятся видимы, иначе не видимы
                    name.parentElement.hidden = true;
                } else {
                    name.parentElement.hidden = false;
                }
            }
        });
    })

}
