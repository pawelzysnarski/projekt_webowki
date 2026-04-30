import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Ładowanie...</div>;

    if (!user) {
        alert('Musisz się zalogować lub zarejestrować, aby uzyskać dostęp do tej strony.');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}