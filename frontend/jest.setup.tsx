const Enzyme = require('enzyme');
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');
import { cleanup } from '@testing-library/react-native';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

export const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

// Enzyme.ShallowWrapper.prototype.findByTestAttr = function (attr: any) {
//   return this.find(`[data-test="${attr}"]`)
// }

export const findByTestAttr = (wrapper: any, val: any) => wrapper.find(`[test-id='${val}']`);

// jest.mock("@react-navigation/native", () => {
//   const actualNav = jest.requireActual("@react-navigation/native");
//   return {
//     ...actualNav,
//     useNavigation: () => ({
//       navigate: jest.fn(),
//       dispatch: jest.fn(),
//     }),
//   };
// });

// import 'react-native-gesture-handler/jestSetup';

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterEach(cleanup);