import express, {Request,Response} from "express";
import tableDbRouter from "./routes/tableDbRouter";
const app = express();
const port =8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/table", tableDbRouter);
app.listen(port, () => {
    console.log("Listening on port", port);
})
