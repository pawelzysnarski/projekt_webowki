import { Router, Request, Response } from 'express';
import prisma from "../prismaDb"
import { sendTicketEmail, generateTicketEmailHtml, generateSeasonTicketEmailHtml } from '../emailService';

const router = Router();

router.get('/matches/upcoming', async (req: Request, res: Response) => {
    try {
        const matches = await prisma.mecz.findMany({
            where: {
                data_meczu: {
                    gte: new Date()
                }
            },
            orderBy: {
                data_meczu: 'asc'
            },
            take: 2
        });

        const matchesWithInfo = matches.map((match: { czy_domowy: any; stadion: any; miasto: any; }) => ({
            ...match,
            match_type: match.czy_domowy ? 'home' : 'away',
            location: match.czy_domowy
                ? 'Stadion Chabera Pobiedziska'
                : `${match.stadion || 'Opponent stadium'}, ${match.miasto || 'Unknown city'}`
        }));

        res.json(matchesWithInfo);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Error fetching matches' });
    }
});

router.get('/matches/:id', async (req: Request, res: Response) => {
    try {
        const matchId = parseInt(<string>req.params.id);

        const match = await prisma.mecz.findUnique({
            where: { id: matchId },
            include: {
                miejsca: {
                    orderBy: [
                        { sektor: 'asc' },
                        { rzad: 'asc' },
                        { numer: 'asc' }
                    ]
                }
            }
        });

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        res.json({
            ...match,
            match_type: match.czy_domowy ? 'home' : 'away',
            available_ticket_types: match.czy_domowy
                ? ['brazowy_los', 'srebrny_jez', 'zloty_jelen']
                : ['normalny']
        });
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({ error: 'Error fetching match' });
    }
});

router.get('/matches/:id/seats', async (req: Request, res: Response) => {
    try {
        const { sector, row } = req.query;
        const matchId = parseInt(<string>req.params.id);

        const match = await prisma.mecz.findUnique({
            where: { id: matchId }
        });

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        const where: any = { id_meczu: matchId };
        if (sector) where.sektor = sector;
        if (row) where.rzad = row;

        const seats = await prisma.miejsce.findMany({
            where,
            orderBy: [
                { sektor: 'asc' },
                { rzad: 'asc' },
                { numer: 'asc' }
            ]
        });

        res.json({
            is_home: match.czy_domowy,
            seats: seats,
            info: match.czy_domowy
                ? 'Choose sector and seat in the stadium'
                : 'Away match - only away sector seats available'
        });
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ error: 'Error fetching seats' });
    }
});

router.get('/matches/:matchId/seats/:seatId/check', async (req: Request, res: Response) => {
    try {
        const matchId = parseInt(<string>req.params.matchId);
        const seatId = parseInt(<string>req.params.seatId);

        const seat = await prisma.miejsce.findFirst({
            where: {
                id: seatId,
                id_meczu: matchId,
                czy_zajete: false
            }
        });

        res.json({ available: !!seat, seat: seat || null });
    } catch (error) {
        console.error('Error checking seat:', error);
        res.status(500).json({ error: 'Error checking seat' });
    }
});

router.post('/tickets/buy', async (req: Request, res: Response) => {
    try {
        const { matchId, seatId, firstName, lastName, email, ticketType } = req.body;

        if (!matchId || !seatId || !firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing data' });
        }

        const match = await prisma.mecz.findUnique({
            where: { id: parseInt(matchId) }
        });

        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }

        const finalTicketType = match.czy_domowy ? (ticketType || 'brazowy_los') : 'normalny';

        const seat = await prisma.miejsce.findFirst({
            where: {
                id: parseInt(seatId),
                id_meczu: parseInt(matchId),
                czy_zajete: false
            }
        });

        if (!seat) {
            return res.status(400).json({ error: 'Seat is already taken or does not exist' });
        }

        const ticketCode = `CHABER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const result = await prisma.$transaction([
            prisma.bilet.create({
                data: {
                    id_meczu: parseInt(matchId),
                    id_miejsca: seat.id,
                    imie: firstName,
                    nazwisko: lastName,
                    email: email,
                    cena: seat.cena,
                    typ_biletu: finalTicketType,
                    kod_biletu: ticketCode,
                    czy_oplacony: false
                }
            }),
            prisma.miejsce.update({
                where: { id: seat.id },
                data: { czy_zajete: true }
            })
        ]);

        const matchInfo = `${match.czy_domowy ? 'Chaber' : match.przeciwnik} vs ${match.czy_domowy ? match.przeciwnik : 'Chaber'} - ${new Date(match.data_meczu).toLocaleDateString('pl-PL')}`;

        const emailHtml = generateTicketEmailHtml({
            firstName,
            lastName,
            matchInfo,
            ticketType: finalTicketType === 'brazowy_los' ? 'Brązowy Łoś' :
                finalTicketType === 'srebrny_jez' ? 'Srebrny Jeż' :
                    finalTicketType === 'zloty_jelen' ? 'Złoty Jeleń' : 'Bilet normalny',
            sector: seat.sektor,
            seat: seat.numer.toString(),
            row: seat.rzad,
            price: Number(seat.cena).toFixed(2),
            ticketCode,
            isHome: match.czy_domowy
        });

        await sendTicketEmail(email, 'Twój bilet na mecz Chaber Pobiedziska', emailHtml);

        res.json({
            success: true,
            ticket: result[0],
            message: 'Bilet został zakupiony!'
        });
    } catch (error) {
        console.error('Error buying ticket:', error);
        res.status(500).json({ error: 'Error buying ticket' });
    }
});

router.get('/tickets/user/:email', async (req: Request, res: Response) => {
    try {
        const tickets = await prisma.bilet.findMany({
            where: { email: <string>req.params.email },
            include: { mecz: true, miejsce: true },
            orderBy: { data_zakupu: 'desc' }
        });
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Error fetching tickets' });
    }
});

router.post('/tickets/:id/cancel', async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(<string>req.params.id);

        const ticket = await prisma.bilet.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await prisma.$transaction([
            prisma.bilet.delete({ where: { id: ticketId } }),
            prisma.miejsce.update({
                where: { id: ticket.id_miejsca },
                data: { czy_zajete: false }
            })
        ]);

        res.json({ success: true, message: 'Ticket cancelled, seat has been released' });
    } catch (error) {
        console.error('Error cancelling ticket:', error);
        res.status(500).json({ error: 'Error cancelling ticket' });
    }
});

router.post('/season-ticket/buy', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, ticketType, price, userId } = req.body;

        if (!firstName || !lastName || !email || !ticketType || !price) {
            return res.status(400).json({ error: 'Missing data' });
        }

        const passCode = `KARNET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const season = '2026';

        const ticketTypeMap: Record<string, string> = {
            'basic': 'brazowy_los',
            'standard': 'srebrny_jez',
            'premium': 'zloty_jelen'
        };

        const mappedType = ticketTypeMap[ticketType] || 'brazowy_los';
        const sectorMap: Record<string, string[]> = {
            'brazowy_los': ['A1', 'A2', 'A3', 'A4', 'C1', 'C2', 'C3', 'C4'],
            'srebrny_jez': ['B1', 'B2'],
            'zloty_jelen': ['D1', 'D2']
        };

        const sectors = sectorMap[mappedType] || ['A1'];

        const seasonTicket = await prisma.karnet.create({
            data: {
                imie: firstName,
                nazwisko: lastName,
                email: email,
                typ_karnetu: mappedType,
                cena: parseFloat(price),
                sezon: season,
                kod_karnetu: passCode,
                czy_oplacony: false
            }
        });

        if (userId) {
            await prisma.uzytkownik.update({
                where: { id: parseInt(userId) },
                data: { karnet_id: seasonTicket.id }
            });
        }

        const futureHomeMatches = await prisma.mecz.findMany({
            where: {
                czy_domowy: true,
                data_meczu: {
                    gte: new Date()
                }
            }
        });

        const occupiedSeats: any[] = [];

        for (const match of futureHomeMatches) {
            const freeSeat = await prisma.miejsce.findFirst({
                where: {
                    id_meczu: match.id,
                    sektor: { in: sectors },
                    czy_zajete: false
                },
                orderBy: [
                    { sektor: 'asc' },
                    { rzad: 'asc' },
                    { numer: 'asc' }
                ]
            });

            if (freeSeat) {
                await prisma.miejsce.update({
                    where: { id: freeSeat.id },
                    data: { czy_zajete: true }
                });

                occupiedSeats.push({
                    matchId: match.id,
                    opponent: match.przeciwnik,
                    date: match.data_meczu,
                    sector: freeSeat.sektor,
                    seat: freeSeat.numer,
                    row: freeSeat.rzad
                });
            }
        }

        const ticketTypeName = mappedType === 'brazowy_los' ? 'Brązowy Łoś' :
            mappedType === 'srebrny_jez' ? 'Srebrny Jeż' : 'Złoty Jeleń';

        const discountPercent = mappedType === 'zloty_jelen' ? 30 :
            mappedType === 'srebrny_jez' ? 20 : 10;

        const emailHtml = generateSeasonTicketEmailHtml({
            firstName,
            lastName,
            ticketType: ticketTypeName,
            price: price.toString(),
            passCode,
            occupiedSeats,
            discountPercent
        });

        await sendTicketEmail(email, 'Twój karnet sezonowy Chaber Pobiedziska 2026', emailHtml);

        res.json({
            success: true,
            seasonTicket,
            occupiedSeats,
            message: 'Karnet został zakupiony, miejsca zarezerwowane na mecze domowe'
        });

    } catch (error) {
        console.error('Error buying season ticket:', error);
        res.status(500).json({
            error: 'Error buying season ticket',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;