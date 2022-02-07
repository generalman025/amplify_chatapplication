import { shallow } from 'enzyme';
import MessageBox from '.'

test('', () => {
    shallow(<MessageBox message={{
        __typename: 'Message',
        id: '',
        owner: '',
        preferredUsername: '',
        message: '',
        createdAt: '',
        updatedAt: ''
    }} isMe={true} />);
    expect(true).toBeTruthy();
})


test('', () => {
    shallow(<MessageBox message={{
        __typename: 'Message',
        id: '',
        owner: '',
        preferredUsername: '',
        message: '',
        createdAt: '',
        updatedAt: ''
    }} isMe={false} />);
    expect(true).toBeTruthy();
})