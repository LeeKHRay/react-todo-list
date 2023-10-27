import Button from "react-bootstrap/Button";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleClick = () => {
        logout();
        navigate("/", { replace: true });
    }

    return (
        <Button variant="link" className="text-decoration-none text-light" onClick={handleClick}>Logout</Button>
    )
}