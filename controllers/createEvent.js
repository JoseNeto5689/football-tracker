import { readDB, writeDB } from "../database/index.js";

export async function createEvent(req, res) {
    try {
        const { title, local, datetime } = req.body
        let content;
        await readDB().then((data) => {
            content = data
        })
        content.push({
            title,
            local,
            datetime
        })
        await writeDB(content)

        res.json({ status: "success" })
    }
    catch (e) {
        console.log(e)
    }

}