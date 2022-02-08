import { shallow } from 'enzyme';
import MessageBox from '.'

describe('Unit Testing : MessageBox', () => {
    
    test('Should display an owner message style', () => {
    
        const component = shallow(<MessageBox message={{
            __typename: 'Message',
            id: '',
            owner: '',
            preferredUsername: '',
            message: '',
            createdAt: '',
            updatedAt: ''
        }} isMe={true} />);
        expect(component.find('.sentMessageContainer')).toHaveLength(1);
    })
    
    test('Should display an owner style', () => {
        const component = shallow(<MessageBox message={{
            __typename: 'Message',
            id: '',
            owner: '',
            preferredUsername: '',
            message: '',
            createdAt: '',
            updatedAt: ''
        }} isMe={false} />);
        expect(component.find('.receivedMessageContainer')).toHaveLength(1);
    })
    
})