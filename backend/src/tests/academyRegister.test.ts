//@ts-ignore
import { describe, test, expect } from "vitest";

describe("Testing 'academyRegister' endpoint", () => {
    test("Should successfully create a new registration", async () => {
        const testData = {
            ID_Punktu: 1,
            Imie: "Jan",
            Nazwisko: "Kowalski",
            Wiek: 10,
            Email: "test@example.com"
        };

        const response = await fetch("http://localhost:3000/api/academyRegister", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testData)
        });

        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.data.Imie).toBe("Jan");
    });

    test("Should return 400 when fields are missing", async () => {
        const incompleteData = {
            Imie: "Jan"
        };

        const response = await fetch("http://localhost:3000/api/academyRegister", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(incompleteData)
        });

        expect(response.status).toBe(400);
    });

    test("Response data should not be null", async () => {
        const response = await fetch("http://localhost:3000/api/academyRegister", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ID_Punktu: 1,
                Imie: "Adam",
                Nazwisko: "Nowak",
                Wiek: 8,
                Email: "adam@test.pl"
            })
        });
        const data = await response.json();
        expect(data).not.toBe(null);
    });
});
describe("Email delivery check", () => {
    test("Should successfully finish registration process", async () => {
        const response = await fetch("http://localhost:3000/api/academyRegister", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ID_Punktu: 1,
                Imie: "Test",
                Nazwisko: "Wiadomosci",
                Wiek: 10,
                Email: "test@chaber.pl"
            })
        });
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data.success).toBe(true);
    });
});