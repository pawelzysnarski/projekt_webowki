import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Order from '../components/Order/Order';
import * as AuthModule from '../auth/AuthContext';

const mockLogout = vi.fn();
const mockLogin = vi.fn();
const mockRegister = vi.fn();

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <MemoryRouter>
            {ui}
        </MemoryRouter>
    );
};

describe('Order Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(AuthModule, 'useAuth').mockReturnValue({
            user: null,
            login: mockLogin,
            logout: mockLogout,
            register: mockRegister
        } as never);
    });

    test('should show empty cart message', () => {
        renderWithRouter(<Order />);
        expect(screen.getByText('Twój koszyk jest pusty')).toBeInTheDocument();
    });

    test('should display cart items', () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 2 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
        expect(screen.getByText('Ilość: 2')).toBeInTheDocument();
    });

    test('should calculate total correctly', () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 2 },
            { id: '2', product: { id: 2, name: 'Spodenki Meczowe', price: 200, category: 'spodenki', image: 'spodenki1.png' }, size: 'L', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        expect(screen.getByText('800,00 zł')).toBeInTheDocument();
    });

    test('should apply discount code', async () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        const discountInput = screen.getByPlaceholderText('Wpisz kod rabatowy');
        fireEvent.change(discountInput, { target: { value: 'Chaber#1' } });

        const applyButton = screen.getByText('Zastosuj');
        fireEvent.click(applyButton);

        await waitFor(() => {
            expect(screen.getByText(/Kod Chaber#1 zastosowany!/)).toBeInTheDocument();
        });
    });

    test('should reject invalid discount code', async () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        const discountInput = screen.getByPlaceholderText('Wpisz kod rabatowy');
        fireEvent.change(discountInput, { target: { value: 'ZLYKOD' } });

        const applyButton = screen.getByText('Zastosuj');
        fireEvent.click(applyButton);

        await waitFor(() => {
            expect(screen.getByText('Nieprawidłowy kod rabatowy')).toBeInTheDocument();
        });
    });

    test('should prevent using same discount code twice', async () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        const discountInput = screen.getByPlaceholderText('Wpisz kod rabatowy');
        fireEvent.change(discountInput, { target: { value: 'Chaber#1' } });

        const applyButton = screen.getByText('Zastosuj');
        fireEvent.click(applyButton);

        await waitFor(() => {
            expect(screen.getByText(/Kod Chaber#1 zastosowany!/)).toBeInTheDocument();
        });

        const messageElement = screen.queryByText('Kod został już użyty');
        expect(messageElement).not.toBeInTheDocument();
    });

    test('should place order successfully', async () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true })
        });
        vi.stubGlobal('fetch', mockFetch);

        renderWithRouter(<Order />);

        const orderButton = screen.getByText('Złóż zamówienie');
        fireEvent.click(orderButton);

        await waitFor(() => {
            expect(screen.getByText('Zamówienie zostało złożone!')).toBeInTheDocument();
        });
    });

    test('should show error when order fails', async () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
        vi.stubGlobal('fetch', mockFetch);

        renderWithRouter(<Order />);

        const orderButton = screen.getByText('Złóż zamówienie');
        fireEvent.click(orderButton);

        await waitFor(() => {
            expect(screen.getByText('Błąd podczas zapisywania zamówienia')).toBeInTheDocument();
        });
    });

    test('should return to shop', () => {
        const mockCart = [
            { id: '1', product: { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', image: 'koszulka1.jpg' }, size: 'M', quantity: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCart));

        renderWithRouter(<Order />);

        const backButton = screen.getByText('← Powrót do sklepu');
        expect(backButton).toBeInTheDocument();
    });
});