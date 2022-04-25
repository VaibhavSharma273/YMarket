import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import AccessPostScreen from '../AccessPostScreen';
import { createTestProps } from '../../../jest.setup';
import renderer from 'react-test-renderer';

describe('Access Post Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<AccessPostScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<AccessPostScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
