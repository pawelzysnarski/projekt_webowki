import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Ładowanie...</div>;
    if (!user) return <Navigate to="/" replace />;

    return <>{children}</>;
}