// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi, beforeEach } from "vitest";
import TablePage from "../routes/TablePage/TablePage";
import * as matchesQuery from "../queries/matchDayQuery";
import * as allMatchesQuery from "../queries/matchDayQuery2";
import * as tableQuery from "../queries/tableQuery";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

vi.mock("/logos/chaber.png", () => ({ default: "" }));

describe("Table and Matches Integrity Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    const renderWithProviders = () => render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <TablePage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    test("should calculate and display correct round", () => {
        const mockFinishedMatches = Array(16).fill({ wynik: { bramkiGospodarzy: 2, bramkiGosci: 1 } });

        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: mockFinishedMatches, isLoading: false } as never);
        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);

        renderWithProviders();

        expect(screen.getByText(/Kolejka 2/i)).toBeInTheDocument();
    });

    test("should sort teams by points and goal balance", () => {
        const mockTable = [
            { idKlubu: 1, punkty: 10, bilansBramek: 2, goleZdobyte: 5, klub: { nazwa: "Club A", herb: "a.png" } },
            { idKlubu: 2, punkty: 10, bilansBramek: 5, goleZdobyte: 8, klub: { nazwa: "Club B", herb: "b.png" } },
            { idKlubu: 3, punkty: 15, bilansBramek: 1, goleZdobyte: 3, klub: { nazwa: "Lider", herb: "c.png" } }
        ];

        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: mockTable, isLoading: false } as never);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as never);
        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);

        renderWithProviders();

        const cells = screen.getAllByRole('cell');
        expect(cells[1].textContent).toContain("Lider");
        expect(cells[11].textContent).toContain("Club B");
    });

    test("should handle match status rendering", () => {
        const now = new Date();
        const mockMatches = [{
            id: 1,
            idGospodarza: 1,
            idGoscia: 2,
            dataSpotkania: now.toISOString(),
            gospodarz: { nazwa: "Gosp", herb: "g.png", stadion: "Stadion" },
            gosc: { nazwa: "Gosc", herb: "go.png" },
            wynik: null
        }];

        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: mockMatches, isLoading: false } as never);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as never);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);

        renderWithProviders();

        expect(screen.getByText(/MECZ TRWA/i)).toBeInTheDocument();
    });

    test("should navigate between rounds", async () => {
        const useMatchesSpy = vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as never);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as never);

        renderWithProviders();

        const nextBtn = screen.getByText(/Następna kolejka/i);
        fireEvent.click(nextBtn);

        expect(useMatchesSpy).toHaveBeenCalledWith(2);
        expect(screen.getByText(/Kolejka 2/i)).toBeInTheDocument();
    });
});