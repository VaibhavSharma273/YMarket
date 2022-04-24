import * as React from 'react';
import renderer from 'react-test-renderer';

import PostsView from '../PostsView';

it(`renders correctly`, () => {
    const props = {
        post: jest.fn(),
        navigation: jest.fn(),
    };
    const tree = renderer.create(<PostsView {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
});
