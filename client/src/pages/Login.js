import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { postRequest } from '../utils';
import { useFormState } from '../hooks';
import { useAuthContext } from '../contexts';

export const Login = () => {
    const [formState, setFormState, response, setResponse] = useFormState({ username: "", password: "" });
    const { login } = useAuthContext();

    const handleChange = ({ target }) => {
        setFormState(formState => ({ ...formState, [target.name]: target.value }));
        setResponse(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await postRequest("/api/users/login", formState);
        const { message, token } = await res.json();
        if (res.ok) {
            await login(token);
        }
        setResponse({ ok: res.ok, message });
        // redirect to /tasks in <ProtectedRoute />
    }

    return (
        <>
            <h1>Login</h1>
        
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter Your Username" value={formState.username} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter Your Password" value={formState.password} onChange={handleChange} required />
                </Form.Group>

                {response && <Alert variant={response.ok ? "success" : "danger"}>{response.message}</Alert>}
                
                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </>
    )
}