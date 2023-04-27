import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from "../../firebaseConfig";
import { collection, onSnapshot } from 'firebase/firestore';

// state
import { setLogin } from '../../state/authSlice';
let usersRef = collection(firestore, 'users');

export const LoginAPI = (dispatch, email, password) => {
  let res = signInWithEmailAndPassword(auth, email, password);

  onSnapshot(usersRef, (response) => {
    dispatch(
      setLogin({
        user: response.docs
          .map((docs) => {
            return { ...docs.data(), id: docs.id };
          })
          .filter((item) => {
            return item.email === email;
          })[0],
      })
    );
  });
  return res;
};


export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        return error;
    }
};