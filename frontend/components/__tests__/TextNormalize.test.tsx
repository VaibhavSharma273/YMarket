import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native'

import { normalize } from '../TextNormalize';

it(`renders correctly`, () => {
    const props = {
        fontSize: normalize(24),
    }
    const tree = renderer.create(<Text {...props}>Hi</Text>).toJSON();

    expect(tree).toMatchSnapshot();
});
