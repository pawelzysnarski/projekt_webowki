import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../components/AuthContext/AuthContext";
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

    test("should render form and handle user data from context", () => {
        renderWithProviders(<RegisterPage />);

        expect(screen.getByText(/Zgłoszenie/i)).toBeDefined();
        const emailInput = screen.getByDisplayValue("test@chaber.pl") as HTMLInputElement;
        expect(emailInput.readOnly).toBe(true);
    });

    test("should show error for invalid age", async () => {
        renderWithProviders(<RegisterPage />);

        fireEvent.change(screen.getByPlaceholderText("Imię dziecka"), { target: { value: "Adam" } });
        fireEvent.change(screen.getByPlaceholderText("Nazwisko dziecka"), { target: { value: "Nowak" } });

        const ageInput = screen.getByPlaceholderText(/Wiek dziecka/);
        fireEvent.change(ageInput, { target: { value: "2" } });

        const form = screen.getByRole("main").querySelector("form");
        if (form) fireEvent.submit(form);

        const errorMsg = await screen.findByText("Wiek dziecka musi mieścić się w przedziale od 4 do 20 lat.");
        expect(errorMsg).toBeDefined();
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

        fireEvent.click(screen.getByText("Wyślij"));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/akademia");
        });
    });
});
