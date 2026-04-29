import { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import styles from './Login.module.scss';

export default function Login() {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        let success: boolean;
        if (isRegister) {
            success = await register(imie, nazwisko, email, haslo);
        } else {
            success = await login(email, haslo);
        }

        if (!success) {
            setError(isRegister ? 'Błąd rejestracji' : 'Nieprawidłowy email lub hasło');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2>{isRegister ? 'Zarejestruj się' : 'Zaloguj się'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                placeholder="Imię"
                                value={imie}
                                onChange={e => setImie(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                value={nazwisko}
                                onChange={e => setNazwisko(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={haslo}
                        onChange={e => setHaslo(e.target.value)}
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit">
                        {isRegister ? 'Zarejestruj' : 'Zaloguj'}
                    </button>
                </form>
                <p className={styles.switch}>
                    {isRegister ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
                    <button onClick={() => { setIsRegister(!isRegister); setError(''); }}>
                        {isRegister ? 'Zaloguj się' : 'Zarejestruj się'}
                    </button>
                </p>
            </div>
        </div>
    );
}