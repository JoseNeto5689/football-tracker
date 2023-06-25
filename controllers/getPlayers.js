import { readDB } from "../database/index.js";

export async function getPlayers(req, res) {
    const { id } = req.params
    try {
        let content
        await readDB().then((data) => {
            content = data
        })
        content.forEach(item => {
            if (item.id == id) {
                return res.json(item.players)
            }
        });
    }
    catch (e) {
        res.status(400).json({ status: "error", content: e })
    }

}