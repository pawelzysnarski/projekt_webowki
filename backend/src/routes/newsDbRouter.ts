import { Router } from "express";
import prisma from "../prismaDb";

const newsDbRouter = Router();

newsDbRouter.get("/", async (req, res) => {
    try {
        const news = await prisma.wiadomo_ci.findMany({
            include: {
                akapity: {
                    orderBy: { ID: 'asc' }
                }
            },
            orderBy: { ID: 'desc' }
        });
        res.json(news);
    } catch (error) {
        res.status(500).json([]);
    }
});

export default newsDbRouter;
