import request from 'supertest';
import express from 'express';
import newsDbRouter from '../routes/newsDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/news', newsDbRouter);

describe("Getting data from table 'wiadomosci'", () => {
    test("Data should not be null", async () => {
        const response = await request(app).get('/api/news');
        expect(response.body).not.toBe(null);
    });

    test("Fields should not be null", async () => {
        const response = await request(app).get('/api/news');
        expect(response.body[0]).not.toBe(null);
    });
});