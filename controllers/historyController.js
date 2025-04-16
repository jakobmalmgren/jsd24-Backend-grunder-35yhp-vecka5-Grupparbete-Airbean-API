// HÄMTAR ORDERHISTORIK FRÅN EN ANVÄNDARE
import historyDb from "../models/historyModel.js";
// Hämtar nyckel från headers
// Finns ingen nyckel/ej matchar nyckel i env så nekas man tillgång
const getOrderHistory = (req, res) => {
  const authId = req.headers["x-api-key"];
  if (!authId || authId !== process.env.AUTH_ID) {
    return res.status(401).json({
      message: "Logga in för att se orderhistorik",
    });
  }

  /*   // Hämtar userId från url och söker i NeDB efter alla ordrar med samma userId
    const userId = req.params.userId */

  historyDb.find({}, (err, docs) => {
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
      total: totalSum
    });
  });
};

export { getOrderHistory };
