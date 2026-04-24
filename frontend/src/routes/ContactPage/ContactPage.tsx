import { useState } from "react";
import styles from "./ContactPage.module.scss"

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setStatus("Wysyłanie...");

        const res = await fetch("/api/mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, message })
        });

        if (res.ok) {
            setStatus("Wiadomość wysłana!");
            setEmail("");
            setMessage("");
        } else {
            setStatus("Błąd podczas wysyłania.");
        }
    };

    return (
        <div className={styles.FormPage}>
            <form onSubmit={handleSubmit} className={styles.Formularz}>
                <input
                    type="email"
                    placeholder="Twój email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Wpisz treść wiadomości"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit">Wyślij</button>

                {status && <p>{status}</p>}
            </form>
            <div>
                <h3>Dane kontaktowe</h3>
                <div>
                    <h4>E-mail:</h4>
                <a href="mailto:kontakt.chaber@pobiedziska.pl">kontakt.chaber@pobiedziska.pl</a>
                </div>
            </div>
        </div>
    );
}
