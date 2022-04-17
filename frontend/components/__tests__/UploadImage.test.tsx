import * as React from 'react';
import renderer from 'react-test-renderer';

import UploadImage from '../UploadImage';

it(`renders correctly`, () => {
    const props = {
        updateImages: jest.fn(),
        defaultValue: jest.fn(),
        number: jest.fn(),
    }
  const tree = renderer.create(<UploadImage {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
