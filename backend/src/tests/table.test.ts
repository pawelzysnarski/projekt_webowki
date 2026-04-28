import { describe, test, expect } from "vitest";

describe("Getting data from table 'tabela'", () => {
    test("Data length should be equal to 16", async () => {
        const response = await fetch("http://localhost:3000/api/table");
        const data = await response.json();
        expect(data.length).toBe(16);
    });
});
