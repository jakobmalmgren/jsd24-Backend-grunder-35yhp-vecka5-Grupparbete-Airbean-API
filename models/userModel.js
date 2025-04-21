import Datastore from "nedb";
// skapar users databas
const userDb = new Datastore({ filename: "./data/user.db", autoload: true });
export default userDb;
