import { NavLink } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import { useAuthContext } from "../contexts/AuthContext";

export const Home = () => {
    const { user, isValidatedToken } = useAuthContext();

    if (!isValidatedToken) {
        return <Spinner animation="border" />;
    }

    return (
        <>
            <h1>Todo List</h1>

            {
                user ?
                <h4>Hi {user.username}, view or create your tasks in <NavLink to="/tasks">here</NavLink></h4> :
                <h4><NavLink to="/login">Login</NavLink> or <NavLink to="/signup">create an account</NavLink> to use the to-do list</h4>
            }
        </>
    )
};