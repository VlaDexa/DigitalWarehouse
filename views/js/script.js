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
}

window.onload = () => {
    const file = document.getElementById("file")
    file.addEventListener("change", () => {
        let reader = new FileReader()
        reader.onload = () => {
            let result = reader.result
            console.log(result)

            fetch(`${window.location.href}things`, {
                method: "PUT",
                body: JSON.stringify({ body: result })
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
        reader.readAsText(file.files[0])
    })

    // Функция поиска
    const search_bar = document.getElementById("search-bar"); //Получаю инпут

    search_bar.addEventListener('input', () => {
        Array.from(document.getElementsByClassName("name")).forEach(name => {
            name.parentElement.hidden = !name.textContent.toLowerCase().includes(search_bar.value.toLowerCase()) ? true : false
        });
    });
};
