import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import aboutRouter from "./routes/aboutRoute.js";

import menuRouter from "./routes/menuRoute.js"

import orderRoute from "./routes/orderRoute.js";

import cartStatusRoute from "./routes/statusRoute.js"


dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/about", aboutRouter);

app.use("/api/menu", menuRouter);

app.use("/api/cart", orderRoute);

app.use("/api/status", cartStatusRoute)


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`serven is running on http://localhost:${PORT}`);
});
