import express from "express";
import type { Request, Response } from "express";
import tableDbRouter from "./routes/tableDbRouter.ts";
import shopDbRouter from "./routes/shopDbRouter.ts";
const app = express();
const port =3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/table", tableDbRouter);
app.use("/api/shop", shopDbRouter);
app.listen(port, () => {
    console.log("Listening on port", port);
})
