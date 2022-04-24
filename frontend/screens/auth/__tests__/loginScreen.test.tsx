import React from 'react';
import {shallow, mount, ShallowWrapper} from 'enzyme';
import LoginScreen from '../LoginScreen'
import { createTestProps, findByTestAttr } from '../../../jest.setup'
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('Login Screen component', () => {
    let component: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = createTestProps({});
        component = shallow(<LoginScreen {...props} />);
    });
    it(`renders correctly`, () => {
        expect(component.length).toBe(1);
    });
    it('matches the snapshot', () => {
        const tree = renderer.create(<LoginScreen {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // it('calls onLoginPressed when the login button is clicked', () => {
    //     const onLoginPressedMock = jest.fn();
    //     const component = render(<LoginScreen {...props} />)
    //     component.find()
    // })
    // it('text in state is changed when button is clicked', () => {
    //     const component = shallow(<LoginScreen {...props}/>);
    //     const form = component.find('TextInput')
    //     form.first()
    //         .simulate('changeText', "test@yale.edu");
    //     expect()

    //     // const { getByText } = render(<LoginScreen {...props}/>);
    //     // expect(getByText("Yale Email").textContent).toBe("")
    //     // fireEvent.click(getByText("Login"))
    //     // expect(getByText(/Email/i).textContent).toBe("Initial State Changed")
    // });
    // it('should not navigate if email address is not entered', () => {
    //     const component = shallow(<LoginScreen {...props}/>);
    //     const input = findByTestAttr(component, "email-input");
    //     input.simulate("changeText", 'test@yale.edu');
    //     component.update();

    //     const button = findByTestAttr(component, 'login-button');
    //     console.log(button.debug())
    //     button.simulate('click');
    //     // expect(props.navigation.navigate).toHaveBeenCalledWith('Root');
    //     expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    // })
});

// describe('Text input component', () => {
//     it('calls setEmail with the email input', () => {
//         const handleEmailInput = jest.fn()
//         const fakeEmail = 'test@yale.edu'
//         const wrapper = render(<TextInput onChangeText={handleEmailInput}>Email</TextInput>)
//         // const wrapper = shallow(<TextInput onChangeText={handleEmailInput}>Email</TextInput>)
//         // console.log(wrapper.html())
//         // expect(wrapper.length).to.equal(1)
//         // wrapper.find('TextInput').simulate('changeText', fakeEmail)
//         fireEvent.changeText(wrapper.findByText(TextInput), fakeEmail)
//         expect(handleEmailInput).toHaveBeenCalledWith(fakeEmail)
//     });
// });
