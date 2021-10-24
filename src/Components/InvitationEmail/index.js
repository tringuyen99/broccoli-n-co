import { useState } from 'react';
import Proptypes from 'prop-types';

// Components
import MyModal from '../MyModal';
import InvitationEmailForm from './InvitationEmailForm';
import SuccessMessage from './SuccessMessage';

function InvitationEmail(props) {
    const [success, setSuccess] = useState(false);

    return (
        <MyModal onEnter={() => setSuccess(false)} show={props.show} onHide={props.onClose}>
            {!success && 
                <InvitationEmailForm onSuccess={() => setSuccess(true)}/>
            }
            {success && 
                <SuccessMessage onClose={props.onClose}/>
            }
        </MyModal>
    )
}

InvitationEmail.propTypes = {
    show: Proptypes.bool.isRequired,
    onClose: Proptypes.func.isRequired,
}

export default InvitationEmail;