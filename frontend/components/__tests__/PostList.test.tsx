import * as React from 'react';
import renderer from 'react-test-renderer';

import PostList from '../PostList';

it(`renders correctly`, () => {
    const props = {
        data: jest.fn(),
        navigation: jest.fn()
    }
  const tree = renderer.create(<PostList {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
