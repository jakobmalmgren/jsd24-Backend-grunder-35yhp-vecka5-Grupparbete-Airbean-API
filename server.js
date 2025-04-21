import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import aboutRouter from "./routes/aboutRoute.js";
import menuRouter from "./routes/menuRoute.js";
import orderRoute from "./routes/orderRoute.js";
import historyRoute from "./routes/historyRoute.js";
import cartStatusRoute from "./routes/statusRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

//  skapar användare och logga in (POST)
app.use("/api/user", userRouter);

// hämtar aboutinfo (GET)
app.use("/api/about", aboutRouter);

//hämtar menyn och hämtar enskild produkt (GET)
app.use("/api/menu", menuRouter);

//-skapar order,-delete order, -hämtar varukorgen, -uppdatera varukorgen, (CRUD)
app.use("/api/cart", orderRoute);

//lägga beställning(köper, bekräfta beställning) (POST)
app.use("/api/status", cartStatusRoute);

//hämtar orderhistoriken (GET)
app.use("/api/history", historyRoute);

// fångar upp om ingen route hittas
app.use((req, res, next) => {
  res.status(404).json({ message: "Routen hittades inte" });
});

// Global error handler
//fångar upp övriga fel
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Serverfel" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`serven is running on http://localhost:${PORT}`);
});
