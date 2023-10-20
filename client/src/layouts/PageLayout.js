import { Navbar } from "../components";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}