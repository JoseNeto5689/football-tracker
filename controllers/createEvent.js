import { readDB, writeDB } from "../database/index.js";
import { nextID } from "../utils/index.js";

export async function createEvent(req, res) {
    try {
        const { title, local, datetime } = req.body
        let content;
        await readDB().then((data) => {
            content = data
        })
        content.push({
            id: nextID(content),
            title,
            local,
            datetime,
            players: []
        })
        await writeDB(content)

        res.json({ status: "success" })
    }
    catch (e) {
        console.log(e)
    }

}