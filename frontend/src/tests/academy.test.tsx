import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import AcademyPage from "../routes/AcademyPage/AcademyPage";
import * as scoutQuery from "../queries/scoutQuery.ts";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

vi.mock('react-leaflet', () => ({
    MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
    TileLayer: () => null,
    Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }: any) => <div>{children}</div>,
}));

vi.mock('leaflet/dist/leaflet.css', () => ({}));

describe("AcademyPage Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithProviders = () => render(
        <QueryClientProvider client={queryClient}>
            <AcademyPage />
        </QueryClientProvider>
    );

    test("should render benefits section", () => {
        vi.spyOn(scoutQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false
        } as UseQueryResult<any>);

        renderWithProviders();

        expect(screen.getByText("Kadra UEFA")).toBeTruthy();
        expect(screen.getByText("Monitoring")).toBeTruthy();
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

        vi.spyOn(scoutQuery, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false
        } as UseQueryResult<any>);

        renderWithProviders();

        const points = screen.getAllByText("Arena Pobiedziska");
        expect(points.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Dostępne miejsca: 28/i)).toBeTruthy();
        expect(screen.getByText("Zapisz się")).toBeTruthy();
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

        vi.spyOn(scoutQuery, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false
        } as UseQueryResult<any>);

        renderWithProviders();

        const statusElements = screen.getAllByText("Zakończone");
        expect(statusElements.length).toBeGreaterThanOrEqual(1);

        expect(screen.queryByText("Zapisz się")).toBeNull();
    });

    test("should have correct redirect link", () => {
        const mockPoints = [{
            ID: 5,
            miejsce: "Punkt Kierunkowy",
            data: new Date(Date.now() + 86400000).toISOString(),
            Ilosc_miejsca: 10,
            zapis: []
        }];

        vi.spyOn(scoutQuery, 'default').mockReturnValue({
            data: mockPoints,
            isLoading: false
        } as UseQueryResult<any>);

        const locationMock = vi.fn();
        delete (window as any).location;
        window.location = { href: "" } as any;
        Object.defineProperty(window.location, 'href', { set: locationMock });

        renderWithProviders();

        fireEvent.click(screen.getByText("Zapisz się"));
        expect(locationMock).toHaveBeenCalledWith("/akademia/zapis/5");
    });
});
