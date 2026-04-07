import express, {Router} from "express";
import prisma from "../prismaDb.ts";
const tableDbRouter = Router();
tableDbRouter.use(express.json());
tableDbRouter.get("/", async (req, res) => {
    const result = await prisma.tabela.findMany();
    res.json(result);
})
export default tableDbRouter;