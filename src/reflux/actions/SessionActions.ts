import axios from 'axios';
import { History } from 'history';

interface AuthInfo {
    username: string
    password: string
}

interface RegistrationInfo extends AuthInfo {
    licensePlate: string
}

const SessionActions = {
    logIn: ({ username, password }: AuthInfo, history: History) => 
        axios.post('/api/session', { username, password })
             .then(() => {
                 history.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             }),
    register: ({ username, password, licensePlate }: RegistrationInfo, history: History) =>
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
