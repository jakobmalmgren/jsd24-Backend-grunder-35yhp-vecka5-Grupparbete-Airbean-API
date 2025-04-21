import dotenv from "dotenv";
import orderDb from "../models/orderModel.js";
import historyDb from "../models/historyModel.js";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// SAMMANFATTNINGSVIS SÅ:
// "LÄGGER EN ORDER" SAMTIDIGT SKICKAR TILLBAKA ETA
//

// Genererar ETA
const generateETA = (min = 2, max = 5) => {
  const mins = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${mins} minuter`;
};

const orderIdNumber = uuidv4();
// Promisify NeDB-metoder för att skapa promisekod
const findAsync = promisify(orderDb.find).bind(orderDb);
const insertAsync = promisify(historyDb.insert).bind(historyDb);
const removeAsync = promisify(orderDb.remove).bind(orderDb);

const createCartStatus = async (req, res) => {
  const authKey = req.headers["x-api-key"];
  try {
    // 1. Hämta alla produkter i varukorgen

    // const cartItems = await findAsync({});
    const cartItems = await findAsync({ authKey });
    //
    const totalSum = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Varukorgen är tom" });
    }
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("sv-SE", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);

    // 2. Skapa ett nytt orderobjekt
    const order = {
      items: cartItems,
      createdAt: formattedDate,
      orderNumber: orderIdNumber,
      total: totalSum,
      //....ändra? få me authid....
      // authKey: authKey,
    };

    // 3. Lägg till ordern i historiken
    await insertAsync(order);

    // await removeAsync({}, { multi: true });
    await removeAsync({ authKey }, { multi: true });
    //....ändra? få me authid..

    // 5. Svara med bekräftelse
    res.status(201).json({
      message: "Order skapad",
      eta: generateETA(),
      orderNumber: orderIdNumber,
    });
  } catch (err) {
    console.error("Kunde inte slutföra beställning:", err);
    res.status(500).json({ message: "Serverfel", error: err });
  }
};

export { createCartStatus };
