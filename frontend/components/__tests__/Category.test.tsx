import * as React from 'react';
import renderer from 'react-test-renderer';

import Category from '../Category';

it(`renders correctly`, () => {
    const props = {
        category: jest.fn(),
        navigation: jest.fn()
    };
  const tree = renderer.create(<Category {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
