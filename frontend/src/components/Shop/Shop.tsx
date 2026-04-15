import { useState, useMemo, useEffect } from 'react';
import styles from './Shop.module.scss';

type Product = {
    id: number;
    name: string;
    price: number | string;
    category: string;
    subcategory: string;
    image: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

const categories = [
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
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/shop')
            .then(res => res.json())
            .then(data => {
                console.log('Produkty z /api/shop:', data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Błąd:', error);
                setLoading(false);
            });
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        const selectedCat = categories.find(cat => cat.id === activeCategory);

        if (selectedCat && selectedCat.id !== 'all') {
            if (selectedCat.subCategory) {
                filtered = filtered.filter(p => p.category === selectedCat.mainCategory && p.subcategory === selectedCat.subCategory);
            } else if (selectedCat.mainCategory) {
                filtered = filtered.filter(p => p.category === selectedCat.mainCategory);
            }
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
        }

        return filtered;
    }, [searchTerm, activeCategory, products]);

    const formatPrice = (price: number | string) => {
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        return numericPrice.toFixed(2).replace('.', ',') + ' zł';
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
        return cart.reduce((total, item) => {
            const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price;
            return total + (price * item.quantity);
        }, 0);
    };

    if (loading) {
        return <div className={styles.loading}>Ładowanie produktów...</div>;
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
                                                <p className={styles.cartItemName}>{item.product.name}</p>
                                                <p className={styles.cartItemPrice}>{formatPrice(item.product.price)}</p>
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
                            {filteredProducts.map(product => (
                                <div className={styles.shopItem} key={product.id}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={`products/${product.image}`}
                                            alt=""
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{product.name}</p>
                                        <p className={styles.itemPrice}>{formatPrice(product.price)}</p>
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