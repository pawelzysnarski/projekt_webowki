import express, { Router, Request, Response } from 'express';
import PrismaDb from "../prismaDb";
import {generateAcademyRegisterHtml, sendAcademyRegisterEmail} from "../emailService";
import type {RegisterBody} from '../types/RegisterBody';

const AcademyRegisterDbRouter = Router();
const prisma = PrismaDb;

AcademyRegisterDbRouter.use(express.json());

AcademyRegisterDbRouter.post('/', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { ID_Punktu, Imie, Nazwisko, Wiek, Email } = req.body;

    if (!ID_Punktu || !Imie || !Nazwisko || !Wiek || !Email) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }

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

        const html = generateAcademyRegisterHtml({
            imie: Imie,
            nazwisko: Nazwisko,
            email: Email,
            wiek: Number(Wiek),
            wiadomosc: ""
        });

        await sendAcademyRegisterEmail(Email, 'Potwierdzenie zgłoszenia do Akademii Chaber', html);

        res.status(201).json({ success: true, data: nowyZapis });
    } catch (error) {
        res.status(500).json({ error: "Błąd bazy danych" });
    }
});

export default AcademyRegisterDbRouter;
