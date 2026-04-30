// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import * as AuthModule from "../auth/AuthContext";
import Menu from "../components/Menu/Menu";

vi.mock("/logos/chaber.png", () => ({ default: "" }));
vi.mock("../../sponsor.png", () => ({ default: "" }));

describe("Menu Component Tests", () => {
    const mockLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderMenu = (userValue: never) => {
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: userValue,
            logout: mockLogout,
            login: vi.fn()
        } as never);

        return render(
            <MemoryRouter>
                <Menu />
            </MemoryRouter>
        );
    };

    test("should show login button when user is not logged in", () => {
        renderMenu(null);

        expect(screen.getByText(/Zaloguj się/i)).toBeInTheDocument();
        expect(screen.queryByText(/Wyloguj/i)).not.toBeInTheDocument();
    });

    test("should show user name and logout button when logged in", () => {
        renderMenu({ imie: "Robert" });

        expect(screen.getByText("Robert")).toBeInTheDocument();
        expect(screen.getByText(/Wyloguj/i)).toBeInTheDocument();
    });

    test("should call logout function when logout button is clicked", () => {
        renderMenu({ imie: "Robert" });

        fireEvent.click(screen.getByText(/Wyloguj/i));
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test("should render all main navigation links", () => {
        renderMenu(null);

        expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
        expect(screen.getByText(/Terminarz/i)).toBeInTheDocument();
        expect(screen.getByText(/Akademia/i)).toBeInTheDocument();
        expect(screen.getByText(/Sklep/i)).toBeInTheDocument();
        expect(screen.getByText(/Kontakt/i)).toBeInTheDocument();
    });
});