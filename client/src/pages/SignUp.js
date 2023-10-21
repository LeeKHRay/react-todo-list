import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils';

export const SignUp = () => {
    const [formState, setFormState] = useState({ username: "", password: "", repeatPassword: "" });
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (response?.ok) {
            const timer = setTimeout(() => navigate("/login"), 3000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    const handleChange = ({ target }) => {
        setFormState(formState => ({ ...formState, [target.name]: target.value }));
        setResponse(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await postRequest("/users/signup", formState)
        const { message } = await res.json();
        setResponse({ ok: res.ok, message });
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

                {response && <Alert variant={response.ok ? "success" : "danger"}>{response.message}</Alert>}

                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </>
    )
}