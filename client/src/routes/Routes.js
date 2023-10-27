import { useAuth } from '../hooks';
import { Home, About, Login, SignUp, TodoList } from '../pages';
import { PageLayout } from '../layouts';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../routes';

export const Routes = () => {
    const { user } = useAuth();

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