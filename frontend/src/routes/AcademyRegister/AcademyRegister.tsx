import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AcademyRegister.module.scss';

export default function RegisterPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/academyRegister', {
            method: 'POST',
            headers:{ 'Content-Type':' application/json'},
            body: JSON.stringify({
                ID_Punktu: Number(id),
                Imie: e.target.imie.value,
                Nazwisko: e.target.nazwisko.value,
                Wiek: Number(e.target.wiek.value),
                Email: e.target.email.value
            })
        });

        if (res.ok) navigate('/akademia');
        else alert('Błąd zapisu');
        setLoading(false);
    };

    return (
        <main className={styles.RegisterPage}>
            <div className={styles.FormCard}>
                <h1>Zgłoszenie</h1>
                <form onSubmit={handleSubmit}>
                    <input name="imie" placeholder="Imię dziecka" required />
                    <input name="nazwisko" placeholder="Nazwisko dziecka" required />
                    <input name="wiek" type="number" placeholder="Wiek dziecka" required />
                    <input name="email" type="email" placeholder="E-mail" required />
                    <button disabled={loading}>{loading ? '...' : 'Wyślij'}</button>
                </form>
            </div>
        </main>
    );
}
