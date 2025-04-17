import orderDb from "../models//orderModel.js";
import userDb from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// SKAPAR ORDER MED POST
const createOrder = (req, res) => {
  const { id, title, price, desc, quantity } = req.body;
    const authKey = req.user._id

  const newOrder = {
    id,
    title,
    price,
    desc,
    authKey,
    // authId,
    // behövs authid om vi ska ändra allt??
    quantity,
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

const getMyOrder = (req, res) => {
  orderDb.find({}, (err, doc) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "de gick inte att hitta varukorgen", error: err });
    }
    if (!doc || doc.length === 0) {
      return res
        .status(500)
        .json({ message: "de finns ingen varukorg med de ID:t", error: err });
    }

    // Här räknar vi ut totalsumman
    const totalSum = doc.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    res.status(200).json({
      message: "varukorgen hämtades successfully",
      total: totalSum,
      data: doc,
    });
  });
};

//UPPDATERAR MIN VARUKORG
const updateorder = (req, res) => {
  //lägga in id som genereras individuellt! ex "_id":"GGhbV0SamR6pgEgX"
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
