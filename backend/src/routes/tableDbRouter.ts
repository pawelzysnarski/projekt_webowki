import express, {Router} from "express";
import prisma from "../prismaDb";
const tableDbRouter = Router();
tableDbRouter.use(express.json());
tableDbRouter.get("/", async (req, res) => {
    try {
        const teraz = new Date();
        const mecz = await prisma.terminarz.findFirst({
            where: {
                wynik: null,
                dataSpotkania: { lt: new Date(teraz.getTime() - 2 * 60 * 60 * 1000) }
            },
            include: { gospodarz: true, gosc: true }
        });

        if (mecz) {
            const bGosp = Math.floor(Math.random() * (mecz.gospodarz.sila / 20) + Math.random() * 2);
            const bGosc = Math.floor(Math.random() * (mecz.gosc.sila / 20) + Math.random() * 2);

            await prisma.wyniki.create({
                data: { idMeczu: mecz.id, bramkiGospodarzy: bGosp, bramkiGosci: bGosc }
            });

            await prisma.tabela.update({
                where: { idKlubu: mecz.idGospodarza },
                data: {
                    mecze: { increment: 1 },
                    zwyciestwa: { increment: bGosp > bGosc ? 1 : 0 },
                    remisy: { increment: bGosp === bGosc ? 1 : 0 },
                    porazki: { increment: bGosp < bGosc ? 1 : 0 },
                    goleZdobyte: { increment: bGosp },
                    goleStracone: { increment: bGosc },
                    bilansBramek: { increment: bGosp - bGosc },
                    punkty: { increment: bGosp > bGosc ? 3 : (bGosp === bGosc ? 1 : 0) }
                }
            });

            await prisma.tabela.update({
                where: { idKlubu: mecz.idGoscia },
                data: {
                    mecze: { increment: 1 },
                    zwyciestwa: { increment: bGosc > bGosp ? 1 : 0 },
                    remisy: { increment: bGosc === bGosp ? 1 : 0 },
                    porazki: { increment: bGosc < bGosp ? 1 : 0 },
                    goleZdobyte: { increment: bGosc },
                    goleStracone: { increment: bGosp },
                    bilansBramek: { increment: bGosc - bGosp },
                    punkty: { increment: bGosc > bGosp ? 3 : (bGosc === bGosp ? 1 : 0) }
                }
            });
        }

        const result = await prisma.tabela.findMany({
            include: { klub: true }
        });
        res.json(result);
    } catch (e) {
        res.status(500).json([]);
    }
});
export default tableDbRouter;