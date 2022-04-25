import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from '../App.tsx';

describe('App component', () => {
    it('renders correctly', () => {
        const component = shallow(<App />);
        expect(component.length).toBe(1);

        // create snapshot
    });
    it('matches the snapshot', () => {
        const component = shallow(<App />);
        expect(component.getElements()).toMatchSnapshot();
    });
});
