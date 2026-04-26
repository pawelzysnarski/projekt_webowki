import { Router, Request, Response } from 'express';
import prisma from "../prismaDb"

const router = Router();

router.get('/matches/upcoming', async (req: Request, res: Response) => {
    try {
        console.log('Fetching upcoming matches...');

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

        console.log(`Found ${matches.length} matches`);

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
        res.status(500).json({
            error: 'Error fetching matches',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

router.get('/matches/:id', async (req: Request, res: Response) => {
    try {
        const matchId = parseInt(<string>req.params.id);
        console.log(`Fetching match with ID: ${matchId}`);

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
            console.log(`Match ${matchId} not found`);
            return res.status(404).json({ error: 'Match not found' });
        }

        console.log(`Match found: ${match.przeciwnik}, is_home: ${match.czy_domowy}`);

        res.json({
            ...match,
            match_type: match.czy_domowy ? 'home' : 'away',
            available_ticket_types: match.czy_domowy
                ? ['brazowy_los', 'srebrny_jez', 'zloty_jelen']
                : ['normalny']
        });
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({
            error: 'Error fetching match',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

router.get('/matches/:id/seats', async (req: Request, res: Response) => {
    try {
        const { sector, row } = req.query;
        const matchId = parseInt(<string>req.params.id);

        console.log(`Fetching seats for match ${matchId}, sector: ${sector}, row: ${row}`);

        const match = await prisma.mecz.findUnique({
            where: { id: matchId }
        });

        if (!match) {
            console.log(`Match ${matchId} not found`);
            return res.status(404).json({ error: 'Match not found' });
        }

        const where: any = {
            id_meczu: matchId
        };

        if (sector) where.sektor = sector;
        if (row) where.rzad = row;

        const seats = await prisma.miejsca.findMany({
            where,
            orderBy: [
                { sektor: 'asc' },
                { rzad: 'asc' },
                { numer: 'asc' }
            ]
        });

        console.log(`Found ${seats.length} seats for match ${matchId}, is_home: ${match.czy_domowy}`);

        res.json({
            is_home: match.czy_domowy,
            seats: seats,
            info: match.czy_domowy
                ? 'Choose sector and seat in the stadium'
                : 'Away match - only away sector seats available'
        });
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({
            error: 'Error fetching seats',
            details: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
    }
});

router.get('/matches/:matchId/seats/:seatId/check', async (req: Request, res: Response) => {
    try {
        const matchId = parseInt(<string>req.params.matchId);
        const seatId = parseInt(<string>req.params.seatId);

        const seat = await prisma.miejsca.findFirst({
            where: {
                id: seatId,
                id_meczu: matchId,
                czy_zajete: false
            }
        });

        res.json({
            available: !!seat,
            seat: seat || null
        });
    } catch (error) {
        console.error('Error checking seat:', error);
        res.status(500).json({
            error: 'Error checking seat',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
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

        const seat = await prisma.miejsca.findFirst({
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
            prisma.miejsca.update({
                where: { id: seat.id },
                data: { czy_zajete: true }
            })
        ]);

        res.json({
            success: true,
            ticket: result[0],
            message: `Ticket for ${match.czy_domowy ? 'home' : 'away'} match has been reserved`
        });
    } catch (error) {
        console.error('Error buying ticket:', error);
        res.status(500).json({
            error: 'Error buying ticket',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

router.get('/tickets/user/:email', async (req: Request, res: Response) => {
    try {
        const tickets = await prisma.bilet.findMany({
            where: {
                email: <string>req.params.email
            },
            include: {
                mecz: true,
                miejsce: true
            },
            orderBy: {
                data_zakupu: 'desc'
            }
        });

        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({
            error: 'Error fetching tickets',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
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
            prisma.bilet.delete({
                where: { id: ticketId }
            }),
            prisma.miejsca.update({
                where: { id: ticket.id_miejsca },
                data: { czy_zajete: false }
            })
        ]);

        res.json({
            success: true,
            message: 'Ticket cancelled, seat has been released'
        });
    } catch (error) {
        console.error('Error cancelling ticket:', error);
        res.status(500).json({
            error: 'Error cancelling ticket',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});


export default router;