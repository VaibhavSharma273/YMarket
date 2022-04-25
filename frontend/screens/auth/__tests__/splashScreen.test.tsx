import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SplashScreen from '../SplashScreen';
import { createTestProps } from '../../../jest.setup';
import renderer from 'react-test-renderer';

describe('Confirmation Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<SplashScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<SplashScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
