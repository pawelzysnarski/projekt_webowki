import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { Product as ProductType, CartItemWithSize } from '../../types/Product';
import styles from './Product.module.scss';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await fetch(`/api/shop/${id}`);
            if (!res.ok) throw new Error('Problem z pobraniem produktu');
            const data = await res.json();
            return data as ProductType;
        },
        enabled: !!id,
    });

    const { data: allProducts } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await fetch('/api/shop');
            if (!res.ok) throw new Error('Problem z pobraniem produktów');
            const data = await res.json();
            return data as ProductType[];
        },
    });

    const isClothing = (): boolean => {
        if (!product) return false;
        const cat = product.category?.toLowerCase() || '';
        return cat === 'spodenki' || cat === 'koszulki' || cat === 'komplety';
    };

    const extractNumber = (name: string): string => {
        const match = name.match(/\d+/);
        return match ? match[0] : '';
    };

    const getSimilarProducts = (): ProductType[] => {
        if (!allProducts || !product) return [];

        const productName = product.name.toLowerCase();
        const productCategory = product.category?.toLowerCase() || '';
        const productNumber = extractNumber(productName);
        const isGoalkeeper = productName.includes('bramkarz');

        const allProductsList = [...allProducts];

        if (productCategory === 'spodenki') {
            const result: ProductType[] = [];

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
            const result: ProductType[] = [];

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
            const result: ProductType[] = [];

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
            const result: ProductType[] = [];
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

    const addToCart = (): void => {
        if (!product) return;

        if (isClothing() && !selectedSize) {
            alert('Wybierz rozmiar');
            return;
        }

        const cartItem: CartItemWithSize = {
            id: isClothing() ? `${product.id}_${selectedSize}` : `${product.id}`,
            product,
            size: selectedSize,
            quantity,
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

    return (
        <div className={styles.productPage}>
            <button className={styles.backButton} onClick={() => navigate('/sklep')}>
                ← Powrót do sklepu
            </button>

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <img src={`/products/${product.image}`} alt={product.name} />
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