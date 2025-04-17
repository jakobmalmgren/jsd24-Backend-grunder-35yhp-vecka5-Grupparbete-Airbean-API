import aboutDb from "../models/aboutModel.js";

// hämtar all about info med db find.
const getAboutInfo = (req, res) => {
  aboutDb.findOne({}, (err, aboutInfo) => {
    // find One letar efter första objektet i databasem , vilket är about.db
    if (err) {
      return res.status(500).json({ error: err }); // hittar vi inte objektet får vi ett error, 500
    }
    res.status(200).json({
      message: "about-info hittad", // annars returnerar vi about infon från about.db
      data: aboutInfo,
    });
  });
};

export { getAboutInfo };
