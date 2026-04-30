import request from 'supertest';
import express from 'express';
import contactRouter from '../routes/contactRouter.js';

const app = express();
app.use(express.json());
app.use('/api/contact', contactRouter);

describe("Contact API", () => {
    test("POST /api/contact/send - should send message", async () => {
        const response = await request(app)
            .post('/api/contact/send')
            .send({
                imie: "Jan",
                nazwisko: "Kowalski",
                email: "jan@test.pl",
                temat: "Test",
                wiadomosc: "To jest testowa wiadomość"
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("POST /api/contact/send - should reject missing fields", async () => {
        const response = await request(app)
            .post('/api/contact/send')
            .send({ imie: "Jan" });

        expect(response.status).toBe(400);
    });

    test("POST /api/contact/send - should reject empty body", async () => {
        const response = await request(app)
            .post('/api/contact/send')
            .send({});

        expect(response.status).toBe(400);
    });
});