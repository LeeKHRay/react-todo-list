import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './layouts';
import { Home, About, Login, SignUp, TodoList } from './pages';
import { useState, useEffect } from 'react';
import { AuthProvider } from './providers/AuthProvider';

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route index element={<Home />}></Route>
                        <Route path="about" element={<About />}></Route>
                        <Route path="tasks" element={<TodoList />}></Route>
                        <Route path="signup" element={<SignUp />}></Route>
                        <Route path="login" element={<Login />}></Route>
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
