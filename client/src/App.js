import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { TodoList } from './TodoList';
import { About } from './About';
import { Login } from './Login';

export const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Navbar />}>
                        <Route index element={<TodoList />}></Route>
                        <Route path="about" element={<About />}></Route>
                        <Route path="login" element={<Login />}></Route>
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
