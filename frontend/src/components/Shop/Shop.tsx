import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useShop from '../../queries/shopQuery';
import type { Product, Category } from '../../types/Shop';
import type { CartItemWithSize } from '../../types/Product';
import styles from './Shop.module.scss';

const categories: Category[] = [
    { id: 'all', name: 'Wszystkie', mainCategory: null, subCategory: null },
    { id: 'spodenki', name: 'Spodenki', mainCategory: 'spodenki', subCategory: null },
    { id: 'spodenki_pilkarz', name: 'Spodenki piłkarskie', mainCategory: 'spodenki', subCategory: 'pilkarz' },
    { id: 'spodenki_bramkarz', name: 'Spodenki bramkarskie', mainCategory: 'spodenki', subCategory: 'bramkarz' },
    { id: 'koszulki', name: 'Koszulki', mainCategory: 'koszulki', subCategory: null },
    { id: 'koszulki_pilkarz', name: 'Koszulki piłkarskie', mainCategory: 'koszulki', subCategory: 'pilkarz' },
    { id: 'koszulki_bramkarz', name: 'Koszulki bramkarskie', mainCategory: 'koszulki', subCategory: 'bramkarz' },
    { id: 'komplety', name: 'Komplety', mainCategory: 'komplety', subCategory: null },
    { id: 'komplety_pilkarz', name: 'Komplety piłkarskie', mainCategory: 'komplety', subCategory: 'pilkarz' },
    { id: 'komplety_bramkarz', name: 'Komplety bramkarskie', mainCategory: 'komplety', subCategory: 'bramkarz' },
    { id: 'pluszaki', name: 'Pluszaki', mainCategory: 'pluszaki', subCategory: null },
    { id: 'akcesoria', name: 'Akcesoria', mainCategory: 'akcesoria', subCategory: null },
];

export default function Shop() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [cart, setCart] = useState<CartItemWithSize[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [priceMin, setPriceMin] = useState<number>(0);
    const [priceMax, setPriceMax] = useState<number>(500);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState<number>(0);

    const { data: products, isLoading, error } = useShop();

    useEffect(() => {
        const loadCart = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart: CartItemWithSize[] = JSON.parse(savedCart);
                setCart(parsedCart);
                const count = parsedCart.reduce((total: number, item: CartItemWithSize) => total + item.quantity, 0);
                setCartCount(count);
            }
        };

        loadCart();

        const handleCartUpdate = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart: CartItemWithSize[] = JSON.parse(savedCart);
                setCart(parsedCart);
                const count = parsedCart.reduce((total: number, item: CartItemWithSize) => total + item.quantity, 0);
                setCartCount(count);
            } else {
                setCart([]);
                setCartCount(0);
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const maxPriceValue = useMemo(() => {
        if (!products || products.length === 0) return 500;
        let max = 0;
        for (const p of products) {
            const price = typeof p.price === 'number' ? p.price : parseFloat(p.price as string);
            if (price > max) max = price;
        }
        return max;
    }, [products]);

    const minPriceValue = useMemo(() => {
        if (!products || products.length === 0) return 0;
        let min = Infinity;
        for (const p of products) {
            const price = typeof p.price === 'number' ? p.price : parseFloat(p.price as string);
            if (price < min) min = price;
        }
        return min;
    }, [products]);

    useEffect(() => {
        setPriceMin(minPriceValue);
        setPriceMax(maxPriceValue);
    }, [minPriceValue, maxPriceValue]);

    const handlePriceMinChange = (value: number) => {
        const newMin = Math.max(minPriceValue, Math.min(value, priceMax - 1));
        setPriceMin(newMin);
    };

    const handlePriceMaxChange = (value: number) => {
        const newMax = Math.min(maxPriceValue, Math.max(value, priceMin + 1));
        setPriceMax(newMax);
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = [...products];

        const selectedCat = categories.find((cat: Category) => cat.id === activeCategory);

        if (selectedCat && selectedCat.id !== 'all') {
            if (selectedCat.subCategory) {
                filtered = filtered.filter((p: Product) => p.category === selectedCat.mainCategory && p.subcategory === selectedCat.subCategory);
            } else if (selectedCat.mainCategory) {
                filtered = filtered.filter((p: Product) => p.category === selectedCat.mainCategory);
            }
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((p: Product) => p.name.toLowerCase().includes(term));
        }

        filtered = filtered.filter((p: Product) => {
            const price = typeof p.price === 'number' ? p.price : parseFloat(p.price as string);
            return price >= priceMin && price <= priceMax;
        });

        if (sortOrder === 'asc') {
            filtered.sort((a: Product, b: Product) => {
                const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price as string);
                const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price as string);
                return priceA - priceB;
            });
        } else if (sortOrder === 'desc') {
            filtered.sort((a: Product, b: Product) => {
                const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price as string);
                const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price as string);
                return priceB - priceA;
            });
        }

        return filtered;
    }, [searchTerm, activeCategory, products, sortOrder, priceMin, priceMax]);

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',') + ' zł';
    };

    const removeFromCart = (itemId: string): void => {
        const existingCart: CartItemWithSize[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const filteredCart = existingCart.filter((item: CartItemWithSize) => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(filteredCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const updateQuantity = (itemId: string, newQuantity: number): void => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        const existingCart: CartItemWithSize[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = existingCart.map((item: CartItemWithSize) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const getCartTotal = (): number => {
        let total = 0;
        for (const item of cart) {
            const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price as string);
            total += price * item.quantity;
        }
        return total;
    };

    const resetFilters = () => {
        setSearchTerm('');
        setActiveCategory('all');
        setPriceMin(minPriceValue);
        setPriceMax(maxPriceValue);
        setSortOrder('default');
    };

    if (isLoading) {
        return <div className={styles.loading}>Ładowanie produktów...</div>;
    }

    if (error) {
        return <div className={styles.error}>Błąd: {error.message}</div>;
    }

    return (
        <main className={styles.Shop}>
            <div className={styles.shopHeader}>
                <div className={styles.headerTop}>
                    <div>
                        <h2>Sklep Kibica</h2>
                        <p>Oficjalne akcesoria klubu Chaber Pobiedziska</p>
                    </div>
                    <div className={styles.cartIconContainer}>
                        <button
                            className={styles.cartButton}
                            onClick={() => setShowCart(!showCart)}
                        >
                            🛒 Koszyk
                            {cartCount > 0 && (
                                <span className={styles.cartCount}>{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {showCart && (
                <div className={styles.cartModal}>
                    <div className={styles.cartModalContent}>
                        <div className={styles.cartModalHeader}>
                            <h3>Twój koszyk</h3>
                            <button onClick={() => setShowCart(false)} className={styles.closeCart}>✕</button>
                        </div>
                        <div className={styles.cartItems}>
                            {cart.length === 0 ? (
                                <p className={styles.emptyCart}>Koszyk jest pusty</p>
                            ) : (
                                <>
                                    {cart.map((item: CartItemWithSize) => {
                                        const itemPrice = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price as string);
                                        return (
                                            <div key={item.id} className={styles.cartItem}>
                                                <div className={styles.cartItemImage}>
                                                    <img src={`/products/${item.product.image}`} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                                </div>
                                                <div className={styles.cartItemInfo}>
                                                    <p className={styles.cartItemName}>{item.product.name}</p>
                                                    {item.size && <p className={styles.cartItemSize}>Rozmiar: {item.size}</p>}
                                                    <p className={styles.cartItemPrice}>{formatPrice(itemPrice)}</p>
                                                </div>
                                                <div className={styles.cartItemControls}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeItem}>Usuń</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className={styles.cartTotal}>
                                        <strong>Razem: {formatPrice(getCartTotal())}</strong>
                                    </div>
                                    <button className={styles.checkoutButton}>Złóż zamówienie</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.shopLayout}>
                <aside className={styles.sidebar}>
                    <div className={styles.categoriesSection}>
                        <h3>Kategorie</h3>
                        <ul className={styles.categoryList}>
                            {categories.map((cat: Category) => (
                                <li key={cat.id}>
                                    <button
                                        className={`${styles.categoryButton} ${activeCategory === cat.id ? styles.active : ''}`}
                                        onClick={() => setActiveCategory(cat.id)}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.filtersSection}>
                        <button
                            className={styles.filterToggle}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? '▲ Filtry' : '▼ Filtry'}
                        </button>

                        {showFilters && (
                            <>
                                <div className={styles.sortSection}>
                                    <h3>Sortowanie</h3>
                                    <select
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className={styles.sortSelect}
                                    >
                                        <option value="default">Domyślne</option>
                                        <option value="asc">Cena rosnąco</option>
                                        <option value="desc">Cena malejąco</option>
                                    </select>
                                </div>

                                <div className={styles.priceRangeSection}>
                                    <h3>Zakres cen</h3>
                                    <div className={styles.priceInputs}>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={priceMin}
                                            onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                                            className={styles.priceInput}
                                            min={minPriceValue}
                                            max={priceMax - 1}
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={priceMax}
                                            onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                                            className={styles.priceInput}
                                            min={priceMin + 1}
                                            max={maxPriceValue}
                                        />
                                    </div>
                                    <div className={styles.priceSliderContainer}>
                                        <input
                                            type="range"
                                            min={minPriceValue}
                                            max={maxPriceValue}
                                            value={priceMin}
                                            onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                                            className={styles.priceSlider}
                                        />
                                        <input
                                            type="range"
                                            min={minPriceValue}
                                            max={maxPriceValue}
                                            value={priceMax}
                                            onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                                            className={styles.priceSliderMin}
                                        />
                                    </div>
                                    <div className={styles.priceLabels}>
                                        <span>{formatPrice(priceMin)}</span>
                                        <span>{formatPrice(priceMax)}</span>
                                    </div>
                                </div>

                                <button
                                    className={styles.resetFiltersButton}
                                    onClick={resetFilters}
                                >
                                    Resetuj filtry
                                </button>
                            </>
                        )}
                    </div>
                </aside>

                <div className={styles.mainContent}>
                    <div className={styles.searchSection}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Szukaj produktu..."
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                            {searchTerm && (
                                <button
                                    className={styles.clearSearch}
                                    onClick={() => setSearchTerm('')}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className={styles.resultsInfo}>
                            Znaleziono {filteredProducts.length} produktów
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>Nie znaleziono produktów</p>
                            <button onClick={resetFilters}>
                                Wyświetl wszystkie
                            </button>
                        </div>
                    ) : (
                        <div className={styles.shopGrid}>
                            {filteredProducts.map((product: Product) => {
                                const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price as string);
                                return (
                                    <div
                                        className={styles.shopItem}
                                        key={product.id}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={`/products/${product.image}`}
                                                alt=""
                                                className={styles.productImage}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <p className={styles.itemName}>{product.name}</p>
                                            <p className={styles.itemPrice}>{formatPrice(productPrice)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}