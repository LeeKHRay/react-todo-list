import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value);
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("login");
        await fetch("", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
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
                
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </>
    )
}