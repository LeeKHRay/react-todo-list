import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Home, About, Login, SignUp, TodoList } from '../pages';
import { PageLayout } from '../layouts';
import { ProtectedRoute } from '../routes';
import { useAuthContext } from '../contexts/AuthContext';

export const Routes = () => {
    const { user } = useAuthContext();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/",
                    element: <ProtectedRoute canAccess={!!user} redirect="/login" />,
                    children: [
                        {
                            path: "/tasks",
                            element: <TodoList />
                        }
                    ]
                },
                {
                    path: "/",
                    element: <ProtectedRoute canAccess={!user} redirect="/tasks" />,
                    children: [
                        {
                            path: "/signup",
                            element: <SignUp />
                        },
                        {
                            path: "/login",
                            element: <Login />
                        }
                    ]
                }
            ]
        },
        {
            path: "*", // fallback
            element: <Navigate to="/" replace={true} />
        }
    ]);

    return <RouterProvider router={router} />
}