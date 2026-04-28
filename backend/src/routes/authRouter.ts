import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaDb';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'chaber-secret-key-2026';

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { imie, nazwisko, email, haslo } = req.body;

        if (!imie || !nazwisko || !email || !haslo) {
            return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
        }

        const existing = await prisma.uzytkownik.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'Użytkownik z tym emailem już istnieje' });
        }

        const hashedPassword = await bcrypt.hash(haslo, 10);

        const user = await prisma.uzytkownik.create({
            data: {
                imie,
                nazwisko,
                email,
                haslo: hashedPassword
            }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                imie: user.imie,
                nazwisko: user.nazwisko,
                email: user.email,
                karnet: null
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Błąd rejestracji' });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, haslo } = req.body;

        if (!email || !haslo) {
            return res.status(400).json({ error: 'Email i hasło są wymagane' });
        }

        const user = await prisma.uzytkownik.findUnique({
            where: { email },
            include: { karnet: true }
        });

        if (!user) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        }

        const isValid = await bcrypt.compare(haslo, user.haslo);
        if (!isValid) {
            return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                imie: user.imie,
                nazwisko: user.nazwisko,
                email: user.email,
                karnet: user.karnet ? {
                    typ: user.karnet.typ_karnetu,
                    znizka: user.karnet.typ_karnetu === 'zloty_jelen' ? 30 :
                        user.karnet.typ_karnetu === 'srebrny_jez' ? 20 : 10
                } : null
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Błąd logowania' });
    }
});

router.get('/me', async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Brak tokenu' });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
        const user = await prisma.uzytkownik.findUnique({
            where: { id: decoded.id },
            include: { karnet: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
        }

        res.json({
            user: {
                id: user.id,
                imie: user.imie,
                nazwisko: user.nazwisko,
                email: user.email,
                karnet: user.karnet ? {
                    typ: user.karnet.typ_karnetu,
                    znizka: user.karnet.typ_karnetu === 'zloty_jelen' ? 30 :
                        user.karnet.typ_karnetu === 'srebrny_jez' ? 20 : 10
                } : null
            }
        });
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
});

export default router;