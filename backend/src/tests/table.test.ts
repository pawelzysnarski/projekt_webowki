//@ts-ignore
import { describe, test, expect } from "vitest";

describe("Getting data from table 'tabela'", () => {
    test("Data should not be null", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const data = await response.json();
        expect(data).not.toBe(null);
    })
    test("Data length should be equal to 16", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const data = await response.json();
        expect(data.length).toBe(16);
    });
    test("Fields should be null", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const data = await response.json();
        expect(data[0]).not.toBe(null);
    })
});
describe("Database Integrity: Points Check", () => {
    test("Total points in league table should match wins and draws calculation", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const tabelaData = await response.json();

        tabelaData.forEach((klub: any) => {
            const zwyciestwa = klub.zwyciestwa !== undefined ? klub.zwyciestwa : klub.Zwyciestwa;
            const remisy = klub.remisy !== undefined ? klub.remisy : klub.Remisy;
            const punkty = klub.punkty !== undefined ? klub.punkty : klub.Punkty;

            const obliczonePunkty = (Number(zwyciestwa) * 3) + (Number(remisy));

            expect(Number(punkty)).toBe(obliczonePunkty);
        });
    });

    test("Sum of all goals Zdobyte should equal sum of all goals Stracone in whole table", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const tabelaData = await response.json();

        const sumaZdobyte = tabelaData.reduce((sum: number, klub: any) =>
            sum + (Number(klub.goleZdobyte || klub.Gole_Zdobyte) || 0), 0);

        const sumaStracone = tabelaData.reduce((sum: number, klub: any) =>
            sum + (Number(klub.goleStracone || klub.Gole_Stracone) || 0), 0);

        expect(sumaZdobyte).toBe(sumaStracone);
    });
});

