import express, {Router} from "express";
import prisma from "../prismaDb";
const playersDbRouter = Router();
playersDbRouter.use(express.json());
playersDbRouter.get("/", async (req, res) => {
    const result = await prisma.druzyna.findMany({
        orderBy: {
            Numer: "asc",
        },
    });
    res.json(result);
})
export default playersDbRouter;