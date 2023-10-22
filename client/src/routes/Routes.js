import { useAuth } from '../hooks';
import { Home, About, Login, SignUp, TodoList } from '../pages';
import { PageLayout } from '../layouts';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../routes';

export const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About />
        }
    ];
    
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute condition={() => token} redirect="/login" />,
            children: [
                {
                    path: "/tasks",
                    element: <TodoList />
                }
            ]
        }
    ];
    
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute condition={() => !token} redirect="/tasks" />,
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
    ];

    const router = createBrowserRouter([
        {
            path: "/",
            element: <PageLayout />,
            children: [
                ...routesForPublic,
                ...routesForNotAuthenticatedOnly,
                ...routesForAuthenticatedOnly,
            ]
        },
        {
            path: "*", // fallback
            element: <Navigate to="/" replace={true} />
        }
    ]);

    return <RouterProvider router={router} />
}