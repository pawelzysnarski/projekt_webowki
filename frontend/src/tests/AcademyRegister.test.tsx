// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthContext } from "../auth/AuthContext";
import RegisterPage from "../routes/AcademyRegister/AcademyRegister";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: "1" })
    };
});

describe("RegisterPage Component Tests", () => {
    const mockAuthValue = {
        user: { imie: "Jan", nazwisko: "Kowalski", email: "test@chaber.pl" },
        login: vi.fn(),
        logout: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubGlobal('fetch', vi.fn());
    });

    const renderWithProviders = (ui: React.ReactElement) => {
        return render(
            <AuthContext.Provider value={mockAuthValue as any}>
                <MemoryRouter>
                    {ui}
                </MemoryRouter>
            </AuthContext.Provider>
        );
    };

    test("should render form with context data", () => {
        renderWithProviders(<RegisterPage />);

        expect(screen.getByText(/Zgłoszenie/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue("test@chaber.pl")).toBeInTheDocument();
    });

    test("should show validation error for invalid age", async () => {
        renderWithProviders(<RegisterPage />);

        fireEvent.change(screen.getByPlaceholderText("Imię dziecka"), { target: { value: "Adam" } });
        fireEvent.change(screen.getByPlaceholderText("Nazwisko dziecka"), { target: { value: "Nowak" } });
        fireEvent.change(screen.getByPlaceholderText(/Wiek dziecka/), { target: { value: "2" } });

        const form = screen.getByRole("main").querySelector("form")!;
        fireEvent.submit(form);

        expect(await screen.findByText(/Wiek dziecka musi mieścić się w przedziale/i)).toBeInTheDocument();
    });

    test("should submit form and navigate on success", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        ));

        renderWithProviders(<RegisterPage />);

        fireEvent.change(screen.getByPlaceholderText("Imię dziecka"), { target: { value: "Adam" } });
        fireEvent.change(screen.getByPlaceholderText("Nazwisko dziecka"), { target: { value: "Nowak" } });
        fireEvent.change(screen.getByPlaceholderText(/Wiek dziecka/), { target: { value: "10" } });

        const form = screen.getByRole("main").querySelector("form")!;
        fireEvent.submit(form);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/akademia");
        });
    });

    test("should render PDF link", () => {
        renderWithProviders(<RegisterPage />);

        const pdfLink = screen.getByText(/Zobacz regulamin uczestnictwa/i);
        expect(pdfLink).toBeInTheDocument();
        expect(pdfLink.closest('a')).toHaveAttribute("href", "/docs/Regulamin_obozu.pdf");
    });
});