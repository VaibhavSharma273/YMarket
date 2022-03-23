import React from 'react';
import {shallow} from 'enzyme';
import StartScreen from '../Auth/StartScreen'

describe('Start Screen component', () => {
    it(`renders correctly`, () => {
        const component = shallow(<StartScreen />);
        expect(component.length).toBe(1)
    });
});

