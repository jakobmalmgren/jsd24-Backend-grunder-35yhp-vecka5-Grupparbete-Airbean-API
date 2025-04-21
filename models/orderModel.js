import Datastore from "nedb";
// skapar orders databas
const orderDb = new Datastore({ filename: "./data/orders.db", autoload: true });
export default orderDb;
