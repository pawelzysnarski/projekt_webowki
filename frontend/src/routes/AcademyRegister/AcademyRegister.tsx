import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AcademyRegister.module.scss';
import {useAuth} from "../../auth/AuthContext";

export default function RegisterPage() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email] = useState(user?.email || "");
    const formatName = (name: string) => {
        if (!name) return "";
        const trimmed = name.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const rawImie = formData.get('imie') as string;
        const rawNazwisko = formData.get('nazwisko') as string;
        const rawWiek = Number(formData.get('wiek'));
        const email = formData.get('email') as string;

        const imie = formatName(rawImie);
        const nazwisko = formatName(rawNazwisko);

        if (rawWiek < 4 || rawWiek > 20) {
            setError("Wiek dziecka musi mieścić się w przedziale od 4 do 20 lat.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/academyRegister', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ID_Punktu: Number(id),
                    Imie: imie,
                    Nazwisko: nazwisko,
                    Wiek: rawWiek,
                    Email: email
                })
            });

            if (res.ok) {
                navigate('/akademia');
            } else {
                const data = await res.json();
                setError(data.error || 'Błąd zapisu danych na serwerze.');
            }
        } catch (err) {
            setError(`Wystąpił problem z połączeniem. ${err}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className={styles.RegisterPage}>
            <div className={styles.FormCard}>
                <h1>Zgłoszenie</h1>
                <form onSubmit={handleSubmit}>
                    <input name="imie" placeholder="Imię dziecka" required />
                    <input name="nazwisko" placeholder="Nazwisko dziecka" required />
                    <input name="wiek" type="number" placeholder="Wiek dziecka (4-20)" required min="4" max="20" />
                    <input name="email" type="email" value={email} required readOnly/>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Wysyłanie...' : 'Wyślij'}
                    </button>
                </form>
                <a href="/docs/Regulamin_obozu.pdf" className={styles.pdfLink} target="_blank" rel="noopener noreferrer">
                    📄 Zobacz regulamin uczestnictwa
                </a>
            </div>
        </main>
    );
}
