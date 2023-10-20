import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './layouts';
import { About, Login, SignUp, TodoList } from './pages';

export const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route index element={<TodoList />}></Route>
                        <Route path="about" element={<About />}></Route>
                        <Route path="signup" element={<SignUp />}></Route>
                        <Route path="login" element={<Login />}></Route>
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
