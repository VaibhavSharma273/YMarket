import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Post from '../Post';
import renderer from 'react-test-renderer';
import mock from '../data/mock';

const createTestProps = () => ({
    navigation: {
        navigate: jest.fn(),
    },
    post: mock[0],
    is_edit: false,
});

describe('Post Display component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps();
        component = shallow(<Post {...props} />);
    });

    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<Post {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
