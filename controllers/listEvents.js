import moment from "moment";
import { readDB } from "../database/index.js";
moment.locale("pt-br")

export async function listEvents(req, res) {
    try {
        let content
        await readDB().then((data) => {
            content = data
        })
        const result = []
        content.forEach(item => {
            result.push({
                id: item.id,
                title: item.title,
                local: item.local,
                datetime: `${moment(item.datetime).format('L')} as ${moment(item.datetime).format("LT")}`,
                players: item.players
            })
        })
        res.json(result)
    }
    catch (e) {
        console.log(e)
    }

}