import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import styles from './SeasonTicket.module.scss';

interface TicketBenefit {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface TicketTier {
    id: string;
    name: string;
    price: number;
    pricePerMonth: number;
    color: string;
    badge?: string;
    benefits: string[];
    recommended?: boolean;
}

const SeasonTicket: React.FC = () => {
    const { user } = useAuth();
    const [selectedTier, setSelectedTier] = useState<string>('standard');
    const [selectedPayment, setSelectedPayment] = useState<'oneTime' | 'installment'>('oneTime');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const ticketTiers: TicketTier[] = [
        {
            id: 'basic',
            name: 'Brązowy Łoś',
            price: 299,
            pricePerMonth: 29,
            color: '#cd7f32',
            benefits: [
                'Wejście na wszystkie mecze ligowe',
                'Miejsce w sektorze A lub C',
                '10% zniżki w klubowym sklepie',
                'Newsletter z informacjami o klubie'
            ]
        },
        {
            id: 'standard',
            name: 'Srebrny Jeż',
            price: 599,
            pricePerMonth: 59,
            color: '#a8a8a8',
            badge: 'Najpopularniejszy',
            benefits: [
                'Wejście na wszystkie mecze ligowe i pucharowe',
                'Miejsce w sektorze B (lepsza widoczność)',
                '20% zniżki w klubowym sklepie',
                'Imienny karnet z grawerem',
                'Priorytetowy dostęp do biletów na wydarzenia specjalne',
                'Zaproszenie na trening drużyny'
            ],
            recommended: true
        },
        {
            id: 'premium',
            name: 'Złoty Jeleń',
            price: 999,
            pricePerMonth: 99,
            color: '#d4af37',
            badge: 'VIP',
            benefits: [
                'Wejście na wszystkie mecze ligowe, pucharowe i sparingi',
                'Miejsce w sektorze D (loża VIP)',
                '30% zniżki w klubowym sklepie',
                'Imienny karnet z grawerem i etui',
                'Priorytetowy dostęp do biletów na wydarzenia specjalne',
                'Zaproszenie na trening drużyny i spotkanie z zawodnikami',
                'Darmowy program meczowy',
                'Bufet VIP przed meczem',
                'Parking VIP'
            ]
        }
    ];

    const benefits: TicketBenefit[] = [
        { id: '1', title: 'Wszystkie mecze', description: 'Dostęp do wszystkich spotkań ligowych i pucharowych w sezonie', icon: '⚽' },
        { id: '2', title: 'Twoje miejsce', description: 'Zarezerwowane miejsce na każdy mecz - bez kolejek', icon: '💺' },
        { id: '3', title: 'Zniżki w sklepie', description: 'Oszczędzaj na klubowych gadżetach i odzieży', icon: '🛍️' },
        { id: '4', title: 'Wydarzenia ekskluzywne', description: 'Spotkania z zawodnikami i treningi drużyny', icon: '🎯' }
    ];

    const handleBuyTicket = async () => {
        if (!agreedToTerms) {
            alert('Zaakceptuj regulamin, aby kontynuować');
            return;
        }

        const selectedTicket = ticketTiers.find(t => t.id === selectedTier);
        if (!selectedTicket) return;

        const price = selectedPayment === 'oneTime' ? selectedTicket.price : selectedTicket.pricePerMonth * 12;

        try {
            const response = await fetch('/api/tickets/season-ticket/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: user?.imie || 'Kibic',
                    lastName: user?.nazwisko || 'Testowy',
                    email: user?.email || 'kibic@test.pl',
                    ticketType: selectedTier,
                    price: price,
                    userId: user?.id || null
                })
            });

            const data = await response.json();

            if (data.success) {
                const znizka = selectedTicket.name === 'Złoty Jeleń' ? '30%' : selectedTicket.name === 'Srebrny Jeż' ? '20%' : '10%';
                alert(`Dziękujemy za zakup karnetu ${selectedTicket.name}!\nKod karnetu: ${data.seasonTicket.kod_karnetu}\nZarezerwowano ${data.occupiedSeats.length} miejsc.\nZaloguj się ponownie aby aktywować zniżkę ${znizka}.`);
            } else {
                alert('Błąd zakupu karnetu');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Błąd zakupu karnetu');
        }
    };

    return (
        <div className={styles.seasonTicket}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Karnet Sezonowy
                        <span className={styles.heroSubtitle}>Chaber Pobiedziska 2026</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        Bądź częścią naszej rodziny! Z nami przeżyjesz każdy mecz od pierwszej do ostatniej minuty.
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}><span className={styles.statValue}>20+</span><span className={styles.statLabel}>Meczów w sezonie</span></div>
                        <div className={styles.stat}><span className={styles.statValue}>-30%</span><span className={styles.statLabel}>Taniej niż bilety</span></div>
                        <div className={styles.stat}><span className={styles.statValue}>1000+</span><span className={styles.statLabel}>Zadowolonych kibiców</span></div>
                    </div>
                </div>
            </section>

            <section className={styles.alternative}>
                <div className={styles.container}>
                    <div className={styles.alternativeCard}>
                        <div className={styles.alternativeContent}>
                            <span className={styles.alternativeIcon}>🎟️</span>
                            <h3 className={styles.alternativeTitle}>Nie chcesz kupować karnetu?</h3>
                            <p className={styles.alternativeDescription}>Możesz kupić pojedynczy bilet na wybrane spotkanie.</p>
                            <div className={styles.alternativeFeatures}>
                                <div className={styles.feature}><span>✓</span> Kupuj tylko mecze, które Cię interesują</div>
                                <div className={styles.feature}><span>✓</span> Wybierz dokładnie miejsce na stadionie</div>
                                <div className={styles.feature}><span>✓</span> Brak zobowiązań na cały sezon</div>
                            </div>
                            <Link to="/bilety/1/brazowy_los" className={styles.alternativeButton}>Kup bilet jednorazowy →</Link>
                        </div>
                        <div className={styles.alternativeComparison}>
                            <div className={styles.comparisonItem}><span className={styles.comparisonLabel}>Karnet:</span><span className={styles.comparisonValue}>od 299 zł / sezon</span></div>
                            <div className={styles.comparisonDivider}>vs</div>
                            <div className={styles.comparisonItem}><span className={styles.comparisonLabel}>Bilet:</span><span className={styles.comparisonValue}>od 50 zł / mecz</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.benefits}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Dlaczego warto?</h2>
                    <div className={styles.benefitsGrid}>
                        {benefits.map((benefit) => (
                            <div key={benefit.id} className={styles.benefitCard}>
                                <div className={styles.benefitIcon}>{benefit.icon}</div>
                                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                <p className={styles.benefitDescription}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.tiers}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Wybierz swój karnet</h2>
                    <div className={styles.paymentToggle}>
                        <button className={`${styles.paymentOption} ${selectedPayment === 'oneTime' ? styles.active : ''}`} onClick={() => setSelectedPayment('oneTime')}>Płatność jednorazowa</button>
                        <button className={`${styles.paymentOption} ${selectedPayment === 'installment' ? styles.active : ''}`} onClick={() => setSelectedPayment('installment')}>Płatność miesięczna</button>
                    </div>
                    <div className={styles.tiersGrid}>
                        {ticketTiers.map((tier) => (
                            <div key={tier.id} className={`${styles.tierCard} ${selectedTier === tier.id ? styles.selected : ''} ${tier.recommended ? styles.recommended : ''}`} onClick={() => setSelectedTier(tier.id)}>
                                {tier.badge && <div className={styles.tierBadge} style={{ background: tier.color }}>{tier.badge}</div>}
                                {tier.recommended && <div className={styles.recommendedBadge}>⭐ Polecany</div>}
                                <h3 className={styles.tierName}>{tier.name}</h3>
                                <div className={styles.tierPrice}>
                                    <span className={styles.priceAmount}>{selectedPayment === 'oneTime' ? tier.price : tier.pricePerMonth}</span>
                                    <span className={styles.pricePeriod}>{selectedPayment === 'oneTime' ? 'zł / sezon' : 'zł / miesiąc'}</span>
                                </div>
                                <ul className={styles.tierBenefits}>
                                    {tier.benefits.map((benefit, index) => (
                                        <li key={index}><span className={styles.checkmark}>✓</span>{benefit}</li>
                                    ))}
                                </ul>
                                <button className={styles.selectButton} style={{ background: tier.color }} onClick={(e) => { e.stopPropagation(); setSelectedTier(tier.id); }}>Wybierz {tier.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Nie czekaj!</h2>
                        <p className={styles.ctaDescription}>Liczba karnetów jest ograniczona.</p>
                        <div className={styles.ctaButtons}>
                            <button className={styles.ctaButton} onClick={handleBuyTicket}>Kup karnet teraz</button>
                            <Link to="/bilety/1/brazowy_los" className={styles.ctaButtonSecondary}>Kup bilet jednorazowy</Link>
                        </div>
                        <div className={styles.terms}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                                <span>Akceptuję <a href="/regulamin.html" target="_blank" rel="noopener noreferrer">regulamin</a> i <a href="/regulamin.html" target="_blank" rel="noopener noreferrer">politykę prywatności</a></span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.faq}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Najczęściej zadawane pytania</h2>
                    <div className={styles.faqGrid}>
                        <div className={styles.faqItem}><h4>Czy muszę kupić karnet?</h4><p>Nie! Możesz kupić pojedynczy bilet w zakładce "Bilety".</p></div>
                        <div className={styles.faqItem}><h4>Kiedy zaczyna obowiązywać karnet?</h4><p>Od pierwszego meczu sezonu 2026.</p></div>
                        <div className={styles.faqItem}><h4>Czy mogę zwrócić karnet?</h4><p>Tak, w ciągu 14 dni od zakupu.</p></div>
                        <div className={styles.faqItem}><h4>Czy karnet jest imienny?</h4><p>Srebrny Jeż i Złoty Jeleń tak. Brązowy Łoś może być transferowany.</p></div>
                        <div className={styles.faqItem}><h4>Gdzie kupię bilet na pojedynczy mecz?</h4><p>W zakładce "Bilety".</p></div>
                        <div className={styles.faqItem}><h4>Jak odbiorę karnet?</h4><p>W klubowej kasie lub wysyłką.</p></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SeasonTicket;