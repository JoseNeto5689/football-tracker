window.addEventListener("load", () => {
    document.querySelector("button#add_event").addEventListener("click", makeEvent)
    reloadTable()
})



function reloadTable() {
    const table = document.querySelector("tbody#events")
    table.innerHTML = ""
    fetch("/event")
        .then(res => res.json())
        .then(res => {
            res.forEach(item => {
                const tr = document.createElement("tr")

                const title = document.createElement("td")
                const local = document.createElement("td")
                const datetime = document.createElement("td")
                const players = document.createElement("td")
                const actions = document.createElement("td")

                title.innerText = item.title

                local.innerText = item.local

                datetime.innerText = item.datetime

                const showPLayers = document.createElement("button")
                showPLayers.innerText = "Lista de presença"
                showPLayers.addEventListener("click", () => {
                    window.location.replace(`${window.location.href}match.html?id=${item.id}`)
                })
                players.appendChild(showPLayers)

                const deleteBT = document.createElement("button")
                deleteBT.innerText = "Remover"
                deleteBT.addEventListener("click", () => {
                    fetch(`/event/${item.id}`, {
                        method: "delete"
                    })
                        .then(() => {
                            reloadTable()
                        })
                })
                actions.appendChild(deleteBT)


                tr.appendChild(title)
                tr.appendChild(local)
                tr.appendChild(datetime)
                tr.appendChild(players)
                tr.appendChild(actions)
                table.appendChild(tr)

            })
        })
}

function makeEvent(e) {
    const event = {
        title: document.querySelector("#event_title").value,
        datetime: document.querySelector("#event_time").value,
        local: document.querySelector("#event_local").value,
    }
    if (event.title == "" || event.datetime == "" || event.local == "") {
        return
    }
    e.preventDefault()
    try {
        fetch("/event", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(() => {
                reloadTable()
            })


    }
    catch (e) {
        console.log(e)
    }
}