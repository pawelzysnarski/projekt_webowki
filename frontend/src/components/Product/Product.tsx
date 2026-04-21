import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProduct from '../../queries/productQuery';
import useShop from '../../queries/shopQuery';
import usePlayers from '../../queries/playersQuery';
import type { Product, CartItemWithSize } from '../../types/Product';
import type { Zawodnik } from '../../types/Zawodnik';
import styles from './Product.module.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState<CartItemWithSize[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [selectedView, setSelectedView] = useState<'front' | 'back'>('front');
    const [selectedPlayer, setSelectedPlayer] = useState<string>('');
    const [customName, setCustomName] = useState('');
    const [customNumber, setCustomNumber] = useState('');

    const { data: product, isLoading, error } = useProduct(id);
    const { data: allProducts } = useShop();
    const { data: players } = usePlayers();

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

    const isClothing = (): boolean => {
        if (!product) return false;
        const cat = product.category?.toLowerCase() || '';
        return cat === 'spodenki' || cat === 'koszulki' || cat === 'komplety';
    };

    const showBackView = (): boolean => {
        if (!product) return false;
        const cat = product.category?.toLowerCase() || '';
        const name = product.name.toLowerCase();
        const isMainBear = name === 'misiek' && !name.includes('bramkarz') && !name.match(/\d+/);
        return cat === 'koszulki' || cat === 'komplety' || (cat === 'pluszaki' && !isMainBear);
    };

    const showPersonalization = (): boolean => {
        if (!product) return false;
        const cat = product.category?.toLowerCase() || '';
        const name = product.name.toLowerCase();
        const isMainBear = name === 'misiek' && !name.includes('bramkarz') && !name.match(/\d+/);
        return cat === 'koszulki' || cat === 'komplety' || (cat === 'pluszaki' && !isMainBear);
    };

    const getFilteredPlayers = (): Zawodnik[] => {
        if (!players || !product) return [];

        const name = product.name.toLowerCase();
        const isGoalkeeperProduct = name.includes('bramkarz');

        if (isGoalkeeperProduct) {
            return players.filter((p: Zawodnik) => p.Pozycja === 'Bramkarz');
        } else {
            return players.filter((p: Zawodnik) => p.Pozycja !== 'Bramkarz');
        }
    };

    const getPlayerDisplayName = (playerValue: string): string => {
        if (!playerValue) return '';
        const match = playerValue.match(/^(\d+)_(.+)$/);
        if (match) {
            return `${match[2]} ${match[1]}`;
        }
        return playerValue;
    };

    const getBackImage = (): string => {
        if (!product) return '';
        const baseName = product.image.replace('.png', '').replace('.jpeg', '').replace('.jpg', '');
        return `/products/${baseName}_tył.jpg`;
    };

    const getProductImage = (): string => {
        if (!product) return '';
        if (selectedView === 'back' && showBackView()) {
            return getBackImage();
        }
        return `/products/${product.image}`;
    };

    const getThumbnailImage = (view: 'front' | 'back'): string => {
        if (!product) return '';
        if (view === 'back' && showBackView()) {
            return getBackImage();
        }
        return `/products/${product.image}`;
    };

    const getDisplayText = (): { name: string; number: string } => {
        if (selectedPlayer) {
            const match = selectedPlayer.match(/^(\d+)_(.+)$/);
            if (match) {
                return { name: match[2].toUpperCase(), number: match[1] };
            }
        }
        if (customName && customNumber) {
            return { name: customName.toUpperCase(), number: customNumber };
        }
        return { name: '', number: '' };
    };

    const extractNumber = (name: string): string => {
        const match = name.match(/\d+/);
        return match ? match[0] : '';
    };

    const getFontSize = (text: string): string => {
        const length = text.length;
        if (length <= 8) return '2.5rem';
        if (length <= 9) return '2.3rem';
        if (length <= 10) return '2rem';
        if (length <= 12) return '1.8rem';
        if (length <= 13) return '1.5rem';
        if (length <= 15) return '1.3rem';
        if (length <= 18) return '1.1rem';
        if (length <= 20) return '1rem';
        return '1.8rem';
    };

    const getNumberFontSize = (number: string): string => {
        const numLength = number.length;
        if (numLength === 1) return '10rem';
        if (numLength === 2) return '10rem';
        return '1.5rem';
    };

    const [customNameError, setCustomNameError] = useState('');
    const [customNumberError, setCustomNumberError] = useState('');

    const validateCustomName = (name: string): boolean => {
        if (name.length > 20) {
            setCustomNameError('Nazwisko jest zbyt długie (max 20 znaków)');
            return false;
        }
        const lettersOnly = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$/;
        if (name !== '' && !lettersOnly.test(name)) {
            setCustomNameError('Nazwisko może zawierać tylko litery');
            return false;
        }
        setCustomNameError('');
        return true;
    };

    const validateCustomNumber = (number: string): boolean => {
        if (number === '') {
            setCustomNumberError('');
            return true;
        }
        const digitsOnly = /^\d+$/;
        if (!digitsOnly.test(number)) {
            setCustomNumberError('Numer może zawierać tylko cyfry');
            return false;
        }
        const num = parseInt(number);
        if (num < 1 || num > 99) {
            setCustomNumberError('Numer musi być między 1 a 99');
            return false;
        }
        setCustomNumberError('');
        return true;
    };

    const getSimilarProducts = (): Product[] => {
        if (!allProducts || !product) return [];

        const productName = product.name.toLowerCase();
        const productCategory = product.category?.toLowerCase() || '';
        const productNumber = extractNumber(productName);
        const isGoalkeeper = productName.includes('bramkarz');

        const allProductsList = [...allProducts];

        if (productCategory === 'spodenki') {
            const result: Product[] = [];

            for (const p of allProductsList) {
                if (p.id === product.id) continue;

                const pName = p.name.toLowerCase();
                const pCat = p.category?.toLowerCase() || '';
                const pNumber = extractNumber(pName);
                const pIsGoalkeeper = pName.includes('bramkarz');

                if (pCat !== 'spodenki' && pCat !== 'komplety') continue;

                if (isGoalkeeper) {
                    if (pCat === 'spodenki') {
                        if (pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (!pIsGoalkeeper && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                    if (pCat === 'komplety') {
                        if (pName.includes('bramkarz') && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                } else {
                    if (pCat === 'spodenki') {
                        if (!pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (pIsGoalkeeper) {
                            result.push(p);
                        }
                    }
                    if (pCat === 'komplety') {
                        if (!pName.includes('bramkarz') && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                }
            }

            const uniqueIds = new Set();
            return result.filter(item => {
                if (uniqueIds.has(item.id)) return false;
                uniqueIds.add(item.id);
                return true;
            }).slice(0, 6);
        }

        if (productCategory === 'koszulki') {
            const result: Product[] = [];

            for (const p of allProductsList) {
                if (p.id === product.id) continue;

                const pName = p.name.toLowerCase();
                const pCat = p.category?.toLowerCase() || '';
                const pNumber = extractNumber(pName);
                const pIsGoalkeeper = pName.includes('bramkarz');

                if (pCat !== 'koszulki' && pCat !== 'komplety') continue;

                if (isGoalkeeper) {
                    if (pCat === 'koszulki') {
                        if (pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (!pIsGoalkeeper && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                    if (pCat === 'komplety') {
                        if (pName.includes('bramkarz') && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                } else {
                    if (pCat === 'koszulki') {
                        if (!pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (pIsGoalkeeper) {
                            result.push(p);
                        }
                    }
                    if (pCat === 'komplety') {
                        if (!pName.includes('bramkarz') && pNumber === productNumber) {
                            result.push(p);
                        }
                    }
                }
            }

            const uniqueIds = new Set();
            return result.filter(item => {
                if (uniqueIds.has(item.id)) return false;
                uniqueIds.add(item.id);
                return true;
            }).slice(0, 6);
        }

        if (productCategory === 'komplety') {
            const result: Product[] = [];

            for (const p of allProductsList) {
                if (p.id === product.id) continue;

                const pName = p.name.toLowerCase();
                const pCat = p.category?.toLowerCase() || '';
                const pNumber = extractNumber(pName);
                const pIsGoalkeeper = pName.includes('bramkarz');

                if (pCat !== 'komplety' && pCat !== 'spodenki' && pCat !== 'koszulki') continue;

                if (isGoalkeeper) {
                    if (pCat === 'komplety') {
                        if (pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (!pIsGoalkeeper) {
                            result.push(p);
                        }
                    }
                    if ((pCat === 'spodenki' || pCat === 'koszulki') && pIsGoalkeeper && pNumber === productNumber) {
                        result.push(p);
                    }
                } else {
                    if (pCat === 'komplety') {
                        if (!pIsGoalkeeper && pNumber !== productNumber) {
                            result.push(p);
                        }
                        if (pIsGoalkeeper) {
                            result.push(p);
                        }
                    }
                    if ((pCat === 'spodenki' || pCat === 'koszulki') && !pIsGoalkeeper && pNumber === productNumber) {
                        result.push(p);
                    }
                }
            }

            const uniqueIds = new Set();
            return result.filter(item => {
                if (uniqueIds.has(item.id)) return false;
                uniqueIds.add(item.id);
                return true;
            }).slice(0, 7);
        }

        if (productCategory === 'pluszaki') {
            const result: Product[] = [];
            const isMainBear = productName === 'misiek' && !productName.includes('bramkarz') && !productName.match(/\d+/);

            for (const p of allProductsList) {
                if (p.id === product.id) continue;

                const pName = p.name.toLowerCase();
                const pCat = p.category?.toLowerCase() || '';
                const pNumber = extractNumber(pName);
                const pIsGoalkeeper = pName.includes('bramkarz');

                if (pCat !== 'pluszaki') continue;

                if (isMainBear) {
                    if (pName.includes('bramkarz') || pName.match(/\d+/)) {
                        result.push(p);
                    }
                } else if (isGoalkeeper) {
                    if (pName === 'misiek' && !pName.includes('bramkarz')) {
                        result.push(p);
                    }
                    if (pIsGoalkeeper && pNumber !== productNumber) {
                        result.push(p);
                    }
                    if (!pIsGoalkeeper && pName.match(/\d+/) && pNumber === productNumber) {
                        result.push(p);
                    }
                } else {
                    if (pName === 'misiek' && !pName.includes('bramkarz') && !productName.match(/\d+/)) {
                        result.push(p);
                    }
                    if (!pIsGoalkeeper && pName.match(/\d+/) && pNumber !== productNumber) {
                        result.push(p);
                    }
                    if (pIsGoalkeeper && pNumber === productNumber) {
                        result.push(p);
                    }
                }
            }

            const uniqueIds = new Set();
            return result.filter(item => {
                if (uniqueIds.has(item.id)) return false;
                uniqueIds.add(item.id);
                return true;
            }).slice(0, 6);
        }

        return [];
    };

    const similarProducts = getSimilarProducts();

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

    const clearCart = (): void => {
        localStorage.removeItem('cart');
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

    const addToCart = (): void => {
        if (!product) return;

        if (isClothing() && !selectedSize) {
            alert('Wybierz rozmiar');
            return;
        }

        let printText = '';
        if (selectedPlayer) {
            printText = getPlayerDisplayName(selectedPlayer);
        } else if (customName && customNumber) {
            printText = `${customNumber} ${customName.toUpperCase()}`;
        }

        const cartItem: CartItemWithSize = {
            id: isClothing() ? `${product.id}_${selectedSize}_${selectedPlayer}_${customName}_${customNumber}` : `${product.id}`,
            product,
            size: selectedSize,
            quantity,
            playerName: printText || undefined,
        };

        const existingCart: CartItemWithSize[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = existingCart.findIndex((item: CartItemWithSize) => item.id === cartItem.id);

        if (existingIndex !== -1) {
            existingCart[existingIndex].quantity += quantity;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        window.dispatchEvent(new Event('cartUpdated'));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',') + ' zł';
    };

    if (isLoading) return <div className={styles.loading}>Ładowanie produktu...</div>;
    if (error) return <div className={styles.error}>Błąd: {error.message}</div>;
    if (!product) return <div className={styles.error}>Produkt nie znaleziony</div>;

    const numericPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price as string);
    const filteredPlayers = getFilteredPlayers();
    const displayText = getDisplayText();

    return (
        <div className={styles.productPage}>
            <div className={styles.headerTop}>
                <button className={styles.backButton} onClick={() => navigate('/sklep')}>
                    ← Powrót do sklepu
                </button>
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

            {showCart && (
                <div className={styles.cart}>
                    <div className={styles.cartContent}>
                        <div className={styles.cartHeader}>
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
                                                <div
                                                    className={styles.cartItemImage}
                                                    onClick={() => {
                                                        setShowCart(false);
                                                        navigate(`/product/${item.product.id}`);
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img src={`/products/${item.product.image}`} alt={item.product.name} />
                                                </div>
                                                <div className={styles.cartItemInfo}>
                                                    <p
                                                        className={styles.cartItemName}
                                                        onClick={() => {
                                                            setShowCart(false);
                                                            navigate(`/product/${item.product.id}`);
                                                        }}
                                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    >
                                                        {item.product.name}
                                                    </p>
                                                    {item.size && <p className={styles.cartItemSize}>Rozmiar: {item.size}</p>}
                                                    {item.playerName && <p className={styles.cartItemPlayer}>Nadruk: {item.playerName}</p>}
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
                                    <button className={styles.clearCartButton} onClick={clearCart}>
                                        🗑️ Opróżnij koszyk
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <div className={styles.imageWrapper}>
                        <img src={getProductImage()} alt={product.name} />
                        {selectedView === 'back' && showBackView() && (displayText.name || displayText.number) && (
                            <div className={styles.textOverlay}>
                                <div className={styles.playerName} style={{ fontSize: getFontSize(displayText.name) }}>{displayText.name}</div>
                                <div className={styles.playerNumber} style={{ fontSize: getNumberFontSize(displayText.number) }}>{displayText.number}</div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productPrice}>{formatPrice(numericPrice)}</p>

                    {isClothing() && (
                        <div className={styles.sizeSection}>
                            <h3>Rozmiar</h3>
                            <div className={styles.sizeButtons}>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeButton} ${selectedSize === size ? styles.active : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.quantitySection}>
                        <h3>Ilość</h3>
                        <div className={styles.quantityControls}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    {showPersonalization() && (
                        <div className={styles.personalizationSection}>
                            <h3>Personalizacja</h3>

                            <div className={styles.playerSelectWrapper}>
                                <label>Wybierz zawodnika:</label>
                                <select
                                    className={styles.playerSelect}
                                    value={selectedPlayer}
                                    onChange={(e) => {
                                        setSelectedPlayer(e.target.value);
                                        if (e.target.value) {
                                            setCustomName('');
                                            setCustomNumber('');
                                        }
                                    }}
                                >
                                    <option value="">Brak nadruku</option>
                                    {filteredPlayers.map((player: Zawodnik) => (
                                        <option key={player.ID} value={`${player.Numer}_${player.Nazwisko.toLowerCase()}`}>
                                            {player.Numer}. {player.Imie} {player.Nazwisko}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.customWrapper}>
                                <p className={styles.customOr}>lub</p>
                                <label>Własny nadruk:</label>
                                <input
                                    type="text"
                                    placeholder="Nazwisko"
                                    className={styles.customInput}
                                    value={customName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateCustomName(value)) {
                                            setCustomName(value);
                                            if (value) setSelectedPlayer('');
                                        }
                                    }}
                                />
                                {customNameError && <p className={styles.errorMessage}>{customNameError}</p>}

                                <input
                                    type="text"
                                    placeholder="Numer"
                                    className={styles.customInput}
                                    value={customNumber}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (validateCustomNumber(value)) {
                                            setCustomNumber(value);
                                            if (value) setSelectedPlayer('');
                                        }
                                    }}
                                />
                                {customNumberError && <p className={styles.errorMessage}>{customNumberError}</p>}
                            </div>
                        </div>
                    )}

                    {showBackView() && (
                        <div className={styles.viewSelector}>
                            <button
                                className={`${styles.viewButton} ${selectedView === 'front' ? styles.activeView : ''}`}
                                onClick={() => setSelectedView('front')}
                            >
                                <img src={getThumbnailImage('front')} alt="przód" />
                                <span>Przód</span>
                            </button>
                            <button
                                className={`${styles.viewButton} ${selectedView === 'back' ? styles.activeView : ''}`}
                                onClick={() => setSelectedView('back')}
                            >
                                <img src={getThumbnailImage('back')} alt="tył" />
                                <span>Tył</span>
                            </button>
                        </div>
                    )}

                    <button className={styles.addToCartButton} onClick={addToCart}>
                        Dodaj do koszyka
                    </button>

                    {addedToCart && (
                        <div className={styles.successMessage}>
                            Produkt dodany do koszyka!
                        </div>
                    )}
                </div>
            </div>

            {similarProducts.length > 0 && (
                <div className={styles.similarProducts}>
                    <h2>Podobne produkty</h2>
                    <div className={styles.similarGrid}>
                        {similarProducts.map(similar => {
                            const similarPrice = typeof similar.price === 'number' ? similar.price : parseFloat(similar.price as string);
                            return (
                                <div
                                    key={similar.id}
                                    className={styles.similarItem}
                                    onClick={() => navigate(`/product/${similar.id}`)}
                                >
                                    <img src={`/products/${similar.image}`} alt={similar.name} />
                                    <p className={styles.similarName}>{similar.name}</p>
                                    <p className={styles.similarPrice}>{formatPrice(similarPrice)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}