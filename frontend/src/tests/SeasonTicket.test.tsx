// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import SeasonTicket from "../components/SeasonTicket/SeasonTicket";
import * as AuthModule from "../auth/AuthContext";

describe("SeasonTicket Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: { imie: "Jan", nazwisko: "Kowalski", email: "jan@test.pl", id: 1 },
        } as never);
        vi.stubGlobal('fetch', vi.fn());
    });

    const renderSeasonTicket = () => render(
        <MemoryRouter>
            <SeasonTicket />
        </MemoryRouter>
    );

    test("should render all ticket tiers", () => {
        renderSeasonTicket();

        expect(screen.getByText("Brązowy Łoś")).toBeInTheDocument();
        expect(screen.getByText("Srebrny Jeż")).toBeInTheDocument();
        expect(screen.getByText("Złoty Jeleń")).toBeInTheDocument();
    });

    test("should show benefits section", () => {
        renderSeasonTicket();

        expect(screen.getByText("Wszystkie mecze")).toBeInTheDocument();
        expect(screen.getByText("Twoje miejsce")).toBeInTheDocument();
        expect(screen.getByText("Zniżki w sklepie")).toBeInTheDocument();
    });

    test("should show FAQ section", () => {
        renderSeasonTicket();

        expect(screen.getByText("Najczęściej zadawane pytania")).toBeInTheDocument();
        expect(screen.getByText(/Czy muszę kupić karnet?/i)).toBeInTheDocument();
    });

    test("should require terms acceptance before purchase", () => {
        window.alert = vi.fn();
        renderSeasonTicket();

        fireEvent.click(screen.getByText("Kup karnet teraz"));

        expect(window.alert).toHaveBeenCalledWith("Zaakceptuj regulamin, aby kontynuować");
    });

    test("should open regulamin in new tab", () => {
        renderSeasonTicket();

        const links = screen.getAllByText("regulamin");
        expect(links[0].closest('a')).toHaveAttribute("href", "/regulamin.html");
        expect(links[0].closest('a')).toHaveAttribute("target", "_blank");
    });

    test("should render payment toggle buttons", () => {
        renderSeasonTicket();

        expect(screen.getByText("Płatność jednorazowa")).toBeInTheDocument();
        expect(screen.getByText("Płatność miesięczna")).toBeInTheDocument();
    });

    test("should render link to single ticket", () => {
        renderSeasonTicket();

        const links = screen.getAllByText("Kup bilet jednorazowy");
        expect(links.length).toBeGreaterThanOrEqual(1);
        expect(links[0].closest('a')).toHaveAttribute("href", "/bilety/1/brazowy_los");
    });
});