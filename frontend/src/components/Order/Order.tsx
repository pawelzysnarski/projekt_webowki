import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItemWithSize } from '../../types/Product';
import styles from './Order.module.scss';

export default function Order() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartItemWithSize[]>([]);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedCodes, setAppliedCodes] = useState<string[]>([]);
    const [isMember, setIsMember] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [codeMessage, setCodeMessage] = useState('');

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const getOriginalTotal = (): number => {
        let total = 0;
        for (const item of cart) {
            const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price as string);
            total += price * item.quantity;
        }
        return total;
    };

    const getDiscountFromCodes = (): number => {
        return appliedCodes.length * 0.1;
    };

    const getMemberDiscount = (): number => {
        return isMember ? 0.1 : 0;
    };

    const getTotalDiscountPercent = (): number => {
        let totalPercent = 0;
        totalPercent += getDiscountFromCodes();
        totalPercent += getMemberDiscount();
        return Math.min(totalPercent, 0.5);
    };

    const applyDiscount = () => {
        if (discountCode.trim() === '') {
            setCodeMessage('Wpisz kod rabatowy');
            return;
        }

        if (appliedCodes.includes(discountCode.trim())) {
            setCodeMessage('Ten kod został już użyty');
            return;
        }

        if (appliedCodes.length >= 3) {
            setCodeMessage('Maksymalnie 3 kody rabatowe na zamówienie');
            return;
        }

        const newCodes = [...appliedCodes, discountCode.trim()];
        setAppliedCodes(newCodes);
        setDiscountCode('');
        setCodeMessage(`Kod ${discountCode.trim()} zastosowany! +10% zniżki`);
        setTimeout(() => setCodeMessage(''), 3000);
    };

    const getFinalTotal = (): number => {
        const total = getOriginalTotal();
        const discountPercent = getTotalDiscountPercent();
        return total * (1 - discountPercent);
    };

    const getDiscountValue = (): number => {
        const total = getOriginalTotal();
        const discountPercent = getTotalDiscountPercent();
        return total * discountPercent;
    };

    const formatPrice = (price: number): string => {
        return price.toFixed(2).replace('.', ',') + ' zł';
    };

    const generateOrderNumber = (): string => {
        const now = new Date();
        const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0') +
            now.getMilliseconds().toString().padStart(3, '0');
        return timestamp;
    };

    const placeOrder = async () => {
        const orderNumber = generateOrderNumber();
        const originalTotal = getOriginalTotal();
        const discountPercent = getTotalDiscountPercent();
        const finalTotal = getFinalTotal();

        const orderData = {
            orderNumber: `zamowienie_nr_${orderNumber}`,
            date: new Date().toISOString(),
            items: cart.map(item => {
                const itemPrice = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price as string);
                const discountedItemPrice = itemPrice * (1 - discountPercent);
                return {
                    id: item.product.id,
                    name: item.product.name,
                    size: item.size || null,
                    playerName: item.playerName || null,
                    quantity: item.quantity,
                    originalPrice: parseFloat(itemPrice.toFixed(2)),
                    finalPrice: parseFloat((discountedItemPrice * item.quantity).toFixed(2)),
                };
            }),
            originalTotal: parseFloat(originalTotal.toFixed(2)),
            discountValue: parseFloat((originalTotal * discountPercent).toFixed(2)),
            discountPercent: parseFloat((discountPercent * 100).toFixed(1)),
            finalTotal: parseFloat(finalTotal.toFixed(2)),
            discountCodesApplied: appliedCodes.length > 0 ? appliedCodes : null,
            memberDiscountApplied: isMember
        };

        try {
            const response = await fetch('/api/orders/save-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cartUpdated'));
                setOrderPlaced(true);
                setTimeout(() => navigate('/sklep'), 3000);
            } else {
                setCodeMessage('Błąd podczas zapisywania zamówienia');
            }
        } catch (error) {
            console.error('Błąd:', error);
            setCodeMessage('Błąd podczas zapisywania zamówienia');
        }
    };

    if (orderPlaced) {
        return (
            <div className={styles.successPage}>
                <div className={styles.successIcon}>✓</div>
                <h2>Zamówienie zostało złożone!</h2>
                <p>Dziękujemy za zakupy w naszym sklepie.</p>
                <p>Za chwilę wrócisz do sklepu...</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyPage}>
                <h2>Twój koszyk jest pusty</h2>
                <button onClick={() => navigate('/sklep')}>Wróć do sklepu</button>
            </div>
        );
    }

    const originalTotal = getOriginalTotal();
    const finalTotal = getFinalTotal();
    const discountValue = getDiscountValue();
    const discountPercent = getTotalDiscountPercent();

    return (
        <div className={styles.orderContainer}>
            <h1>Zamówienie</h1>

            <div className={styles.cartSummary}>
                <h2>Podsumowanie koszyka</h2>
                {cart.map((item: CartItemWithSize) => {
                    const itemPrice = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price as string);
                    const discountedItemPrice = itemPrice * (1 - discountPercent);
                    return (
                        <div key={item.id} className={styles.orderItem}>
                            <div className={styles.itemDetails}>
                                <p className={styles.itemName}>{item.product.name}</p>
                                {item.size && <p className={styles.itemSize}>Rozmiar: {item.size}</p>}
                                {item.playerName && <p className={styles.itemPlayer}>Nadruk: {item.playerName}</p>}
                                <p className={styles.itemQuantity}>Ilość: {item.quantity}</p>
                            </div>
                            <div className={styles.itemPrice}>
                                {discountPercent > 0 && (
                                    <span className={styles.oldPrice}>{formatPrice(itemPrice)}</span>
                                )}
                                <span className={styles.newPrice}>{formatPrice(discountedItemPrice)}</span>
                                <p className={styles.totalItemPrice}>
                                    {formatPrice(discountedItemPrice * item.quantity)}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <div className={styles.totalSection}>
                    <div className={styles.totalRow}>
                        <span>Suma:</span>
                        {discountPercent > 0 && <span className={styles.oldTotal}>{formatPrice(originalTotal)}</span>}
                        <span className={styles.newTotal}>{formatPrice(finalTotal)}</span>
                    </div>
                    {discountValue > 0 && (
                        <div className={styles.savingsRow}>
                            <span>Oszczędzasz ({Math.round(discountPercent * 100)}%):</span>
                            <span className={styles.savingsAmount}>{formatPrice(discountValue)}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.discountSection}>
                <h3>Kod rabatowy</h3>
                <div className={styles.discountInput}>
                    <input
                        type="text"
                        placeholder="Wpisz kod rabatowy"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button onClick={applyDiscount} disabled={!discountCode.trim() || appliedCodes.length >= 3}>
                        Zastosuj
                    </button>
                </div>
                {codeMessage && <p className={`${styles.discountInfo} ${codeMessage.includes('zastosowany') ? styles.successInfo : styles.errorInfo}`}>{codeMessage}</p>}
                {appliedCodes.length > 0 && (
                    <div className={styles.appliedCodes}>
                        <span>Zastosowane kody: </span>
                        {appliedCodes.map((code, index) => (
                            <span key={index} className={styles.appliedCode}>{code} (+10%)</span>
                        ))}
                        <span className={styles.codesLimit}>{appliedCodes.length}/3</span>
                    </div>
                )}
            </div>

            <div className={styles.memberSection}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isMember}
                        onChange={(e) => setIsMember(e.target.checked)}
                    />
                    <span>Jestem członkiem klubu (10% zniżki)</span>
                </label>
            </div>

            <button className={styles.orderButton} onClick={placeOrder}>
                Złóż zamówienie
            </button>
        </div>
    );
}