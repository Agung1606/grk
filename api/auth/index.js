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
          .map((doc) => {
            return { 
              ...doc.data(),
              id: doc.id
            }
            // return {
            //   id: doc.id,
            //   firstName: doc.data().firstName,
            //   lastName: doc.data().lastName,
            //   username: doc.data().username,
            //   profileImg: doc.data().profileImg,
            // };
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