import userDb from "../models/userModel.js";

const createUser = (req, res) => {
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

const loginUser = (req, res) => {
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
      { $set: { isLoggedIn: true } }, // sätt inloggad = true
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
