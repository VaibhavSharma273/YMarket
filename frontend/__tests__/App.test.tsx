import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// @ts-ignore
import App from '../App.tsx'

describe('App component', () => {
    it('renders correctly', () => {
        const component = shallow(<App />);
        expect(component.length).toBe(1)        
    });
    it('matches the snapshot', () => {
        const component = shallow(<App/>);
        expect(component.getElements()).toMatchSnapshot();
    });
});