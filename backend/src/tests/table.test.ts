import request from 'supertest';
import express from 'express';
import tableDbRouter from '../routes/tableDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/table', tableDbRouter);

describe("Getting data from table 'tabela'", () => {
    test("Data should not be null", async () => {
        const response = await request(app).get('/api/table');
        expect(response.body).not.toBe(null);
    });

    test("Data length should be equal to 16", async () => {
        const response = await request(app).get('/api/table');
        expect(response.body.length).toBe(16);
    });

    test("Fields should not be null", async () => {
        const response = await request(app).get('/api/table');
        expect(response.body[0]).not.toBe(null);
    });
});

describe("Database Integrity: Points Check", () => {
    test("Total points in league table should match wins and draws calculation", async () => {
        const response = await request(app).get('/api/table');
        const tabelaData = response.body;

        tabelaData.forEach((klub: any) => {
            const zwyciestwa = klub.zwyciestwa !== undefined ? klub.zwyciestwa : klub.Zwyciestwa;
            const remisy = klub.remisy !== undefined ? klub.remisy : klub.Remisy;
            const punkty = klub.punkty !== undefined ? klub.punkty : klub.Punkty;

            const obliczonePunkty = (Number(zwyciestwa) * 3) + (Number(remisy));

            expect(Number(punkty)).toBe(obliczonePunkty);
        });
    });

    test("Sum of all goals Zdobyte should equal sum of all goals Stracone in whole table", async () => {
        const response = await request(app).get('/api/table');
        const tabelaData = response.body;

        const sumaZdobyte = tabelaData.reduce((sum: number, klub: any) =>
            sum + (Number(klub.goleZdobyte || klub.Gole_Zdobyte) || 0), 0);

        const sumaStracone = tabelaData.reduce((sum: number, klub: any) =>
            sum + (Number(klub.goleStracone || klub.Gole_Stracone) || 0), 0);

        expect(sumaZdobyte).toBe(sumaStracone);
    });
});