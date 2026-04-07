import { useState, useMemo } from 'react';
import styles from './Shop.module.scss';

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    alt: string;
};

type CartItem = {
    product: Product;
    quantity: number;
};

const products: Product[] = [
    { id: 1, name: 'spodenki1', price: 89.99, category: 'spodenki', image: 'spodenki1.png', alt: 'Spodenki piłkarskie model 1' },
    { id: 2, name: 'spodenki2', price: 89.99, category: 'spodenki', image: 'spodenki2.jpg', alt: 'Spodenki piłkarskie model 2' },
    { id: 3, name: 'spodenki3', price: 89.99, category: 'spodenki', image: 'spodenki3.png', alt: 'Spodenki piłkarskie model 3' },
    { id: 4, name: 'koszulka1', price: 129.99, category: 'koszulki', image: 'koszulka1.jpg', alt: 'Koszulka piłkarska model 1' },
    { id: 5, name: 'koszulka2', price: 129.99, category: 'koszulki', image: 'koszulka2.jpg', alt: 'Koszulka piłkarska model 2' },
    { id: 6, name: 'koszulka3', price: 129.99, category: 'koszulki', image: 'koszulka3.jpg', alt: 'Koszulka piłkarska model 3' },
    { id: 7, name: 'komplet1', price: 199.99, category: 'komplety', image: 'komplet1.jpg', alt: 'Kompletny strój kibica zestaw 1' },
    { id: 8, name: 'komplet2', price: 199.99, category: 'komplety', image: 'komplet2.jpg', alt: 'Kompletny strój kibica zestaw 2' },
    { id: 9, name: 'komplet3', price: 199.99, category: 'komplety', image: 'komplet3.jpg', alt: 'Kompletny strój kibica zestaw 3' },
    { id: 10, name: 'misiek', price: 49.99, category: 'pluszaki', image: 'misiek.jpg', alt: 'Pluszowa maskotka miś' },
    { id: 11, name: 'misiek1', price: 59.99, category: 'pluszaki', image: 'misiek1.jpg', alt: 'Pluszowa maskotka miś z szalikiem' },
    { id: 12, name: 'misiek2', price: 59.99, category: 'pluszaki', image: 'misiek2.jpg', alt: 'Pluszowa maskotka miś z czapką' },
    { id: 13, name: 'misiek3', price: 59.99, category: 'pluszaki', image: 'misiek3.jpg', alt: 'Pluszowa maskotka miś z piłką' },
    { id: 14, name: 'kubek', price: 29.99, category: 'akcesoria', image: 'kubek.jpg', alt: 'Kubek kibica z logo klubu' },
];

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

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
        }

        return filtered;
    }, [searchTerm, activeCategory]);

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
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

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
                                            alt={product.alt}
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