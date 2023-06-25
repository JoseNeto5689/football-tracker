import { readDB, writeDB } from "../database/index.js";

export async function removeEvent(req, res) {
    try {
        const { id } = req.params
        let content;
        await readDB().then((data) => {
            content = data
        })
        let newContent = []
        content.forEach((item) => {
            if (id != item.id) {
                newContent.push(item)
            }
        })
        await writeDB(newContent)

        res.json({ status: "success" })
    }
    catch (e) {
        res.status(400).json({ status: "error", content: e })
    }

}