import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ConfirmationScreen from '../ConfirmationScreen';
import { createTestProps } from '../../../jest.setup';
import renderer from 'react-test-renderer';

describe('Confirmation Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<ConfirmationScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<ConfirmationScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
