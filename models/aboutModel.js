import Datastore from "nedb";

// databasen för about info
const aboutDb = new Datastore({
    filename: "./data/about.db",
    autoload: true,
})

export default aboutDb;