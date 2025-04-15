import Datastore from "nedb";
const orderDb = new Datastore({ filename: "./data/orders.db", autoload: true });
export default orderDb;
