import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        return error;
    }
};