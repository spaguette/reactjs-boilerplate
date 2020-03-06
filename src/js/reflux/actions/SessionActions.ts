import axios from 'axios';
import { History } from 'history';

interface IAuthInfo {
    username: string
    password: string
}

interface IRegistrationInfo extends IAuthInfo {
    licensePlate: string
}

const SessionActions = {
    logIn: ({ username, password }: IAuthInfo, history: History) => 
        axios.post('/api/session', { username, password })
             .then(() => {
                 history.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             }),
    register: ({ username, password, licensePlate }: IRegistrationInfo, history: History) =>
        axios.post('/api/registration', { username, password, licensePlate })
             .then(() => {
                 history.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             })
};

export default SessionActions;
