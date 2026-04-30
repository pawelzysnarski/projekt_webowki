import { Router, Request, Response } from 'express';
import { sendTicketEmail, generateContactEmailHtml } from '../emailService';

const router = Router();

router.post('/send', async (req: Request, res: Response) => {
    try {
        const { imie, nazwisko, email, temat, wiadomosc } = req.body;

        if (!imie || !nazwisko || !email || !temat || !wiadomosc) {
            return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
        }

        const html = generateContactEmailHtml({ imie, nazwisko, email, temat, wiadomosc });
        await sendTicketEmail('kontakt@chaber.pobiedziska.pl', `Kontakt: ${temat}`, html);

        res.json({ success: true, message: 'Wiadomość wysłana' });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ error: 'Błąd wysyłania wiadomości' });
    }
});

export default router;