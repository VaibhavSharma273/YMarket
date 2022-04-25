import * as React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '../TextInput';

it(`renders correctly`, () => {
    const props = {
        errorText: 'error',
        description: 'error',
    };
    const tree = renderer.create(<TextInput {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
});
