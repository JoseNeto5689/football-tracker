import { readDB } from "../database/index.js";

export async function listEvents(req, res) {
    try {
        let content
        await readDB().then((data) => {
            content = data
        })

        res.json(content)
    }
    catch (e) {
        console.log(e)
    }

}