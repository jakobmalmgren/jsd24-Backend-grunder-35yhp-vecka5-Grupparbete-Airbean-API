import menuDb from "../models/menyModel.js";

// VALIDERAR SÅ MAN INTE KAN SKRIVA IN VAD SOM HELST NÄR MAN POSTAR EN BESTÄLLNING

export const validateProductAgainstMenu = async (req, res, next) => {
  const { id, price, title, desc } = req.body;

  try {
    const menuDoc = await new Promise((resolve, reject) => {
      menuDb.findOne({}, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });

    const menu = menuDoc?.menu || [];

    const productInMenu = menu.find((item) => item.id === Number(id));

    if (!productInMenu) {
      return res.status(400).json({
        message: ` Produkten med ID ${id} finns inte i menyn.`,
      });
    }

    if (productInMenu.price !== price) {
      return res.status(400).json({
        message: ` Felaktigt pris. Pris i meny: ${productInMenu.price}, pris skickat: ${price}`,
      });
    }

    if (productInMenu.title !== title) {
      return res.status(400).json({
        message: `Felaktig titel. Titel i meny: "${productInMenu.title}", titel skickad: "${title}"`,
      });
    }

    if (productInMenu.desc !== desc) {
      return res.status(400).json({
        message: `Felaktig beskrivning. Beskrivning i meny: "${productInMenu.desc}", skickad: "${desc}"`,
      });
    }

    //  Allt stämmer – gå vidare
    next();
  } catch (err) {
    console.error("Valideringsfel:", err);
    res
      .status(500)
      .json({ message: " Internt fel vid validering av produkt." });
  }
};
