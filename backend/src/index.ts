import express from "express";
import tableDbRouter from "./routes/tableDbRouter";
import shopDbRouter from "./routes/shopDbRouter";
import playersDbRouter from "./routes/playersDbRouter";
import matchesDbRouter from "./routes/matchesDbRouter";
import staffDbRouter from "./routes/staffDbRouter";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/table", tableDbRouter);
app.use("/api/shop", shopDbRouter);
app.use("/api/players", playersDbRouter);
app.use("/api/matches", matchesDbRouter);
app.use("/api/staff", staffDbRouter);

app.listen(port, () => {
    console.log("Listening on port", port);
});