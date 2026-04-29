import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider, UseQueryResult } from "@tanstack/react-query";
import NewsPage from "../routes/NewsPage/NewsPage";
import * as newsQuery from "../queries/newsQuery";
import type { NewsItem } from "../types/Wiadomosc";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

describe("NewsPage and News Component Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithProviders = () => render(
        <QueryClientProvider client={queryClient}>
            <NewsPage />
        </QueryClientProvider>
    );

    test("should render loading state", () => {
        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: undefined,
            isLoading: true
        } as UseQueryResult<NewsItem[]>);

        renderWithProviders();
        expect(screen.getByText(/Ładowanie aktualności.../i)).toBeTruthy();
    });

    test("should render news items with correct data and paragraphs", () => {
        const mockNews: NewsItem[] = [
            {
                ID: 1,
                Nag__wek: "Wielkie zwycięstwo Chabra!",
                Zdj_cie: "test.jpg",
                Data: "2024-03-20T10:00:00Z",
                akapity: [
                    { ID: 1, ID_Wiadomo_ci: 1, Tre__: "To był niesamowity mecz." },
                    { ID: 2, ID_Wiadomo_ci: 1, Tre__: "Kibice dopisali." }
                ]
            }
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as UseQueryResult<NewsItem[]>);

        renderWithProviders();

        expect(screen.getByText("Wielkie zwycięstwo Chabra!")).toBeTruthy();
        expect(screen.getByText("To był niesamowity mecz.")).toBeTruthy();
        expect(screen.getByText("Kibice dopisali.")).toBeTruthy();

        // Sprawdzenie daty
        const formattedDate = new Date("2024-03-20T10:00:00Z").toLocaleDateString('pl-PL');
        expect(screen.getByText(formattedDate)).toBeTruthy();
    });

    test("should render image with correct path", () => {
        const mockNews: NewsItem[] = [
            {
                ID: 1,
                Nag__wek: "News",
                Zdj_cie: "chaber_foto.png",
                Data: "2024-03-20",
                akapity: []
            }
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as UseQueryResult<NewsItem[]>);

        renderWithProviders();

        const img = screen.getByAltText("news") as HTMLImageElement;
        expect(img.src).toContain("/news/chaber_foto.png");
    });
});
