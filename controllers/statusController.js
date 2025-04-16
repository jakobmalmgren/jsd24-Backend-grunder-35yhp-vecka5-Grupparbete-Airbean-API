import dotenv from "dotenv";
import orderDb from "../models/orderModel.js";
import historyDb from "../models/historyModel.js";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// Genererar ETA
const generateETA = (min = 2, max = 5) => {
  const mins = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${mins} minuter`;
};

const orderIdNumber = uuidv4();
// Promisify NeDB-metoder
const findAsync = promisify(orderDb.find).bind(orderDb);
const insertAsync = promisify(historyDb.insert).bind(historyDb);
const removeAsync = promisify(orderDb.remove).bind(orderDb);

// 👇 All kod hamnar här inne!
const createCartStatus = async (req, res) => {
  const authId = req.authId;
  //   const authId = req.headers["x-api-key"];

  //   if (!authId) {
  //     return res.status(401).json({
  //       message:
  //         "Du måste inkludera din Api nyckel i header för att göra en beställning",
  //     });
  //   }

  //   if (authId !== process.env.AUTH_ID) {
  //     return res.status(403).json({ message: "Felaktig API-Nyckel i header" });
  //   }

  try {
    // 1. Hämta alla produkter i varukorgen
    const cartItems = await findAsync({ authId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Varukorgen är tom" });
    }

    // 2. Skapa ett nytt orderobjekt
    const order = {
      items: cartItems,
      createdAt: new Date(),
    };

    // 3. Lägg till ordern i historiken
    await insertAsync(order);

    // 4. Töm varukorgen
    await removeAsync({ authId }, { multi: true });

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
