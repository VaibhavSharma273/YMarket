import * as React from 'react';
import renderer from 'react-test-renderer';

import ProfilePhoto from '../ProfilePhoto';

it(`renders correctly`, () => {
    const tree = renderer.create(<ProfilePhoto />).toJSON();

    expect(tree).toMatchSnapshot();
});
