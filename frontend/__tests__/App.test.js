import React from 'react';
import { shallow } from 'enzyme';
import App from '../App.tsx'

describe('App component', () => {
    it('renders correctly', () => {
        const component = shallow(<App />);
        expect(component.length).toBe(1)
    });
});