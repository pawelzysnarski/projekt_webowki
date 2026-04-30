// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Login from "../components/Login/Login";
import * as AuthModule from "../auth/AuthContext";

describe("Login Component Tests", () => {
    const mockLogin = vi.fn();
    const mockRegister = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            login: mockLogin,
            register: mockRegister,
            user: null,
        } as never);
    });

    const renderLogin = () => render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    test("should render login form by default", () => {
        renderLogin();

        expect(screen.getByText("Zaloguj się")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Hasło")).toBeInTheDocument();
        expect(screen.queryByPlaceholderText("Imię")).not.toBeInTheDocument();
    });

    test("should switch to register form", () => {
        renderLogin();

        fireEvent.click(screen.getByText("Zarejestruj się"));

        expect(screen.getByText("Zarejestruj się")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Imię")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Nazwisko")).toBeInTheDocument();
    });

    test("should call login on submit", async () => {
        mockLogin.mockResolvedValue(true);

        renderLogin();

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.pl" } });
        fireEvent.change(screen.getByPlaceholderText("Hasło"), { target: { value: "test123" } });
        fireEvent.click(screen.getByRole("button", { name: "Zaloguj" }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("test@test.pl", "test123");
        });
    });

    test("should call register on submit", async () => {
        mockRegister.mockResolvedValue(true);

        renderLogin();
        fireEvent.click(screen.getByText("Zarejestruj się"));

        fireEvent.change(screen.getByPlaceholderText("Imię"), { target: { value: "Jan" } });
        fireEvent.change(screen.getByPlaceholderText("Nazwisko"), { target: { value: "Kowalski" } });
        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jan@test.pl" } });
        fireEvent.change(screen.getByPlaceholderText("Hasło"), { target: { value: "test123" } });
        fireEvent.click(screen.getByRole("button", { name: "Zarejestruj" }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith("Jan", "Kowalski", "jan@test.pl", "test123");
        });
    });

    test("should show error when login fails", async () => {
        mockLogin.mockResolvedValue(false);

        renderLogin();

        fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.pl" } });
        fireEvent.change(screen.getByPlaceholderText("Hasło"), { target: { value: "wrong" } });
        fireEvent.click(screen.getByRole("button", { name: "Zaloguj" }));

        expect(await screen.findByText("Nieprawidłowy email lub hasło")).toBeInTheDocument();
    });
});