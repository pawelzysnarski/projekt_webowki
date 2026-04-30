// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import NewsPage from "../routes/NewsPage/NewsPage";
import * as newsQuery from "../queries/newsQuery";
import type { NewsItem } from "../types/Wiadomosc";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

describe("NewsPage and News Component Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    const renderWithProviders = () => render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <NewsPage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    test("should render loading state", () => {
        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: undefined,
            isLoading: true
        } as never);

        renderWithProviders();
        expect(screen.getByText(/Ładowanie aktualności.../i)).toBeInTheDocument();
    });

    test("should render news items with correct data and paragraphs", () => {
        const mockNews: NewsItem[] = [
            {
                ID: 1,
                Nag__wek: "Wielkie zwycięstwo Chabra!",
                Zdj_cie: "test.jpg",
                Data: new Date("2024-03-20T10:00:00Z"),
                akapity: [
                    { ID: 1, ID_Wiadomo_ci: 1, Tre__: "To był niesamowity mecz." },
                    { ID: 2, ID_Wiadomo_ci: 1, Tre__: "Kibice dopisali." }
                ]
            }
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as never);

        renderWithProviders();

        expect(screen.getByText("Wielkie zwycięstwo Chabra!")).toBeInTheDocument();
        expect(screen.getByText("To był niesamowity mecz.")).toBeInTheDocument();
        expect(screen.getByText("Kibice dopisali.")).toBeInTheDocument();
    });

    test("should render image with correct path", () => {
        const mockNews: NewsItem[] = [
            {
                ID: 1,
                Nag__wek: "News",
                Zdj_cie: "chaber_foto.png",
                Data: new Date("2024-03-20"),
                akapity: []
            }
        ];

        vi.spyOn(newsQuery, 'default').mockReturnValue({
            data: mockNews,
            isLoading: false
        } as never);

        renderWithProviders();

        const img = screen.getByAltText("news") as HTMLImageElement;
        expect(img.src).toContain("/news/chaber_foto.png");
    });
});