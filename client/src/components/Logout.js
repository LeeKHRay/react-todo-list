import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";

export const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();
    
    const handleClick = () => {
        logout();
        navigate("/", { replace: true });
    }

    return (
        <Button variant="link" className="text-decoration-none text-light ps-0 ps-lg-2" onClick={handleClick}>Logout</Button>
    )
}