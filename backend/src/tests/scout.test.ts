import request from 'supertest';
import express from 'express';
import scoutDbRouter from '../routes/scoutDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/scout', scoutDbRouter);

describe("Getting data from table 'punkty_scoutingowe'", () => {
    test("Data should not be null", async () => {
        const response = await request(app).get('/api/scout');
        expect(response.body).not.toBe(null);
    });

    test("Fields should not be null", async () => {
        const response = await request(app).get('/api/scout');
        expect(response.body[0]).not.toBe(null);
    });
});