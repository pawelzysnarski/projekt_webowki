import express, {Router} from "express";
import prisma from "../prismaDb";
const scoutDbRouter = Router();
scoutDbRouter.use(express.json());
scoutDbRouter.get("/", async (req, res)=>{
    const result = await prisma.punkty_scoutingowe.findMany({
        include:{
            zapis:true,
        },
    });
    res.json(result);
});
export default scoutDbRouter;