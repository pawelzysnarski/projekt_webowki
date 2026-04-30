import request from 'supertest';
import express from 'express';
import staffDbRouter from '../routes/staffDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/staff', staffDbRouter);

describe("Getting data from table 'personel'", () => {
    test("Data should not be null", async () => {
        const response = await request(app).get('/api/staff');
        expect(response.body).not.toBe(null);
    });

    test("Fields should not be null", async () => {
        const response = await request(app).get('/api/staff');
        expect(response.body[0]).not.toBe(null);
    });
});