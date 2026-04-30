// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, test, expect, vi, beforeEach } from "vitest";
import TicketPage from "../routes/TicketPage/TicketPage";
import * as matchQuery from "../queries/matchQuery";

describe("TicketPage Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderTicketPage = () => render(
        <MemoryRouter>
            <TicketPage />
        </MemoryRouter>
    );

    test("should render matches from API", async () => {
        const mockMatches = [
            { id: 1, przeciwnik: "Test Team", czy_domowy: true, data_meczu: new Date().toISOString() },
        ];

        vi.spyOn(matchQuery.matchQuery, 'getUpcomingMatches').mockResolvedValue(mockMatches);

        renderTicketPage();

        expect(await screen.findByText("Chaber Pobiedziska vs Test Team")).toBeInTheDocument();
    });

    test("should render season ticket link", () => {
        vi.spyOn(matchQuery.matchQuery, 'getUpcomingMatches').mockResolvedValue([]);

        renderTicketPage();

        expect(screen.getByText("Karnet sezonowy Chaber Pobiedziska")).toBeInTheDocument();
        expect(screen.getByText("Kliknij aby dowiedzieć się więcej")).toBeInTheDocument();
    });

    test("should render empty state when no matches", async () => {
        vi.spyOn(matchQuery.matchQuery, 'getUpcomingMatches').mockResolvedValue([]);

        renderTicketPage();

        await waitFor(() => {
            expect(screen.queryByText(/vs/i)).not.toBeInTheDocument();
        });
    });
});