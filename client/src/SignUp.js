import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [formState, setFormState] = useState({ username: "", password: "", repeatPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value })
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/users/signup", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState)
        })

        if (response.ok) {
            navigate("/login");
        }
        else {
            const { message } = await response.json();
            setError(message);
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
        
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter Your Username" value={formState.username} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter Your Password" value={formState.password} onChange={handleChange} required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="repeat-password">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control name="repeatPassword" type="password" placeholder="Repeat Your Password" value={formState.repeatPassword} onChange={handleChange} required />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </>
    )
}