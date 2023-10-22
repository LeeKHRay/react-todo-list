import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes } from './routes';
import { AuthProvider } from './providers/AuthProvider';

export const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
