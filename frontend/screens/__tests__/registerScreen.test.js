import React from 'react';
import {shallow} from 'enzyme';
import RegisterScreen from '../Auth/RegisterScreen'

describe('Register Screen component', () => {
    it(`renders correctly`, () => {
        const component = shallow(<RegisterScreen />);
        expect(component.length).toBe(1)
    });
});

