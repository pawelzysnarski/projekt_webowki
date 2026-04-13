import { useState, useMemo } from 'react';
import styles from '../Shop.module.scss';
import { useQuery } from '@tanstack/react-query';

type Product = {
    id: number;
    nazwa: string;
    cena: number;
    kategoria: string;
    obrazek: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

const getProducts = async () => {
    const res = await fetch('/api/shop/products');
    if (!res.ok) throw new Error('Problem z pobraniem produktów');
    return res.json();
};

const categories = [
    { id: 'all', name: 'Wszystkie' },
    { id: 'spodenki', name: 'Spodenki' },
    { id: 'koszulki', name: 'Koszulki' },
    { id: 'komplety', name: 'Komplety' },
    { id: 'pluszaki', name: 'Pluszaki' },
    { id: 'akcesoria', name: 'Akcesoria' },
];

export default function Shop() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        if (activeCategory !== 'all') {
            filtered = filtered.filter((p: Product) => p.kategoria === activeCategory);
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((p: Product) => p.nazwa.toLowerCase().includes(term));
        }

        return filtered;
    }, [searchTerm, activeCategory, products]);

    const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',') + ' zł';
    };

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.product.cena * item.quantity), 0);
    };

    if (isLoading) return <div className={styles.Shop}>Ładowanie produktów...</div>;
    if (isError) return <div className={styles.Shop}>Błąd: {error.message}</div>;

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
                            {getCartItemCount() > 0 && (
                                <span className={styles.cartCount}>{getCartItemCount()}</span>
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
                                    {cart.map(item => (
                                        <div key={item.product.id} className={styles.cartItem}>
                                            <div className={styles.cartItemInfo}>
                                                <p className={styles.cartItemName}>{item.product.nazwa}</p>
                                                <p className={styles.cartItemPrice}>{formatPrice(item.product.cena)}</p>
                                            </div>
                                            <div className={styles.cartItemControls}>
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                                <button onClick={() => removeFromCart(item.product.id)} className={styles.removeItem}>Usuń</button>
                                            </div>
                                        </div>
                                    ))}
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
                            {categories.map(cat => (
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
                </aside>

                <div className={styles.mainContent}>
                    <div className={styles.searchSection}>
                        <div className={styles.searchWrapper}>
                            <input
                                type="text"
                                placeholder="Szukaj produktu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                            <button onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
                                Wyświetl wszystkie
                            </button>
                        </div>
                    ) : (
                        <div className={styles.shopGrid}>
                            {filteredProducts.map((product: Product) => (
                                <div className={styles.shopItem} key={product.id}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={`products/${product.obrazek}`}
                                            alt={product.nazwa}
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{product.nazwa}</p>
                                        <p className={styles.itemPrice}>{formatPrice(product.cena)}</p>
                                        <button
                                            className={styles.buyButton}
                                            onClick={() => addToCart(product)}
                                        >
                                            Dodaj do koszyka
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}