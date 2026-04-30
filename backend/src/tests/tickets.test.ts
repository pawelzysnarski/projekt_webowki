import request from 'supertest';
import express from 'express';
import ticketsRouter from '../routes/ticketsRouter.js';

const app = express();
app.use(express.json());
app.use('/api/tickets', ticketsRouter);

describe("Tickets API", () => {
    test("GET /api/tickets/matches/upcoming - should return matches", async () => {
        const response = await request(app).get('/api/tickets/matches/upcoming');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeLessThanOrEqual(2);
    });

    test("GET /api/tickets/matches/:id - should return match by id", async () => {
        const response = await request(app).get('/api/tickets/matches/1');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.przeciwnik).toBeDefined();
        expect(response.body.match_type).toBeDefined();
    });

    test("GET /api/tickets/matches/:id - should return 404 for non-existent match", async () => {
        const response = await request(app).get('/api/tickets/matches/99999');

        expect(response.status).toBe(404);
    });

    test("GET /api/tickets/matches/:id/seats - should return seats", async () => {
        const response = await request(app).get('/api/tickets/matches/1/seats');

        expect(response.status).toBe(200);
        expect(response.body.is_home).toBeDefined();
        expect(Array.isArray(response.body.seats)).toBe(true);
    });

    test("GET /api/tickets/matches/:id/seats - should return 404 for non-existent match", async () => {
        const response = await request(app).get('/api/tickets/matches/99999/seats');

        expect(response.status).toBe(404);
    });

    test("GET /api/tickets/matches/:matchId/seats/:seatId/check - should check seat", async () => {
        const response = await request(app).get('/api/tickets/matches/1/seats/1/check');

        expect(response.status).toBe(200);
        expect(response.body.available).toBeDefined();
    });

    test("POST /api/tickets/tickets/buy - should reject missing fields", async () => {
        const response = await request(app)
            .post('/api/tickets/tickets/buy')
            .send({ matchId: 1 });

        expect(response.status).toBe(400);
    });

    test("POST /api/tickets/season-ticket/buy - should reject missing fields", async () => {
        const response = await request(app)
            .post('/api/tickets/season-ticket/buy')
            .send({ firstName: "Test" });

        expect(response.status).toBe(400);
    });

    test("POST /api/tickets/season-ticket/buy - should buy season ticket", async () => {
        const response = await request(app)
            .post('/api/tickets/season-ticket/buy')
            .send({
                firstName: "Test",
                lastName: "Testowy",
                email: "test@test.pl",
                ticketType: "basic",
                price: 299
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.seasonTicket).toBeDefined();
        expect(response.body.seasonTicket.kod_karnetu).toBeDefined();
        expect(Array.isArray(response.body.occupiedSeats)).toBe(true);
    });

    test("GET /api/tickets/tickets/user/:email - should return user tickets", async () => {
        const response = await request(app).get('/api/tickets/tickets/user/test@test.pl');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});