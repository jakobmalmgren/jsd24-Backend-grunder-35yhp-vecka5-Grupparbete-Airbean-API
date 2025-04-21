import historyDb from "../models/historyModel.js";

// HÄMTAR ORDERHISTORIK FRÅN EN ANVÄNDARE
const getOrderHistory = (req, res) => {
  const authKey = req.headers["x-api-key"];
  historyDb.find({ "items.authKey": authKey }, (err, docs) => {
    if (err) {
      return res.status(500).json({ message: "Kunde ej hämta orderhistorik" });
    }

    // DUBBELKOLLA OCH GÅ IGENOM
    // Här räknar vi ut totalsumman
    const totalSum = docs.reduce((sum, order) => {
      const orderSum = order.items.reduce((orderTotal, product) => {
        return orderTotal + product.price * product.quantity;
      }, 0);
      return sum + orderSum;
    }, 0);

    res.status(200).json({
      message: "Hämtning av oderhistorik lyckades",
      data: docs,
      total: totalSum,
    });
  });
};

export { getOrderHistory };
