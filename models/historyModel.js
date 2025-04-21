import Datastore from "nedb";

// skapar history databas
const historyDb = new Datastore({
  filename: "./data/history.db",
  autoload: true,
});

export default historyDb;
