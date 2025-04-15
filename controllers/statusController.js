import cartStatusDb from "../models/statusModel.js"
import dotenv from "dotenv"
import orderDb from "../models/orderModel.js"
dotenv.config()

// genererar ett eta med Math.floor och math random, returnerar eta i minuter
const generateETA = (min = 2, max = 5) => {
    const mins = Math.floor(Math.random() * (max - min + 1)) + min
    return `${mins} minuter`
}

// skickar beställningen, kontrollerar så att api nyckeln är med, finns den inte 
//  får vi ett fel 401.

const createCartStatus = (req, res) => {
    const authId = req.headers["x-api-key"]
    if (!authId) {
        return res.status(401).json({
            message: "Du måste inkludera din Api nyckel i header för att göra en beställning"
        })
    }
    //kontrollerar så det är rätt api nyckel i header. om inte returnerar ett fel status 403.
    if (authId !== process.env.AUTH_ID) {
        return res.status(403).json({
            message: "Felaktig API-Nyckel i header"
        })

    }
    // kontrollerar så varukorgen inte är tom. 
    // är den tom går det inte att göra en beställning
    orderDb.find({ authId }, (err, orders) => {
    if(err) {
        return(res.status(500).json({ message: "Fel vid kontroll av varukorg" }))
    }

    if (orders.length === 0) {
        return res.status(400).json({ message: "Din varukorg är tom, du kan inte skapa en beställning"})
    }
    })

    
    // kör funktionen för att generera ETA
    const eta = generateETA()
 
// går bestllningen egenom får vi status "confirmed" datum och klockslag när beställningen gjorts
    const newStatus = {
        authId,
        status: "confirmed",
        eta,
        createdAt: new Date(),
    }
    // testar skicka datan till databasen, går det bra får vi ett meddelande "Beställning bekräftad"
    // samt nedb skapar ett id automatiskt , som vi använder som order id
    //går det inte bra får vi status"500 fel , och meddelande kunde inte spara status"
    cartStatusDb.insert(newStatus, (err, savedDoc) => {
        if (err) {
            return res.status(500).json({
                message: "Kunde inte spara status",
                error: err,
            })
        }

        // går allt bra returnerar vi "beställning bekräftad, eta, status = "confirmed" , samt orderId
        //till frontend.
        res.status(201).json({
            message: "Beställning bekräftad",
            eta: savedDoc.eta,
            status: savedDoc.status,
            orderId: savedDoc._id,
        })
    })
}

export {createCartStatus}

