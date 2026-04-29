import { render, screen } from "@testing-library/react";
import PlayerData from "../components/PlayerData/PlayerData";
import type { Zawodnik } from "../types/Zawodnik";

describe("PlayerData Component Tests", () => {
    const mockPlayer: Zawodnik = {
        ID: 7,
        Imie: "Robert",
        Nazwisko: "Lewandowski",
        Numer: 9,
        Kraj: "Polska",
        Pozycja: "Napastnik",
        Data_Urodzenia: new Date(),
        Wzrost: 185,
        Waga: 81
    };

    test("should render player name and surname", () => {
        render(<PlayerData player={mockPlayer} />);

        expect(screen.getByText("Robert")).toBeTruthy();
        expect(screen.getByText("Lewandowski")).toBeTruthy();
    });

    test("should display correct player number with hash", () => {
        render(<PlayerData player={mockPlayer} />);

        expect(screen.getByText("#9")).toBeTruthy();
    });

    test("should display player country", () => {
        render(<PlayerData player={mockPlayer} />);

        expect(screen.getByText("Polska")).toBeTruthy();
    });

    test("should have correct image source based on player number", () => {
        render(<PlayerData player={mockPlayer} />);

        const img = screen.getByAltText("player") as HTMLImageElement;
        expect(img.src).toContain("/players/9.png");
    });

    test("should have correct link to player profile", () => {
        render(<PlayerData player={mockPlayer} />);

        const link = screen.getByText("Profil gracza") as HTMLAnchorElement;
        expect(link.getAttribute("href")).toBe("/zawodnik/7");
    });
});
