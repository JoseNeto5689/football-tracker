import { readDB } from "../database/index.js";

export async function getEvent(req, res) {
    const { id } = req.params
    try {
        let content
        await readDB().then((data) => {
            content = data
        })
        content.forEach(item => {
            if (item.id == id) {
                return res.json(item)
            }
        });
    }
    catch (e) {
        console.log(e)
    }

}