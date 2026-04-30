import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Product from '../components/Product/Product';
import * as productQuery from '../queries/productQuery';
import * as shopQuery from '../queries/shopQuery';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
});

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '1' })
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

describe('Product Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        queryClient.clear();
    });

    test('should render loading state', () => {
        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null
        } as never);

        renderWithProviders(<Product />);
        expect(screen.getByText('Ładowanie produktu...')).toBeInTheDocument();
    });

    test('should render product details after loading', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };
        const mockProducts = [mockProduct];

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
            expect(screen.getByText('300,00 zł')).toBeInTheDocument();
        });
    });

    test('should select size', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('M')).toBeInTheDocument();
        });

        const sizeButton = screen.getByText('M');
        fireEvent.click(sizeButton);
    });

    test('should increase quantity', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
        });

        const plusButton = screen.getAllByText('+')[0];
        fireEvent.click(plusButton);

        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('should decrease quantity', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument();
        });

        const minusButton = screen.getAllByText('-')[0];
        fireEvent.click(minusButton);

        expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('should add product to cart', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('Dodaj do koszyka')).toBeInTheDocument();
        });

        const sizeButton = screen.getByText('M');
        fireEvent.click(sizeButton);

        const addButton = screen.getByText('Dodaj do koszyka');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText('Produkt dodany do koszyka!')).toBeInTheDocument();
        });
    });

    test('should open cart modal', async () => {
        const mockProduct = { id: 1, name: 'Koszulka Meczowa', price: 300, category: 'koszulki', subcategory: 'pilkarz', image: 'koszulka1.jpg' };

        vi.spyOn(productQuery, 'default').mockReturnValue({
            data: mockProduct,
            isLoading: false,
            error: null
        } as never);
        vi.spyOn(shopQuery, 'default').mockReturnValue({
            data: [mockProduct],
            isLoading: false,
            error: null
        } as never);

        renderWithProviders(<Product />);

        await waitFor(() => {
            expect(screen.getByText('Koszulka Meczowa')).toBeInTheDocument();
        });

        const cartButton = screen.getByText('🛒 Koszyk');
        fireEvent.click(cartButton);

        await waitFor(() => {
            expect(screen.getByText('Twój koszyk')).toBeInTheDocument();
        });
    });
});