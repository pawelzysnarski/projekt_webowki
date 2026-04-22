import express from "express";
import type { Request, Response } from "express";
import tableDbRouter from "./routes/tableDbRouter.ts";
import shopDbRouter from "./routes/shopDbRouter.ts";
import playersDbRouter from "./routes/playersDbRouter.ts";
import orderRouter from './routes/orderRouter.js';
const app = express();
const port =3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/table", tableDbRouter);
app.use("/api/shop", shopDbRouter);
app.use("/api/players", playersDbRouter);
app.use('/api/orders', orderRouter);
app.listen(port, () => {
    console.log("Listening on port", port);
})