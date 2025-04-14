import aboutDb from "../models/aboutModel.js";

// kommenterat ut , används bara för att skicka in about infon i databasen.
 // sparar about info i databasen med db insert
/* const createAboutInfo = (req,res) => {
    const aboutInfo = req.body

    aboutDb.insert(aboutInfo, (err, savedAboutInfo) => {
        if (err) {
            return res.status(500).json({ error: err})
        }
        res.status(201).json({
            message: "about-info sparad",
            data: savedAboutInfo
    })
})
} */
 // hämtar all about info med db find.
const getAboutInfo = (req, res) => {
    aboutDb.findOne({}, (err, aboutInfo) => {  // find One letar efter första objektet i databasem , vilket är about.db
        if (err) {
            return res.status(500).json({ error: err }) // hittar vi inte objektet får vi ett error, 500
        }
        res.status(200).json({
            message: "about-info hittad", // annars returnerar vi about infon från about.db
            data: aboutInfo
        })
    })
}

export { getAboutInfo };