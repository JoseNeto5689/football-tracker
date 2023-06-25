import fs from "fs/promises"
import path from "path";
let __dirname = path.resolve("database/database.json")

export async function readDB() {
    try {
        const content = await fs.readFile(__dirname, 'utf8');
        const json = JSON.parse(content);
        return json;
    } catch (error) {
        console.error(error);
    }
}

export async function writeDB(data) {
    data = JSON.stringify(data)
    try {
        fs.writeFile(__dirname, data, (error) => {
            if (error) {
                console.log(error)
            }
            console.log("Escrita realizada com sucesso")
        })
    } catch (error) {
        console.log(error)
    }
}