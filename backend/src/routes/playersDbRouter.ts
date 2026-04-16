import express, {Router} from "express";
import prisma from "../prismaDb.ts";
const playersDbRouter = Router();
playersDbRouter.use(express.json());
playersDbRouter.get("/", async (req, res) => {
    const result = await prisma.dru_yna.findMany({
        orderBy: {
            Numer: "asc",
        },
    });
    res.json(result);
})
export default playersDbRouter;