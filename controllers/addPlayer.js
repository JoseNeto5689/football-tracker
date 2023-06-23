import { readDB, writeDB } from "../database/index.js";
import { nextID } from "../utils/index.js";

export async function addPlayer(req, res) {
    try {
        const { name, phone } = req.body
        const { id: eventID } = req.params
        let content;
        await readDB().then((data) => {
            content = data
        })
        let newContent = []
        content.forEach((item) => {
            if (eventID == item.id) {
                item.players.push({
                    id: nextID(item.players),
                    name,
                    phone,
                    presence: false
                })
            }
            newContent.push(item)
        })
        await writeDB(newContent)

        res.json({ status: "success" })
    }
    catch (e) {
        console.log(e)
    }

}