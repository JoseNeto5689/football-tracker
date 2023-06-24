import { readDB } from "../database/index.js";
import moment from "moment/moment.js";
moment.locale("pt-br")

export async function getEvent(req, res) {
    const { id } = req.params
    try {
        let content
        await readDB().then((data) => {
            content = data
        })
        content.forEach(item => {
            if (item.id == id) {
                return res.json({
                    id: item.id,
                    title: item.title,
                    local: item.local,
                    datetime: `${moment(item.datetime).format('L')} as ${moment(item.datetime).format("LT")}`,
                    players: item.players

                })
            }
        });
    }
    catch (e) {
        res.status(400).json({ status: "error", content: e })
    }

}