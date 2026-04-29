import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TablePage from "../routes/TablePage/TablePage.tsx";
import * as matchesQuery from "../queries/matchDayQuery";
import * as allMatchesQuery from "../queries/matchDayQuery2";
import * as tableQuery from "../queries/tableQuery.ts";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

describe("Table and Matches Integrity Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mock("/logos/chaber.png", () => ({ default: "" }));
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

        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: mockFinishedMatches, isLoading: false } as any);
        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);

        renderWithProviders();

        expect(screen.getByText(/Kolejka 2/i)).toBeTruthy();
    });

    test("should sort teams by points and goal balance", () => {
        const mockTable = [
            { idKlubu: 1, punkty: 10, bilansBramek: 2, goleZdobyte: 5, klub: { nazwa: "Klub A", herb: "a.png" } },
            { idKlubu: 2, punkty: 10, bilansBramek: 5, goleZdobyte: 8, klub: { nazwa: "Klub B", herb: "b.png" } },
            { idKlubu: 3, punkty: 15, bilansBramek: 1, goleZdobyte: 3, klub: { nazwa: "Lider", herb: "c.png" } }
        ];

        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: mockTable, isLoading: false } as any);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as any);
        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);

        renderWithProviders();

        const cells = screen.getAllByRole('cell');
        expect(cells[1].textContent).toContain("Lider");
        expect(cells[11].textContent).toContain("Klub B");
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

        vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: mockMatches, isLoading: false } as any);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as any);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);

        renderWithProviders();

        expect(screen.getByText(/MECZ TRWA/i)).toBeTruthy();
    });

    test("should navigate between rounds", async () => {
        const useMatchesSpy = vi.spyOn(matchesQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);
        vi.spyOn(allMatchesQuery, 'useAllMatches').mockReturnValue({ data: [], isLoading: false } as any);
        vi.spyOn(tableQuery, 'default').mockReturnValue({ data: [], isLoading: false } as any);

        renderWithProviders();

        const nextBtn = screen.getByText(/Następna kolejka/i);
        fireEvent.click(nextBtn);

        expect(useMatchesSpy).toHaveBeenCalledWith(2);
        expect(screen.getByText(/Kolejka 2/i)).toBeTruthy();
    });
});
