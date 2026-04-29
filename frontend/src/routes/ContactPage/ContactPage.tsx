import { useState } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import styles from "./ContactPage.module.scss";

export default function ContactPage() {
    const { user } = useAuth();
    const [imie, setImie] = useState(user?.imie || "");
    const [nazwisko, setNazwisko] = useState(user?.nazwisko || "");
    const [email, setEmail] = useState(user?.email || "");
    const [temat, setTemat] = useState("");
    const [wiadomosc, setWiadomosc] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Wysyłanie...");

        const res = await fetch("/api/contact/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imie, nazwisko, email, temat, wiadomosc })
        });

        if (res.ok) {
            setStatus("Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe.");
            setTemat("");
            setWiadomosc("");
        } else {
            setStatus("Błąd podczas wysyłania.");
        }
    };

    return (
        <div className={styles.contactPage}>
            <div className={styles.contactContainer}>
                <div className={styles.formSection}>
                    <h2>Skontaktuj się z nami</h2>
                    <p className={styles.formDesc}>Masz pytania? Chcesz zostać sponsorem? Napisz do nas!</p>
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <div className={styles.formRow}>
                            <input
                                type="text"
                                placeholder="Imię"
                                value={imie}
                                onChange={(e) => setImie(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                value={nazwisko}
                                onChange={(e) => setNazwisko(e.target.value)}
                                required
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Temat wiadomości"
                            value={temat}
                            onChange={(e) => setTemat(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Treść wiadomości..."
                            value={wiadomosc}
                            onChange={(e) => setWiadomosc(e.target.value)}
                            required
                            rows={6}
                        />
                        <button type="submit">Wyślij wiadomość</button>
                        {status && <p className={`${styles.statusMessage} ${status.includes('Wysłana') ? styles.success : styles.error}`}>{status}</p>}
                    </form>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>📍</div>
                        <h3>Adres</h3>
                        <p>Arena imienia Tomasza Piotrkowskiego</p>
                        <p>ul. Sportowa 67</p>
                        <p>62-010 Pobiedziska</p>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>📧</div>
                        <h3>Email</h3>
                        <a href="mailto:kontakt.chaber@pobiedziska.pl">kontakt.chaber@pobiedziska.pl</a>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>📞</div>
                        <h3>Telefon</h3>
                        <p>+48 123 456 789</p>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>🕐</div>
                        <h3>Godziny otwarcia</h3>
                        <p>Poniedziałek - Piątek</p>
                        <p>9:00 - 17:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}