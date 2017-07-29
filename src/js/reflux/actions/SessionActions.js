import axios from 'axios';
import {browserHistory} from 'react-router';

const SessionActions = {
    /**
     * @function logIn
     * @param {Object} authInfo
     * @return {void}
     * */
    logIn: (authInfo) => {
        axios.post('/api/session', {username: authInfo.username, password: authInfo.password})
             .then((response) => {
                 browserHistory.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             });
    },
    /**
     * @function register
     * @param {Object} regInfo
     * @return {void}
     * */
    register: (regInfo) => {
        axios.post('/api/registration', {
            username: regInfo.username,
            password: regInfo.password,
            licensePlate: regInfo.licensePlate
        })
             .then((response) => {
                 browserHistory.push('/reservation');
             })
             .catch((response) => {
                 //notify user about an error
                 console.error('Error while receiving response = ', response.data);
             });
    }
};

export default SessionActions;
