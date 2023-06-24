import { readDB, writeDB } from "../database/index.js";

export async function updatePlayer(req, res) {
    try {
        const { name, phone, presence } = req.body
        const { eventID, playerID } = req.params

        let content

        await readDB().then((data) => {
            content = data
        })

        let newContent = []

        content.forEach((item) => {
            if (eventID == item.id) {
                let newPlayers = []
                item.players.forEach((item) => {
                    if (item.id == playerID) {
                        newPlayers.push({
                            id: item.id,
                            name: name,
                            phone: phone,
                            presence: presence
                        })
                    } else {
                        newPlayers.push(item)
                    }
                })
                item.players = newPlayers
            }
            newContent.push(item)
        })

        await writeDB(newContent)

        res.json({ status: "success" })
    }
    catch (e) {
        res.status(400).json({ status: "error", content: e })
    }

}