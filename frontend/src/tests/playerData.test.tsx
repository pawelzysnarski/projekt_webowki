import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import PlayerDesc from "../components/PlayerDesc/PlayerDesc";
import * as playersQuery from "../queries/playersQuery";
import type { Zawodnik } from "../types/Zawodnik";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "10" })
    };
});

describe("PlayerDesc Component Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithProviders = () => render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <PlayerDesc />
            </MemoryRouter>
        </QueryClientProvider>
    );
    test("should render player details correctly", () => {
        const birthDate = new Date("1994-05-20");
        const mockPlayers: Zawodnik[] = [{
            ID: 10,
            Imie: "Piotr",
            Nazwisko: "Zieliński",
            Numer: 20,
            Pozycja: "Pomocnik",
            Mecze: 150,
            Bramki: 30,
            Asysty: 45,
            Data_Urodzenia: birthDate,
            Kraj: "Polska",
            Wzrost: 180,
            Waga: 75,
        }];

        vi.spyOn(playersQuery, 'default').mockReturnValue({
            data: mockPlayers,
            isLoading: false
        } as unknown as UseQueryResult<Zawodnik[]>);

        renderWithProviders();

        expect(screen.getByText("Piotr Zieliński")).toBeTruthy();
        expect(screen.getByText("#20")).toBeTruthy();

        const expectedDate = birthDate.toLocaleDateString('pl-PL');
        expect(screen.getByText(expectedDate)).toBeTruthy();

        expect(screen.getByText("180 cm")).toBeTruthy();
    });



    test("should show not found message when player does not exist", () => {
        vi.spyOn(playersQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false
        } as unknown as UseQueryResult<Zawodnik[]>);

        renderWithProviders();

        expect(screen.getByText("Nie znaleziono zawodnika")).toBeTruthy();
    });

    test("should call navigate(-1) when back button is clicked", () => {
        const mockPlayers = [{ ID: 10, Imie: "Jan", Nazwisko: "Test", Numer: 1 }] as Zawodnik[];
        vi.spyOn(playersQuery, 'default').mockReturnValue({ data: mockPlayers, isLoading: false } as any);

        renderWithProviders();

        fireEvent.click(screen.getByText(/Wróć do składu/i));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test("should render player image with correct source", () => {
        const mockPlayers = [{ ID: 10, Imie: "Jan", Numer: 99 }] as Zawodnik[];
        vi.spyOn(playersQuery, 'default').mockReturnValue({ data: mockPlayers, isLoading: false } as any);

        renderWithProviders();

        const img = screen.getByAltText("player") as HTMLImageElement;
        expect(img.src).toContain("/players/99.png");
    });
});
