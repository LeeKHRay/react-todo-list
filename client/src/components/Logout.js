import Button from "react-bootstrap/Button";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    
    const handleClick = async () => {
        setToken(null);
        navigate("/", { replace: true })
    }

    return (
        <Button variant="link" className="text-decoration-none text-light" onClick={handleClick}>Logout</Button>
    )
}