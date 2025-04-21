import Datastore from "nedb";

// skapar about databas
const aboutDb = new Datastore({
  filename: "./data/about.db",
  autoload: true,
});

export default aboutDb;
