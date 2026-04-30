import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Shop from '../components/Shop/Shop';
import * as shopQuery from '../queries/shopQuery';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn()
    };
});

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </QueryClientProvider>
    );
};

describe('Shop Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        queryClient.clear();
    });

    test('should render loading state', () => {
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null
        } as never);

        renderWithProviders(<Shop />);
        expect(screen.getByText('Ładowanie produktów...')).toBeInTheDocument();
    });

    test('should render products after loading', async () => {
        const mockProducts = [
            { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' },
            { id: 2, name: 'Spodenki Meczowe', price: 200, category: 'spodenki', subcategory: 'pilkarz', image: 'spodenki1.png' }
        ];

        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
            expect(screen.getByText('Spodenki Meczowe')).toBeInTheDocument();
        });
    });

    test('should filter products by search term', async () => {
        const mockProducts = [
            { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' },
            { id: 2, name: 'Spodenki Meczowe', price: 200, category: 'spodenki', subcategory: 'pilkarz', image: 'spodenki1.png' }
        ];

        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Szukaj produktu...');
        fireEvent.change(searchInput, { target: { value: 'Koszulka' } });

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
            expect(screen.queryByText('Spodenki Meczowe')).toBeNull();
        });
    });

    test('should open cart modal', async () => {
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        const cartButton = screen.getByText('🛒 Koszyk');
        fireEvent.click(cartButton);

        await waitFor(() => {
            expect(screen.getByText('Twój koszyk')).toBeInTheDocument();
        });
    });

    test('should show empty cart message', async () => {
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        const cartButton = screen.getByText('🛒 Koszyk');
        fireEvent.click(cartButton);

        await waitFor(() => {
            expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument();
        });
    });

    test('should close cart modal', async () => {
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        const cartButton = screen.getByText('🛒 Koszyk');
        fireEvent.click(cartButton);

        await waitFor(() => {
            expect(screen.getByText('Twój koszyk')).toBeInTheDocument();
        });

        const closeButton = screen.getByText('✕');
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Twój koszyk')).toBeNull();
        });
    });

    test('should filter by category', async () => {
        const mockProducts = [
            { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' }
        ];

        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
        });

        const spodenkiButton = screen.getByText('Spodenki');
        fireEvent.click(spodenkiButton);
    });

    test('should clear search', async () => {
        const mockProducts = [
            { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' },
            { id: 2, name: 'Spodenki Meczowe', price: 200, category: 'spodenki', subcategory: 'pilkarz', image: 'spodenki1.png' }
        ];

        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Shop />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Szukaj produktu...');
        fireEvent.change(searchInput, { target: { value: 'Koszulka' } });

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
            expect(screen.queryByText('Spodenki Meczowe')).toBeNull();
        });

        const clearButton = screen.getByText('✕');
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
            expect(screen.getByText('Spodenki Meczowe')).toBeInTheDocument();
        });
    });
});