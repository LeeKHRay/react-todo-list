import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value);
        setError("");
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
        setError("");
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/users/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const { token } = await response.json();
            console.log(token);
            // navigate("/");
        }
        else {
            const { message } = await response.json();
            setError(message);
        }
    }

    return (
        <>
            <h1>Login</h1>
        
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Username" value={username} onChange={handleUsernameChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </>
    )
}