import * as React from 'react';
import renderer from 'react-test-renderer';

import CategoryList from '../CategoryList';

it(`renders correctly`, () => {
    const props = {
        navigation: jest.fn(),
    };
    const tree = renderer.create(<CategoryList {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
});
