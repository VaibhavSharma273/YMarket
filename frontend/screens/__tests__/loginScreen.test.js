import React from 'react';
import {shallow} from 'enzyme';
import LoginScreen from '../Auth/LoginScreen'

// const createTestProps = (props) => ({
//     navigation: {
//       navigate: jest.fn()
//     },
//     ...props
//   });

// need to mock goBack?

describe('Login Screen component', () => {
    it(`renders correctly`, () => {
        // const navigation = { navigate: jest.fn() };
        const component = shallow(<LoginScreen />);
        expect(component.length).toBe(1)
    });
});

