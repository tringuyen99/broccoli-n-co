//Components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function SuccessMessage(props) {
    return (
        <Container>
            <h1 className="display-6 fw-bold">All done!</h1>
            <p className="fw-light">Broccoli&Co</p>
            <br/>
            <p className="fw-normal-5 ">
                Our team will reach you with a confirmation email along with the details about the invitation.
                Looking forward to seeing you there!
            </p>
            <div className="d-grid gap-2 mt-5">
                <Button variant="primary" size="lg" onClick={props.onClose}>
                    OK!
                </Button>
            </div>
        </Container>
    )
}

export default SuccessMessage;