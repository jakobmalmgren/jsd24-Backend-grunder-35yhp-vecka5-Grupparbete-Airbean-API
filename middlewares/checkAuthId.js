import userDb from "../models/userModel.js";

// KOLLAR OM MAN ÄR AUTHENTIFISERAD OCH INLOGGAD

const checkAuthorization = (req, res, next) => {
  const authId = req.headers["x-api-key"];
  console.log("Mottagen authId:", authId);
  if (!authId) {
    return res.status(401).json({
      message: "Ingen authId i header",
    });
  }

  // Kolla om användaren med detta authId finns i userDb
  userDb.findOne({ _id: authId }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Serverfel vid auth-kontroll" });
    }

    if (!user) {
      return res
        .status(403)
        .json({ message: "Ogiltigt authId – användare hittas ej" });
    }

    // Extra säkerhetskoll: är användaren inloggad?
    if (!user.isLoggedIn) {
      return res
        .status(401)
        .json({ message: "Du är inte inloggad – logga in först!" });
    }

    // Lägg till user i req för att kunna använda i routes
    req.user = user;
    next();
  });
};

export { checkAuthorization };
