//@ts-ignore
import { describe, test, expect } from "vitest";

describe("Getting data from table 'punkty_scoutingowe'", () => {
    test("Data should not be null", async () => {
        const response = await fetch("http://localhost:3000/api/scout");
        const data = await response.json();
        expect(data).not.toBe(null);
    })
    test("Fields should be null", async () => {
        const response = await fetch("http://localhost:3000/api/scout");
        const data = await response.json();
        expect(data[0]).not.toBe(null);
    })
});
