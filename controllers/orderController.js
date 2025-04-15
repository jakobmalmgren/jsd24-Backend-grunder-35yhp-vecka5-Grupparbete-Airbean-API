import orderDb from "../models//orderModel.js";
import dotenv from "dotenv";
dotenv.config();
//skapar order till sin varukorg
// framöver skapa en middleware som kollar
// om req.body innehåller rätt input
// som finns från menyn attt välja från
// använda både headers och body ..kollar me om de finns

// skapa middleware på den me som e här nu nedanför?
const createOrder = (req, res) => {
  const authId = req.headers["x-api-key"];
  if (!authId) {
    return res.status(401).json({
      message: "du måste authorizera dig i headern med API nyckel!",
    });
  }
  if (authId !== process.env.AUTH_ID) {
    // console.log("du är athorizerad och inloggad");
    res.status(403).json({ message: "Felaktig API-nyckel i headern" });
  }

  // i req.body måste hela tiden de ID vi får från skapa anvädnare va me!!!!
  const { id, title, price, desc, quantity } = req.body;
  if (!id || !title || !price || !desc || !quantity) {
    return res.status(400).json({
      message: "du måste inkludera: id, title, price, desc, quantity i bodyn ",
    });
  }

  const newOrder = {
    id,
    title,
    price,
    desc,
    authId,
    quantity,
    createdAt: new Date(),
  };

  orderDb.insert(newOrder, (err, newDoc) => {
    if (err) {
      return res.status(500).json({
        message:
          "det uppstod ett problem när du försökte lägga till nåt i varukorgen",
      });
    }
    return res.status(201).json({
      message: "du lyckades lägga till nåt i varukorgen",
      data: newDoc,
    });
  });
};

export { createOrder };

// i orders.db databasen-
///*skapas de en userID i varje obj så tar ja db.find o id:t så kommer
//båda objekten komma

//OBS! API/MENU/ORDER-  DEN JA HÅLLER PÅ ME
// SKA DE INTE FINNAS PUT ELLER PATCH ME HÄR?
// denna ska nog heta:

// /api/cart  så ska hela crud finnas här.så de ja håller på me PLUS
//api/cart som finns i trellon

// sen när man hämtar när den e betald för se ordarna:
// bör de typ bli:
// /api/summary el nåt....
