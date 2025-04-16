import Datastore from "nedb";

// databasen för about info
const historyDb = new Datastore({
  filename: "./data/history.db",
  autoload: true,
});

export default historyDb;
