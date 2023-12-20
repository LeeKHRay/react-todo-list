import { Navbar } from "../components";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";

export const PageLayout = () => {
    return (
        <div style={{ minWidth: "fit-content" }}>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}