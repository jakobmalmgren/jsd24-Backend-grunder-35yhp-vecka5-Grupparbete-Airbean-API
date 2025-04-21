import userDb from "../models/userModel.js";

//SKAPAR EN ANVÄNDARE
// måste sätta in:
//username & password i bodyn

const createUser = (req, res) => {
  //username & password i bodyn annars kommer valideringsfel uppstå
  const newUser = req.body;
  userDb.insert(newUser, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({
      message: "ny användare skapad",
      data: newDoc,
    });
  });
};

// när en användare är skapar får vi i ett personligt id.
// de id:t ska vi sedan använda för att använda oss av i headern:
//x-api-key och värdet: det personnliga id:t.
// måste ha med denna authenfikationen överallt förutom när man kan
// hämta hela menyn & aboutsidan.

//LOGGAR IN
const loginUser = (req, res) => {
  //username och password ska in i body
  const { username, password } = req.body;

  //  Kolla om användaren finns med rätt lösenord
  userDb.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Serverfel", error: err });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    // Användaren hittad → uppdatera isLoggedIn
    userDb.update(
      { _id: user._id }, // sök på användarens ID
      { $set: { isLoggedIn: true } },
      {},
      (updateErr, numUpdated) => {
        if (updateErr) {
          return res.status(500).json({
            message: "Kunde inte uppdatera användare",
            error: updateErr,
          });
        }

        res.json({
          message: "Inloggad!",
          user: { username: user.username, isLoggedIn: true },
        });
      }
    );
  });
};

export { createUser, loginUser };
