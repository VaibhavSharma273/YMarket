import * as React from 'react';
import renderer from 'react-test-renderer';

import SearchBar from '../SearchBar';

it(`renders correctly`, () => {
    const props = {
        clicked: jest.fn(),
        searchPhrase: "hello",
        setSearchPhrease: jest.fn(),
        setClicked: jest.fn(),
    }
  const tree = renderer.create(<SearchBar {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
