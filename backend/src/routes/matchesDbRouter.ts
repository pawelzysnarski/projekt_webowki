import express, { Router } from "express";
import prisma from "../prismaDb";

const matchesDbRouter = Router();
matchesDbRouter.use(express.json());
matchesDbRouter.get("/:round", async (req, res) => {
    const { round } = req.params;
    const roundNumber = parseInt(round);

    if (isNaN(roundNumber)) {
        return res.status(400).json({ error: "Podany parametr nie jest liczbą" });
    }

    try {
        const result = await prisma.terminarz.findMany({
            where: {
                Numer_Kolejki: roundNumber
            },
            include: {
                gospodarz: true,
                gosc: true,
                wynik: true
            },
            orderBy: {
                dataSpotkania: "asc"
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Błąd serwera" });
    }
});


export default matchesDbRouter;
