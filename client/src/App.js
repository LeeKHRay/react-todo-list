import './App.css';
import { Routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';

export const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
