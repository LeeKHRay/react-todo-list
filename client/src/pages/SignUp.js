import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useFormState } from '../hooks';
import { postRequest } from '../utils';

export const SignUp = () => {
    const [formState, setFormState, response, setResponse] = useFormState({ username: "", password: "", repeatPassword: "" });
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
        
        const res = await postRequest("/api/users/signup", formState)
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
                    <Form.Text muted>
                        The username must have at least 6 characters and must not contain spaces.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter Your Password" value={formState.password} onChange={handleChange} required />
                    <Form.Text muted>
                        The password must have at least 8 characters, contain lowercase and uppercase letters and numbers,
                        and must not contain spaces, special characters.
                    </Form.Text>
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