import request from 'supertest';
import express from 'express';
import matchesDbRouter from '../routes/matchesDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/matches', matchesDbRouter);

describe("Getting data from table 'terminarz'", () => {
    test("Data should not be null", async () => {
        const response = await request(app).get('/api/matches');
        expect(response.body).not.toBe(null);
    });

    test("Fields should not be null", async () => {
        const response = await request(app).get('/api/matches');
        expect(response.body[0]).not.toBe(null);
    });

    test("Matchround should have 8 matches", async () => {
        const response = await request(app).get('/api/matches/1');
        expect(response.body.length).toBe(8);
    });

    test("Season should have 240 matches", async () => {
        const response = await request(app).get('/api/matches');
        expect(response.body.length).toBe(240);
    });
});