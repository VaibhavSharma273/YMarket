import React from 'react';
import {shallow} from 'enzyme';
import ResetPasswordScreen from '../Auth/ResetPasswordScreen'

describe('Reset Password Screen component', () => {
    it(`renders correctly`, () => {
        const component = shallow(<ResetPasswordScreen />);
        expect(component.length).toBe(1)
    });
});