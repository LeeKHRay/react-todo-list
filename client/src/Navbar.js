import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useLocation  } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname.match(/\/[^/]*/)[0])

    const handleSelect = (selectedKey) => {
        setActiveKey(selectedKey);
    }

    return (
        <>
            <BSNavbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" className="mb-3">
                <Container>
                    <BSNavbar.Brand href="/">Todo List</BSNavbar.Brand>
                    <BSNavbar.Toggle aria-controls="navbar-nav" />
                    <BSNavbar.Collapse id="navbar-nav">
                        <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect}>
                            <Nav.Link as="div" eventKey="/">
                                <Link className="text-decoration-none text-light" to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link as="div" eventKey="/about">
                                <Link className="text-decoration-none text-light" to="/about">About</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav variant="pills" activeKey={activeKey} onSelect={handleSelect} className="ms-auto">
                            <Nav.Link as="div" eventKey="/signup">
                                <Link className="text-decoration-none text-light" to="/signup">Sign Up</Link>
                            </Nav.Link>
                            <Nav.Link as="div" eventKey="/login">
                                <Link className="text-decoration-none text-light" to="/login">Login</Link>
                            </Nav.Link>
                        </Nav>
                    </BSNavbar.Collapse>                        
                </Container>
            </BSNavbar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}