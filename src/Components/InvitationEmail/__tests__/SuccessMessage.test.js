import React from 'react';
import renderer from 'react-test-renderer';
import SuccessMessage from '../SuccessMessage';

const propsStub = {
    onSuccess: () => {},
};

it('SuccessMessage renders correctly', () => {
    const tree = renderer
        .create(<SuccessMessage {...propsStub} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});