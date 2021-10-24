import PropTypes from 'prop-types';

//Components
import { Modal } from 'react-bootstrap';

function MyModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}

MyModal.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node.isRequired,
    onHide: PropTypes.func,
};

export default MyModal;