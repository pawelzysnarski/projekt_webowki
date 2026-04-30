// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Ticket from "../components/Ticket/Ticket";
import * as matchQuery from "../queries/matchQuery";
import * as stadiumQuery from "../queries/stadiumQuery";
import * as AuthModule from "../auth/AuthContext";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useParams: () => ({ id: "1", type_id: "brazowy_los" }) };
});

vi.mock("react-konva", () => ({
    Stage: ({ children }: never) => <div>{children}</div>,
    Layer: ({ children }: never) => <div>{children}</div>,
    Rect: () => null,
    Circle: () => null,
    Text: ({ text }: never) => <span>{text}</span>,
}));

describe("Ticket Component Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: null,
        } as never);
    });

    test("should render home match info", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 1, przeciwnik: "Test", czy_domowy: true, data_meczu: new Date().toISOString(),
        } as never);
        vi.spyOn(stadiumQuery.stadiumQuery, 'getSeats').mockResolvedValue({
            is_home: true, seats: [], info: "",
        });

        render(
            <MemoryRouter>
                <Ticket />
            </MemoryRouter>
        );

        expect(await screen.findByText("Chaber Pobiedziska vs Test")).toBeInTheDocument();
    });

    test("should render away match info", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 3, przeciwnik: "Away", czy_domowy: false, data_meczu: new Date().toISOString(),
            stadion: "Stadion", miasto: "Miasto",
        } as never);
        vi.spyOn(stadiumQuery.stadiumQuery, 'getSeats').mockResolvedValue({
            is_home: false, seats: [], info: "",
        });

        render(
            <MemoryRouter>
                <Ticket />
            </MemoryRouter>
        );

        expect(await screen.findByText("Chaber Pobiedziska vs Away")).toBeInTheDocument();
        expect(screen.getByText("🚌 Mecz wyjazdowy")).toBeInTheDocument();
    });
});