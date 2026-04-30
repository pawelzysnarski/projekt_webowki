// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Tickets from "../components/Tickets/Tickets";
import * as matchQuery from "../queries/matchQuery";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return { ...actual, useParams: () => ({ id: "1" }) };
});

describe("Tickets Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderTickets = () => render(
        <MemoryRouter>
            <Tickets />
        </MemoryRouter>
    );

    test("should show loading state", () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockReturnValue(new Promise(() => {}));

        renderTickets();

        expect(screen.getByText("Ładowanie...")).toBeInTheDocument();
    });

    test("should render ticket types for home match", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 1, przeciwnik: "Test", czy_domowy: true, data_meczu: new Date().toISOString(),
        } as any);

        renderTickets();

        expect(await screen.findByText("Brązowy Łoś")).toBeInTheDocument();
        expect(screen.getByText("Srebrny Jeż")).toBeInTheDocument();
        expect(screen.getByText("Złoty Jeleń")).toBeInTheDocument();
    });

    test("should render away match ticket", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getMatch').mockResolvedValue({
            id: 3, przeciwnik: "Away Team", czy_domowy: false, data_meczu: new Date().toISOString(),
            stadion: "Test Stadium", miasto: "Test City",
        } as any);

        renderTickets();

        expect(await screen.findByText("Bilet Normalny")).toBeInTheDocument();
        expect(screen.getByText("Mecz wyjazdowy")).toBeInTheDocument();
    });
});