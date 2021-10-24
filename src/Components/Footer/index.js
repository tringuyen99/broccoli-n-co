import { Container } from 'react-bootstrap';

import './Footer.scss';

function Footer() {
    return (
        <Container className="fixed-bottom bg-dark text-center my-footer" fluid>
            <div className="fw-bold text-light"> 
                Broccoli&Co
            </div>
            <blockquote className="blockquote text-light ">
                <p className="mb-2 my-quote">I'm President of the United States, and I'm not going to eat any more broccoli!</p>
                <footer className="blockquote-footer">George H. W. Bush</footer>
            </blockquote>
        </Container>
    )
}

export default Footer;