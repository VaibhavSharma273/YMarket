import React from 'react';
import {shallow} from 'enzyme';
import ConfirmationScreen from '../Auth/ConfirmationScreen'

describe('Confirmation Screen component', () => {
    it(`renders correctly`, () => {
        const component = shallow(<ConfirmationScreen />);
        expect(component.length).toBe(1)
    });
});

