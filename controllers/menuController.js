import menuDb from "../models/menyModel.js";

const getMenu = (req, res) => {
    menuDb.find({}, (err, docs) => {
        if (err) {
            return res.status(500).json({ error: "Gick ej hämta menyn" })
        }

        const menuData = docs[0]?.menu || []

        res.status(200).json({message: "Lyckades!", data: menuData})
    })
}

export { getMenu }