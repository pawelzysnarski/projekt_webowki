import express, {Router} from "express";
import prisma from "../prismaDb";
const shopDbRouter = Router();
shopDbRouter.use(express.json());
shopDbRouter.get("/", async (req, res)=>{
    const result = await prisma.produkty.findMany();
    res.json(result);
});
shopDbRouter.get("/:id", async (req, res)=>{
    const id = parseInt(req.params.id);
    const result = await prisma.produkty.findUnique({
        where: { id }
    });
    res.json(result);
});
export default shopDbRouter;