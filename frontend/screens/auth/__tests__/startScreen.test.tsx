import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import StartScreen from '../StartScreen'
import { TouchableOpacity } from 'react-native';

describe('Start Screen component', () => {
    it(`renders correctly`, () => {
        const component = shallow(<StartScreen />);
        expect(component.length).toBe(1)
    });

    it('matches the snapshot', () => {
        // const component = shallow(<StartScreen/>);
        // expect(component.getElements()).toMatchSnapshot();
        const tree = renderer.create(<StartScreen/>)
                             .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Test Touchable Opacity Component', () => {
    it('Test click event', () => {
        const onPress = jest.fn()
        const touchableOpacity = shallow((<TouchableOpacity onPress={onPress}>Login</TouchableOpacity>));
        touchableOpacity.find('TouchableOpacity').first().props().onPress();
        expect(onPress).toHaveBeenCalledTimes(1);
    });
})

