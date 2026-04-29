//@ts-ignore
import { describe, test, expect } from "vitest";

describe("Getting data from table 'terminarz'", () => {
    test("Data should not be null", async () => {
        const response = await fetch("http://localhost:3000/api/matches");
        const data = await response.json();
        expect(data).not.toBe(null);
    })
    test("Fields should be null", async () => {
        const response = await fetch("http://localhost:3000/api/matches");
        const data = await response.json();
        expect(data[0]).not.toBe(null);
    })
    test("Matchround should have 8 matches", async () => {
        const response = await fetch("http://localhost:3000/api/matches/1");
        const data = await response.json();
        expect(data.length).toBe(8);
    })
    test("Season should have 240 matches", async () => {
        const response = await fetch("http://localhost:3000/api/matches");
        const data = await response.json();
        expect(data.length).toBe(240);
    })
});
