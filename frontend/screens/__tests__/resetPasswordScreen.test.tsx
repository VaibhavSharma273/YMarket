import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ResetPasswordScreen from '../auth/ResetPasswordScreen';
import { createTestProps } from '../../jest.setup';
import renderer from 'react-test-renderer';

describe('Reset Password Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<ResetPasswordScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<ResetPasswordScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
