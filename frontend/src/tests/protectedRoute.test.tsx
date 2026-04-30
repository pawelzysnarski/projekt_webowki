// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ProtectedRoute from "../auth/ProtectedRoute";
import * as AuthModule from "../auth/AuthContext";

describe("ProtectedRoute Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should show loading when isLoading is true", () => {
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: null,
            isLoading: true,
        } as never);

        render(
            <MemoryRouter>
                <ProtectedRoute><div>Chroniona treść</div></ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Ładowanie...")).toBeInTheDocument();
        expect(screen.queryByText("Chroniona treść")).not.toBeInTheDocument();
    });

    test("should redirect when user is not logged in", () => {
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: null,
            isLoading: false,
        } as never);

        render(
            <MemoryRouter initialEntries={['/sklep']}>
                <ProtectedRoute><div>Chroniona treść</div></ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.queryByText("Chroniona treść")).not.toBeInTheDocument();
    });

    test("should render children when user is logged in", () => {
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: { imie: "Jan", email: "jan@test.pl" },
            isLoading: false,
        } as never);

        render(
            <MemoryRouter>
                <ProtectedRoute><div>Chroniona treść</div></ProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Chroniona treść")).toBeInTheDocument();
    });
});