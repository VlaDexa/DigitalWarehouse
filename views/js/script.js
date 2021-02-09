"use strict";
const CreateDIV = async (name, size, uuid) => {
    let node = document.getElementsByClassName("main")[0];
    let div = node.appendChild(document.createElement("div"))
    div.className = "article"

    let createdName = document.createElement("p")
    createdName.textContent = name;
    createdName.className = "name";
    div.appendChild(createdName);

    let createdDescription = document.createElement("p")
    createdDescription.className = "description";
    createdDescription.textContent = size;
    div.appendChild(createdDescription);

    let createdUUID = document.createElement("p")
    createdUUID.className = "uuid";
    createdUUID.textContent = uuid;
    div.appendChild(createdUUID)

    let createdButton = document.createElement("button")
    createdButton.classname = "article_button"
    createdButton.textContent = "Послать на склад"
    createdButton.addEventListener("click", (event) => {
        let button = createdButton
        let children = Array.from(button.parentElement.childNodes).slice(1,-1)
        let textArray = []

        children.forEach(element => {
            textArray.push(element.textContent)
        });
        
        fetch(`${window.location.href}warehouse`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(textArray)
        }).then((recieved) => {
            recieved.text().then((text)=> {
                button.textContent = (text === "Remote")?"Отправить на удалённый склад":JSON.stringify(text).join(", ");
                button.disabled = true
            })
        });
    })
    div.appendChild(createdButton)
}

window.onload = () => {
    const file = document.getElementById("file")
    file.addEventListener("change", () => {
        let reader = new FileReader();
        reader.readAsText(file.files[0])

        reader.onload = () => {
            let result = {body: reader.result}

            fetch(`${window.location.href}things`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result)
            }).then(async (recieved) => {
                let response = await recieved.json()
                if (response.err) {
                    throw new TypeError("Server Error")
                }
                file.hidden = true
                response.forEach((elem) => {
                    CreateDIV(elem.name, elem.size, elem.uuid)
                })
            })
        }
    })

    // Функция поиска
    const search_bar = document.getElementById("search-bar"); //Получаю инпут

    search_bar.addEventListener('input', () => {
        Array.from(document.getElementsByClassName("name")).forEach(name => {
            name.parentElement.hidden = !name.textContent.toLowerCase().includes(search_bar.value.toLowerCase()) ? true : false
        });
    });
};
