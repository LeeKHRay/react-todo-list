import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Logout } from './Logout';
import { useAuth } from '../hooks';

export const Navbar = () => {
    const { user, isValidatedToken } = useAuth();

    return (
        <BSNavbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" className="mb-3">
            <Container>
                <BSNavbar.Brand as={NavLink} to="/">Todo List</BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="navbar-nav" />
                <BSNavbar.Collapse id="navbar-nav">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link as={NavLink} className="text-light" to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} className="text-light" to="/about">About</Nav.Link>
                        </Nav.Item>
                        {isValidatedToken && user &&
                            <Nav.Item>
                                <Nav.Link as={NavLink} className="text-light" to="/tasks">Tasks</Nav.Link>
                            </Nav.Item>
                        }
                    </Nav>
                    <Nav variant="pills" className="ms-auto">
                        {isValidatedToken && 
                            (
                                user ?
                                <Nav.Item>
                                    <Logout />
                                </Nav.Item> :
                                <>
                                    <Nav.Item>
                                        <Nav.Link as={NavLink} className="text-light" to="/signup">Sign Up</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item >
                                        <Nav.Link as={NavLink} className="text-light" to="/login">Login</Nav.Link>
                                    </Nav.Item>
                                </>
                            )
                        }
                    </Nav>
                </BSNavbar.Collapse>                        
            </Container>
        </BSNavbar>
    )
}