import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import RegisterScreen from '../auth/RegisterScreen';
import { createTestProps } from '../../jest.setup';
import renderer from 'react-test-renderer';

describe('Register Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<RegisterScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<RegisterScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
