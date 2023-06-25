import { readDB, writeDB } from "../database/index.js";

export async function removePlayer(req, res) {
    try {
        const { eventID, playerID } = req.params
        let content;
        await readDB().then((data) => {
            content = data
        })
        let newContent = []
        content.forEach((item) => {
            if (eventID == item.id) {
                let newPlayers = []
                item.players.forEach((item) => {
                    if (item.id != playerID) {
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