import request from 'supertest';
import express from 'express';
import academyRegisterDbRouter from '../routes/academyRegisterDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/academyRegister', academyRegisterDbRouter);

describe("Testing 'academyRegister' endpoint", () => {
    test("Should successfully create a new registration", async () => {
        const testData = {
            ID_Punktu: 1,
            Imie: "Jan",
            Nazwisko: "Kowalski",
            Wiek: 10,
            Email: "test@example.com"
        };

        const response = await request(app)
            .post('/api/academyRegister')
            .send(testData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.Imie).toBe("Jan");
    });

    test("Should return 400 when fields are missing", async () => {
        const incompleteData = {
            Imie: "Jan"
        };

        const response = await request(app)
            .post('/api/academyRegister')
            .send(incompleteData);

        expect(response.status).toBe(400);
    });

    test("Response data should not be null", async () => {
        const response = await request(app)
            .post('/api/academyRegister')
            .send({
                ID_Punktu: 1,
                Imie: "Adam",
                Nazwisko: "Nowak",
                Wiek: 8,
                Email: "adam@test.pl"
            });

        expect(response.body.data).not.toBe(null);
    });
});

describe("Email delivery check", () => {
    test("Should successfully finish registration process", async () => {
        const response = await request(app)
            .post('/api/academyRegister')
            .send({
                ID_Punktu: 1,
                Imie: "Test",
                Nazwisko: "Wiadomosci",
                Wiek: 10,
                Email: "test@chaber.pl"
            });

        expect(response.status).toBe(201);
    });
});