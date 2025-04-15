import Datastore from "nedb"

const cartStatusDb = new Datastore({
    filename: "./data/cartStatus.db",
    autoload: true,
})

export default cartStatusDb