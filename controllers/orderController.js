import orderDb from "../models//orderModel.js";
import dotenv from "dotenv";
dotenv.config();
//skapar order till sin varukorg
// framöver skapa en middleware som kollar
// om req.body innehåller rätt input
// som finns från menyn attt välja från
// använda både headers och body ..kollar me om de finns

// skapa middleware på den me som e här nu nedanför?

// SKAPAR ORDER MED POST
const createOrder = (req, res) => {
  // authId så används de universala Id:t som kommer från skapandet av användaren
  const authId = req.headers["x-api-key"];
  if (!authId) {
    return res.status(401).json({
      message: "du måste authorizera dig i headern med API nyckel!",
    });
  }
  if (authId !== process.env.AUTH_ID) {
    // console.log("du är athorizerad och inloggad");
    return res.status(403).json({ message: "Felaktig API-nyckel i headern" });
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

//DELETE ORDER MED DELETE
const deleteOrder = (req, res) => {
  const authId = req.headers["x-api-key"];
  if (!authId) {
    return res.status(401).json({
      message: "du måste authorizera dig i headern med API nyckel!",
    });
  }
  if (authId !== process.env.AUTH_ID) {
    // console.log("du är athorizerad och inloggad");
    return res.status(403).json({ message: "Felaktig API-nyckel i headern" });
  }
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({
      message: "inget _id skickat in, vilket krävs!",
    });
  }

  if (!req.body) {
    return res.status(400).json({
      message: "bodyn är tom",
    });
  }
  orderDb.remove({ _id: id }, (err, numberOfDocs) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "de gick inte att radera produkten", error: err });
    }
    if (numberOfDocs === 0) {
      return res.status(404).json({
        message: "produkten hittades inte!",
      });
    }
    return res.status(200).json({
      message: `produkten med ID: ${id} raderat!`,
      numberOfDocuments: numberOfDocs,
    });
  });
};
//HÄMTAR MIN VARUKORG MED GET

//kolla de!!
const getMyOrder = (req, res) => {
  const authId = req.headers["x-api-key"];
  if (!authId) {
    return res.status(401).json({
      message: "du måste authorizera dig i headern med API nyckel!",
    });
  }
  if (authId !== process.env.AUTH_ID) {
    // console.log("du är athorizerad och inloggad");
    return res.status(403).json({ message: "Felaktig API-nyckel i headern" });
  }

  if (!req.body) {
    return res.status(400).json({
      message: "bodyn är tom",
    });
  }

  orderDb.find({ authId: authId }, (err, doc) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "de gick inte att hitta varukorgen", error: err });
    }
    if (!doc || doc.length === 0) {
      return res
        .status(500)
        .json({ message: "de finns ingen meny med de ID:t", error: err });
    }
    res
      .status(200)
      .json({ message: "varukorgen hämtades successfully", data: doc });
  });
};
//UPPDATERAR MIN VARUKORG
const updateorder = (req, res) => {
  const authId = req.headers["x-api-key"];
  if (!authId) {
    return res.status(401).json({
      message: "du måste authorizera dig i headern med API nyckel!",
    });
  }
  if (authId !== process.env.AUTH_ID) {
    // console.log("du är athorizerad och inloggad");
    return res.status(403).json({ message: "Felaktig API-nyckel i headern" });
  }

  // här blir det de indivuduella ID:t ex: "_id":"GGhbV0SamR6pgEgX"
  const updatedItemID = req.body.id;
  const newQuantity = req.body.quantity;
  if (!updatedItemID || !newQuantity) {
    return res
      .status(400)
      .json({ message: "både id & quantity måste finnas med!" });
  }
  orderDb.update(
    { _id: updatedItemID },
    { $set: { quantity: newQuantity } },
    (err, numberOfItemsUpdated) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "gick inte att uppdatera produkten!" });
      }
      if (!numberOfItemsUpdated) {
        return res.status(404).json({ message: "produkten hittas inte" });
      }
      return res.status(200).json({
        message: `uppdateringen gick bra ID nummber: ${updatedItemID} uppdaterades!`,
        numberOfItemsUpdated: numberOfItemsUpdated,
      });
    }
  );
};

export { createOrder, deleteOrder, getMyOrder, updateorder };

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
