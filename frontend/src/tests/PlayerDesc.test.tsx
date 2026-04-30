// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
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

    const renderPlayerData = () => render(
        <MemoryRouter>
            <PlayerData player={mockPlayer} />
        </MemoryRouter>
    );

    test("should render player name and surname", () => {
        renderPlayerData();

        expect(screen.getByText("Robert")).toBeInTheDocument();
        expect(screen.getByText("Lewandowski")).toBeInTheDocument();
    });

    test("should display correct player number with hash", () => {
        renderPlayerData();

        expect(screen.getByText("#9")).toBeInTheDocument();
    });

    test("should display player country", () => {
        renderPlayerData();

        expect(screen.getByText("Polska")).toBeInTheDocument();
    });

    test("should have correct image source based on player number", () => {
        renderPlayerData();

        const img = screen.getByAltText("player") as HTMLImageElement;
        expect(img.src).toContain("/players/9.png");
    });

    test("should have correct link to player profile", () => {
        renderPlayerData();

        const link = screen.getByText("Profil gracza") as HTMLAnchorElement;
        expect(link.getAttribute("href")).toBe("/zawodnik/7");
    });
});