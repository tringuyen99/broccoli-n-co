//Components
import { Container, Navbar } from 'react-bootstrap';

function Header() {
    return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand>Broccoli & Co</Navbar.Brand>
        </Container>
    </Navbar>
    )
}
export default Header;