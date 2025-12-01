// routes/PrivateRoute.tsx
// Componente que protege rutas que requieren autenticación

import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Props del componente PrivateRoute
 */
interface PrivateRouteProps {
    children: ReactNode;
}

/**
 * Componente que protege rutas privadas
 * Si no hay usuario autenticado, redirige a /login
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras carga, mostrar un spinner o null
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderizar el children (la ruta protegida)
  return <>{children}</>;
};

export default PrivateRoute;
