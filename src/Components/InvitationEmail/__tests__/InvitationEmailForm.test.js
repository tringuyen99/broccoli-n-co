import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import InvitationEmailForm from '../InvitationEmailForm';

import { apiFetch } from '../../../Utils/apiFetch';
import { invitationEmailAPI } from '../../../Utils/apis';

jest.mock('../../../utils/apiFetch');

const onSuccessStub = jest.fn();

const propsStub = {
    onSuccess: onSuccessStub,
};

describe('InvitationEmailForm', () =>{
    beforeAll(()=> {
        apiFetch.mockImplementation(
            (url, method, formData) => new Promise(resolve => resolve())
        );
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(<InvitationEmailForm {...propsStub} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('makes network request when the fields are correct', async () => {
        render(<InvitationEmailForm {...propsStub} />)

        apiFetch.mockImplementation(
            (url, method, formData) => new Promise(resolve => resolve())
        );
        
        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.dee@someemail.com');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john.dee@someemail.com');

        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: 'john.dee@someemail.com',
            name: 'John',
            }),
        );
        expect(onSuccessStub).toBeCalled();
    });

    it('displays error when the name is not given', async () => {
        render(<InvitationEmailForm {...propsStub} />)

        userEvent.type(screen.getByPlaceholderText('Email'), 'john.dee@someemail.com');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john.dee@someemail.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).not.toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: 'john.dee@someemail.com',
            name: '',
            }),
        );
        expect(await screen.findByText("*Name is required")).toBeInTheDocument();
        expect(onSuccessStub).not.toBeCalled();
    });

    it('displays error when the name is not long enough', async () => {
        render(<InvitationEmailForm {...propsStub} />)

        userEvent.type(screen.getByPlaceholderText('Full Name'), 'Jo');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.dee@someemail.com');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john.dee@someemail.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).not.toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: 'john.dee@someemail.com',
            name: 'Jo',
            }),
        );
        expect(await screen.findByText("*Names must have at least 3 characters")).toBeInTheDocument();
        expect(onSuccessStub).not.toBeCalled();
    });

    it('displays error when the email is not given', async () => {
        render(<InvitationEmailForm {...propsStub} />)

        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john.dee@someemail.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).not.toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: '',
            name: 'John',
            }),
        );
        expect(await screen.findByText("*Email is required")).toBeInTheDocument();
        expect(onSuccessStub).not.toBeCalled();
    });

    it('displays error when the email is not valid', async () => {
        render(<InvitationEmailForm {...propsStub} />)
        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.deel.com');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john.deel.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).not.toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: 'john.deel.com',
            name: 'John',
            }),
        );

        const errorsMessage = await screen.findAllByText("*Must be a valid email address");
        expect(errorsMessage[0]).toBeInTheDocument();
        expect(errorsMessage[1]).toBeInTheDocument();
        expect(onSuccessStub).not.toBeCalled();
    });

    it('displays error when the emails are not matched', async () => {
        render(<InvitationEmailForm {...propsStub} />)
        userEvent.type(screen.getByPlaceholderText('Full Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.dee@someemail.com');
        userEvent.type(screen.getByPlaceholderText('Confirm Email'), 'john2.dee@someemail.com');
        userEvent.click(screen.getByRole('button'));

        await waitFor(() =>
            expect(apiFetch).not.toHaveBeenCalledWith(invitationEmailAPI, 'POST', {
            email: 'john.deel.com',
            name: 'John',
            }),
        );

        expect( await screen.findByText("*Emails must match")).toBeInTheDocument();
        expect(onSuccessStub).not.toBeCalled();
    });
})
