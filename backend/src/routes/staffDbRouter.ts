import express, {Router} from "express";
import prisma from "../prismaDb.ts";
const staffDbRouter = Router();
staffDbRouter.use(express.json());
staffDbRouter.get("/", async (req, res) => {
    const result = await prisma.personel.findMany();
    res.json(result);
})
export default staffDbRouter;