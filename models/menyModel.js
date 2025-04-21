import Datastore from "nedb";
// skapar menu databas
const menuDb = new Datastore({ filename: "./data/menu.db", autoload: true });
export default menuDb;
