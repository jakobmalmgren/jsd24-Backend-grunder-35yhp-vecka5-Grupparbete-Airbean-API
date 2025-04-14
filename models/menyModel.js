import Datastore from "nedb";
const menuDb = new Datastore({ filename: "./data/menu.db", autoload: true });
export default menuDb;
