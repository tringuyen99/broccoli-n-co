import { useState } from 'react';

// Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InvitationEmail from '../InvitationEmail';

function WelcomeMessage() {
    const [openInvitation, setOpenInvitation] = useState(false);

    return (
        <Container className="welcome-message" >
            <InvitationEmail show={openInvitation} onClose={() => setOpenInvitation(false)} />
            <h1 className="motto-quote">A Better way to enjoy every day.</h1>
            <p className="fw-light">Broccoli&Co</p>
            <br/>
            <p className="fw-normal-5 mb-5">
                Are you ready to change your life, join us in our upcoming seminar!
            </p>
            <Button variant="primary" size="lg" type="submit" onClick={() => setOpenInvitation(true)}>
                Register for invitation
            </Button>
        </Container>
    )
}

export default WelcomeMessage;