import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import MainPage from "../routes/MainPage/MainPage";
import * as newsQuery from "../queries/newsQuery";
import type { NewsItem } from "../types/Wiadomosc";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("/baner_sp.png", () => ({ default: "mock-banner" }));

describe("MainPage Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderMain = () => render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    test("should render news headers directly from query data", async () => {
        const mockNews: NewsItem[] = [
            { ID: 1, Nag__wek: "GLOWNY_NEWS", Zdj_cie: "1.jpg", Data: new Date(), akapity: [] },
            { ID: 2, Nag__wek: "MINI_1", Zdj_cie: "2.jpg", Data: new Date(), akapity: [] },
            { ID: 3, Nag__wek: "MINI_2", Zdj_cie: "3.jpg", Data: new Date(), akapity: [] },
            { ID: 4, Nag__wek: "MINI_3", Zdj_cie: "4.jpg", Data: new Date(), akapity: [] },
            { ID: 5, Nag__wek: "MINI_4", Zdj_cie: "5.jpg", Data: new Date(), akapity: [] },
            { ID: 6, Nag__wek: "UKRYTY_NEWS", Zdj_cie: "6.jpg", Data: new Date(), akapity: [] },
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as unknown as UseQueryResult<NewsItem[]>);

        renderMain();

        expect(await screen.findByText("GLOWNY_NEWS")).toBeTruthy();
        expect(screen.getByText("MINI_1")).toBeTruthy();
        expect(screen.getByText("MINI_4")).toBeTruthy();
        expect(screen.queryByText("UKRYTY_NEWS")).toBeNull();
    });

    test("should handle quick actions navigation", () => {
        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false
        } as unknown as UseQueryResult<NewsItem[]>);

        renderMain();

        fireEvent.click(screen.getByText(/Bilety/i));
        expect(mockNavigate).toHaveBeenCalledWith("/bilety");

        fireEvent.click(screen.getByText(/Sklep/i));
        expect(mockNavigate).toHaveBeenCalledWith("/sklep");
    });

    test("should render sidebar labels and sponsor image", () => {
        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false
        } as unknown as UseQueryResult<NewsItem[]>);

        renderMain();

        expect(screen.getByText("Sponsor Główny")).toBeTruthy();
        expect(screen.getByAltText("Sponsor")).toBeTruthy();
        expect(screen.getByText("Tabela ligowa")).toBeTruthy();
    });

    test("should render only mini news grid if main news is missing", async () => {
        const mockNews: NewsItem[] = [
            { ID: 2, Nag__wek: "JEDYNY_NEWS", Zdj_cie: "2.jpg", Data: new Date(), akapity: [] },
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as unknown as UseQueryResult<NewsItem[]>);

        renderMain();

        expect(await screen.findByText("JEDYNY_NEWS")).toBeTruthy();
        expect(screen.queryByText("MINI_1")).toBeNull();
    });

    test("should not render news section at all when data is undefined", () => {
        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: undefined,
            isLoading: false
        } as unknown as UseQueryResult<NewsItem[]>);

        renderMain();

        const articles = screen.queryAllByRole("article");
        expect(articles.length).toBe(0);
    });
});
