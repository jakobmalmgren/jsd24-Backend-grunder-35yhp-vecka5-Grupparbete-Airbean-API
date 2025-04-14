import Datastore from "nedb";
const userDb = new Datastore({ filename: "./data/user.db", autoload: true });
export default userDb;
