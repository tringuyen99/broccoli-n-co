import { useRef, useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import * as Yup from 'yup';

// Components
import { Formik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';

// Utils and API
import { apiFetch } from '../../Utils/apiFetch';
import { invitationEmailAPI } from '../../Utils/apis';

import './InvitationEmailForm.scss';

// Schema for yup
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, '*Names must have at least 3 characters')
        .required('*Name is required'),
    email: Yup.string()
        .email('*Must be a valid email address')
        .required('*Email is required'),
    confirmEmail: Yup.string()
        .email('*Must be a valid email address')
        .required('*Please confirm your email')
        .oneOf([Yup.ref('email'), null], '*Emails must match'),
});

function InvitationEmailForm(props) {
    const isUnmounted = useRef(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        return () => {
            isUnmounted.current = true;
        }
    }, []);

    return (
    <Container fluid className="justify-content-center text-center">
        <h1 className="display-6 fw-bold">Please fill in this form</h1>
        <p className="fw-light">Broccoli&Co</p>
        <Formik 
            initialValues={{ name:"", email:"", confirmEmail:""}}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                
                const submittedData = {
                    "name": values.name,
                    "email": values.email,
                }
                apiFetch(invitationEmailAPI, 'POST', submittedData)
                    .then(() => {
                        props.onSuccess();
                    })
                    .catch(error => {
                        setSubmitError(error.data.errorMessage);
                    })
                    .finally(() => {
                        if (!isUnmounted.current) {
                            setSubmitting(false);
                            resetForm();
                        }
                    })
            }}
        >
            {( {values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="mx-auto">
                    <Form.Group controlId="formName"className="mb-4">
                        <Form.Label>Name :</Form.Label>
                        <Form.Control
                            className={touched.name && errors.name ? "border border-warning" : "border border-dark"}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {touched.name && errors.name ? (
                            <div className="error-message">{errors.name}</div>): null
                        }
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-4">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control
                            className={touched.email && errors.email ? "border border-3 border-warning" : "border border-dark"}
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email ? (
                            <div className="error-message">{errors.email}</div>): null
                        }
                    </Form.Group>
                    <Form.Group controlId="formConfirmEmail" className="mb-5">
                        <Form.Label>Confirm Email :</Form.Label>
                        <Form.Control
                            className={touched.confirmEmail && errors.confirmEmail ? "border border-warning" : "border border-dark"}
                            type="text"
                            name="confirmEmail"
                            placeholder="Confirm Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmEmail}
                        />
                        {touched.confirmEmail && errors.confirmEmail ? (
                            <div className="error-message">{errors.confirmEmail}</div>): null
                        }
                    </Form.Group>
                    <div className="d-grid gap-2">
                        {submitError ? (
                            <div className="mb-2 text-danger">{submitError}</div>): null
                        }
                        <Button variant="primary" size="lg" type="submit" disabled={!isValid || isSubmitting}>
                            {isSubmitting? "Submitting" : "Submit"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    </Container>)
}

InvitationEmailForm.propTypes = {
    onSuccess: Proptypes.func.isRequired,
}

export default InvitationEmailForm;