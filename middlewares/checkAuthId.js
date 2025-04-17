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
