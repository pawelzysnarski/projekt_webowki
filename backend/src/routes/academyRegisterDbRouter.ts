import express, { Router, Request, Response } from 'express';
import PrismaDb from "../prismaDb.ts";

const AcademyRegisterDbRouter = Router();
const prisma = PrismaDb;

interface RegisterBody {
    ID_Punktu: number;
    Imie: string;
    Nazwisko: string;
    Wiek: number;
    Email: string;
}
AcademyRegisterDbRouter.use(express.json());
AcademyRegisterDbRouter.post('/', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { ID_Punktu, Imie, Nazwisko, Wiek, Email } = req.body;

    try {
        const nowyZapis = await prisma.zapis.create({
            data: {
                ID_Punktu: Number(ID_Punktu),
                Imie: Imie,
                Nazwisko: Nazwisko,
                Wiek: Number(Wiek),
                Email: Email
            }
        });
        res.status(201).json(nowyZapis);
    } catch (error) {
        res.status(500).json({ error: "Błąd bazy danych" });
    }
});

export default AcademyRegisterDbRouter;
