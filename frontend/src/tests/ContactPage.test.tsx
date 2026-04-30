// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ContactPage from "../routes/ContactPage/ContactPage";
import * as AuthModule from "../auth/AuthContext";

describe("ContactPage Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: { imie: "Jan", nazwisko: "Kowalski", email: "jan@test.pl" },
        } as never);
    });

    const renderContactPage = () => render(
        <MemoryRouter>
            <ContactPage />
        </MemoryRouter>
    );

    test("should render contact form with user data", () => {
        renderContactPage();

        expect(screen.getByText("Skontaktuj się z nami")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Jan")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Kowalski")).toBeInTheDocument();
        expect(screen.getByDisplayValue("jan@test.pl")).toBeInTheDocument();
    });

    test("should render contact info cards", () => {
        renderContactPage();

        expect(screen.getByText("Adres")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Telefon")).toBeInTheDocument();
        expect(screen.getByText("Godziny otwarcia")).toBeInTheDocument();
    });

    test("should submit form successfully", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) })
        ));

        renderContactPage();

        fireEvent.change(screen.getByPlaceholderText("Temat wiadomości"), { target: { value: "Test" } });
        fireEvent.change(screen.getByPlaceholderText("Treść wiadomości..."), { target: { value: "Testowa wiadomość" } });
        fireEvent.click(screen.getByText("Wyślij wiadomość"));

        expect(await screen.findByText(/Wiadomość wysłana!/i)).toBeInTheDocument();
    });
});