import menuDb from "../models/menyModel.js";

// Hämta hela menyn
const getMenu = (req, res) => {
    menuDb.find({}, (err, docs) => {
        if (err) {
            return res.status(500).json({ error: "Gick ej hämta menyn" })
        }

        // Antar att första dokumentet i docs innehåller ett fält som heter menu
        const menuData = docs[0]?.menu || []

        res.status(200).json({message: "Lyckades!", data: menuData})
    })
}

// Hämta en specifik produkt från menyn utifrån ID
const getProductById = (req, res) => {
    const productId = parseInt(req.params.id)

    menuDb.findOne({}, (err, doc) => {
        if (err) {
            return res.status(500).json({ error: "Kunde ej hämta menyn" })
        }

        // Optional chaining (`?.`) undvik att koden kraschar om `doc` eller `menu` saknas.
        // `doc.menu` är en array med produkter.
        // `.find(...)` går igenom arrayen och letar efter ett objekt där `item.id` är lika med `productId`
        // Vid match returneras objektet
        const product = doc?.menu?.find(item => item.id === productId)

        if (!product) {
            return res.status(404).json({ error: "Hittade ej produkten"})
        }

        res.status(200).json({ message: "Hittade produkt!", data: product })
        
    })
}

export { getMenu, getProductById }


