window.addEventListener("load", () => {
    document.querySelector("button#add_event").addEventListener("click", (e) => {
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
                .then((res) => res.json())
                .then((res) => { console.log(res) })


        }
        catch (e) {
            console.log(e)
        }
    })
})