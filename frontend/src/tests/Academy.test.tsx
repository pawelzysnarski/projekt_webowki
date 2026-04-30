// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AcademyPage from "../routes/AcademyPage/AcademyPage";
import * as scoutQueryModule from "../queries/scoutQuery";

vi.mock('react-leaflet', () => ({
    MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
    TileLayer: () => null,
    Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('leaflet/dist/leaflet.css', () => ({}));

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

const renderWithProviders = () => render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AcademyPage />
        </BrowserRouter>
    </QueryClientProvider>
);

describe("AcademyPage Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    test("should render benefits section", () => {
        vi.spyOn(scoutQueryModule, 'default').mockReturnValue({
            data: [],
            isLoading: false,
        } as any);

        renderWithProviders();

        expect(screen.getByText("Kadra UEFA")).toBeInTheDocument();
        expect(screen.getByText("Monitoring")).toBeInTheDocument();
    });

    test("should display scouting points and calculate available places", () => {
        const mockPoints = [
            {
                ID: 1,
                miejsce: "Arena Pobiedziska",
                data: new Date(Date.now() + 86400000).toISOString(),
                Ilosc_miejsca: 30,
                szerokosc_geograficzna: 52.4,
                dlugosc_geograficzna: 17.2,
                zapis: [{ ID: 1 }, { ID: 2 }]
            }
        ];

        vi.spyOn(scoutQueryModule, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false,
        } as any);

        renderWithProviders();

        const elements = screen.getAllByText("Arena Pobiedziska");
        expect(elements.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Dostępne miejsca: 28/i)).toBeInTheDocument();
        expect(screen.getByText("Zapisz się")).toBeInTheDocument();
    });

    test("should show 'Zakończone' for past dates", () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 10);

        const mockPoints = [
            {
                ID: 2,
                miejsce: "Dawny Punkt",
                data: pastDate.toISOString(),
                Ilosc_miejsca: 10,
                zapis: []
            }
        ];

        vi.spyOn(scoutQueryModule, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false,
        } as any);

        renderWithProviders();

        const statusElements = screen.getAllByText("Zakończone");
        expect(statusElements.length).toBeGreaterThanOrEqual(1);
        expect(screen.queryByText("Zapisz się")).not.toBeInTheDocument();
    });

    test("should have correct redirect link", () => {
        const mockPoints = [{
            ID: 5,
            miejsce: "Punkt Kierunkowy",
            data: new Date(Date.now() + 86400000).toISOString(),
            Ilosc_miejsca: 10,
            zapis: []
        }];

        vi.spyOn(scoutQueryModule, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false,
        } as any);

        const locationMock = vi.fn();
        delete (window as any).location;
        window.location = { href: "" } as any;
        Object.defineProperty(window.location, 'href', { set: locationMock });

        renderWithProviders();

        fireEvent.click(screen.getByText("Zapisz się"));
        expect(locationMock).toHaveBeenCalledWith("/akademia/zapis/5");
    });
});