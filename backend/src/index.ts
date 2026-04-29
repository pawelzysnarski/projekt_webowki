import express from "express";
import tableDbRouter from "./routes/tableDbRouter";
import shopDbRouter from "./routes/shopDbRouter";
import playersDbRouter from "./routes/playersDbRouter";
import matchesDbRouter from "./routes/matchesDbRouter";
import staffDbRouter from "./routes/staffDbRouter";
import ticketsRouter from "./routes/ticketsRouter";

import newsDbRouter from "./routes/newsDbRouter.ts";
import scoutDbRouter from "./routes/scoutDbRouter.ts";
import AcademyRegisterDbRouter from "./routes/academyRegisterDbRouter.ts";
import orderRouter from './routes/orderRouter.js';
import authRouter from "./routes/authRouter";
import contactRouter from "./routes/contactRouter";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/table", tableDbRouter);
app.use("/api/shop", shopDbRouter);
app.use("/api/players", playersDbRouter);
app.use('/api/orders', orderRouter);
app.use("/api/matches", matchesDbRouter);
app.use("/api/staff", staffDbRouter);
app.use("/api/tickets",ticketsRouter);
app.use("/api/auth", authRouter);
app.use("/api/news",newsDbRouter);
app.use("/api/scout",scoutDbRouter);
app.use("/api/academyRegister",AcademyRegisterDbRouter);
app.use("/api/contact", contactRouter);


app.listen(port, () => {
    console.log("Listening on port", port);
});