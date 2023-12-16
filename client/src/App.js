import './App.css';
import { Routes } from './routes';
import { AuthProvider } from './contexts';

export const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
