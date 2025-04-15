import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

import menuRouter from "./routes/menuRoute.js"

import orderRoute from "./routes/orderRoute.js";


dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/menu", menuRouter);

app.use("/api/cart", orderRoute);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`serven is running on http://localhost:${PORT}`);
});
