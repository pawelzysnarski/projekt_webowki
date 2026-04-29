import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import * as AuthModule from "../components/AuthContext/AuthContext";
import Menu from "../components/Menu/Menu";

const mockLogout = vi.fn();
vi.mock("/logos/chaber.png", () => ({ default: "" }));
vi.mock("../../sponsor.png", () => ({ default: "" }));
describe("Menu Component Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderMenu = (userValue: any) => {
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: userValue,
            logout: mockLogout,
            login: vi.fn()
        } as any);

        return render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
    };

    test("should show login button when user is not logged in", () => {
        renderMenu(null);

        expect(screen.getByText(/Zaloguj się/i)).toBeTruthy();
        expect(screen.queryByText(/Wyloguj/i)).toBeNull();
    });

    test("should show user name and logout button when logged in", () => {
        renderMenu({ imie: "Robert" });

        expect(screen.getByText("Robert")).toBeTruthy();
        expect(screen.getByText(/Wyloguj/i)).toBeTruthy();
    });

    test("should call logout function when logout button is clicked", () => {
        renderMenu({ imie: "Robert" });

        fireEvent.click(screen.getByText(/Wyloguj/i));
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test("should render all main navigation links", () => {
        renderMenu(null);

        expect(screen.getByText(/Strona główna/i)).toBeTruthy();
        expect(screen.getByText(/Terminarz/i)).toBeTruthy();
        expect(screen.getByText(/Akademia/i)).toBeTruthy();
        expect(screen.getByText(/Sklep/i)).toBeTruthy();
        expect(screen.getByText(/Kontakt/i)).toBeTruthy();
    });
});
