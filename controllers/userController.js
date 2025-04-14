// usercontroller.

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

export { createUser };
