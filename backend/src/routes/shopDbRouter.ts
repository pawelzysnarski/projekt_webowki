import express, {Router} from "express";
import prisma from "../prismaDb.ts";
const shopDbRouter = Router();
shopDbRouter.use(express.json());
shopDbRouter.get("/", async (req, res) => {
    const result = await prisma.produkty.findMany();
    res.json(result);
});
export default shopDbRouter;