// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import StadiumMap from "../components/Stadium/StadiumMap";
import * as AuthModule from "../auth/AuthContext";
import * as matchQuery from "../queries/matchQuery";
import * as stadiumQuery from "../queries/stadiumQuery";

vi.mock("react-konva", () => ({
    Stage: ({ children }: any) => <div data-testid="stage">{children}</div>,
    Layer: ({ children }: any) => <div>{children}</div>,
    Rect: () => null,
    Circle: () => null,
    Text: ({ text }: any) => <span>{text}</span>,
}));

describe("StadiumMap Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: { imie: "Jan", email: "jan@test.pl" },
        } as any);
    });

    test("should show loading state initially", () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockReturnValue(new Promise(() => {}));
        vi.spyOn(stadiumQuery.stadiumQuery, 'getSeats').mockReturnValue(new Promise(() => {}));

        render(
            <MemoryRouter initialEntries={['/bilety/1/brazowy_los']}>
                <StadiumMap />
            </MemoryRouter>
        );

        expect(screen.getByText("Ładowanie stadionu...")).toBeInTheDocument();
    });

    test("should show error when no seats available", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 1, przeciwnik: "Test", czy_domowy: true, data_meczu: new Date().toISOString(),
        } as any);
        vi.spyOn(stadiumQuery.stadiumQuery, 'getSeats').mockResolvedValue({
            is_home: true, seats: [], info: "",
        });

        render(
            <MemoryRouter initialEntries={['/bilety/1/brazowy_los']}>
                <StadiumMap />
            </MemoryRouter>
        );

        expect(await screen.findByText(/Brak dostępnych miejsc dla tego meczu/i)).toBeInTheDocument();
    });

    test("should render stadium with sectors", async () => {
        const mockSeats = Array(60).fill(null).map((_, i) => ({
            id: i + 1, sektor: "A1", rzad: "A", numer: i + 1, czy_zajete: false, cena: 50, typ_biletu: "brazowy_los", id_meczu: 1
        }));

        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 1, przeciwnik: "Test", czy_domowy: true, data_meczu: new Date().toISOString(),
        } as any);
        vi.spyOn(stadiumQuery.stadiumQuery, 'getSeats').mockResolvedValue({
            is_home: true, seats: mockSeats, info: "",
        });

        render(
            <MemoryRouter initialEntries={['/bilety/1/brazowy_los']}>
                <StadiumMap />
            </MemoryRouter>
        );

        expect(await screen.findByText("Arena imienia Tomasza Piotrkowskiego")).toBeInTheDocument();
        expect(screen.getByText(/Kliknij na sektor/i)).toBeInTheDocument();
    });
});