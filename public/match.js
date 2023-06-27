window.addEventListener("load", () => {
    document.querySelector("button#new_player").addEventListener("click", addPlayer)
    document.querySelector("button#new").addEventListener("click", showModal)
    document.querySelector("button#back_events").addEventListener("click", () => {
        window.location.replace("/")
    })
    document.querySelector("button#cancel").addEventListener("click", () => {
        document.querySelector("div.modal").style.display = "none"
    })
    fillPlayerTable()
})

function showModal() {
    document.querySelector("div.modal").style.display = "flex"
}

function addPlayer(e) {
    const params = getParameters()
    const player = {
        name: document.querySelector("input#player_name").value,
        phone: document.querySelector("input#player_phone").value
    }

    if (player.name == "" || player.phone == "") {
        return
    }
    e.preventDefault()
    try {
        fetch(`/player/${params.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
            .then(() => {
                fillPlayerTable()
                document.querySelector("div.modal").style.display = "none"
            })
    }
    catch (e) {
        console.log(e)
    }
}

function fillPlayerTable() {
    const params = getParameters()
    const table = document.querySelector("tbody#players")
    fetch(`/players/${params.id}`)
        .then(res => res.json())
        .then(list => {
            table.innerHTML = ""
            list.forEach(item => {
                const tr = document.createElement("tr")
                const name = document.createElement("td")
                const phone = document.createElement("td")
                const presence = document.createElement("td")
                const actions = document.createElement("td")

                name.innerText = item.name

                phone.innerText = item.phone

                const checkPresence = document.createElement("input")
                checkPresence.type = "checkbox"
                checkPresence.checked = item.presence
                checkPresence.addEventListener('click', () => {
                    fetch(`/players/${params.id}/${item.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: item.id,
                            name: item.name,
                            phone: item.phone,
                            presence: !item.presence
                        })
                    })
                        .then(() => {
                            fillPlayerTable()
                        })
                })
                presence.appendChild(checkPresence)

                const deleteBT = document.createElement("button")
                deleteBT.innerText = "Remover"
                deleteBT.addEventListener("click", () => {
                    fetch(`/players/${params.id}/${item.id}`, {
                        method: "delete"
                    })
                        .then(() => {
                            fillPlayerTable()
                        })
                })
                actions.appendChild(deleteBT)

                tr.appendChild(name)
                tr.appendChild(phone)
                tr.appendChild(presence)
                tr.appendChild(actions)

                table.appendChild(tr)

            })
        })
}

function getParameters() {
    let params = window.location.search.substring(1).split("&")
    let obj = {}
    let param
    let i

    for (i in params) {
        if (params[i] === "") continue;

        param = params[i].split("=");
        obj[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    }

    return obj;
}