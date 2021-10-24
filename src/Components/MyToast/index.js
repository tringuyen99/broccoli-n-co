// Components 
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';

function MyToast(props) {
    return (
        <Toast {...props} className="d-inline-block m-1" bg={props.variant.toLowerCase()}>
            <Toast.Header>
                <strong className="me-auto">{props.title? props.title : "Message"}</strong>
            </Toast.Header>
            <Toast.Body className={props.variant === 'Dark' && 'text-white'}>
                {props.body}
            </Toast.Body>
        </Toast>
    )
}

MyToast.propTypes = {
    variant: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default MyToast;
