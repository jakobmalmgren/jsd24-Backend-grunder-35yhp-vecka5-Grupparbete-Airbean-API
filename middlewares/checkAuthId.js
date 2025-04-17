import userDb from "../models/userModel.js";

// const checkAuthId = (req, res, next) => {
//   const authId = req.headers["x-api-key"];
//   //här...skapar en anv...sparas i en userdb.
//   //kollar om de man skickar in o bodyn-
//   //användarnamn o password stämmer överens me
//   // de som finns i userdb
//   //göra en proprties o lägg till isloggedn:true
//   //if logged in =true...då ska man göra allt som yp besälla etc..
//   if (!authId || authId !== process.env.AUTH_ID) {
//     return res.status(401).json({
//       message: "Logga in för att se orderhistorik",
//     });
//   }
//   req.authId = authId;
//   next();
// };
// export { checkAuthId };

/* 
const checkAuthorization = (req,res,next) => () {
    const authKey = req.headers["x-api-key"]

     */


/* onst checkAuthorization = (req, res, next) => {
  const authId = req.headers["x-api-key"]; // eller "authorization" om du hellre vill
  console.log("🔐 Mottagen authId:", authId);
  if (!authId) {
    return res.status(401).json({
      message: "Ingen authId i header – logga in först!",
    });
  }

  // Kolla om användaren med detta authId finns i userDb
  userDb.findOne({ _id: authId }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Serverfel vid auth-kontroll" });
    }

    if (!user) {
      return res.status(403).json({ message: "Ogiltigt authId – användare hittas ej" });
    }

    // Extra säkerhetskoll: är användaren inloggad?
    if (!user.isLoggedIn) {
      return res.status(401).json({ message: "Du är inte inloggad – logga in först!" });
    }

    // Lägg till user i req för att kunna använda i routes
    req.user = user;
    next();
  });
}; */

const checkAuthorization = (req, res, next) => {
    console.log("✅ Middleware körs!");
    next();
  };
  
  export { checkAuthorization };


