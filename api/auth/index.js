import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from 'firebase/firestore';

// state
import { setLogin } from '../../state/authSlice';
let usersRef = collection(firestore, 'users');

export const LoginAPI = (dispatch, email, password) => {
  let res = signInWithEmailAndPassword(auth, email, password);
  let q = query(usersRef, where("email", "==", email));

  onSnapshot(q, (response) => {
        dispatch(
          setLogin({
            user: response.docs.map((doc) => {
              return {
                id: doc.id,
                email: doc.data().email,
                name: doc.data().name,
                username: doc.data().username,
                profileImg: doc.data().profileImg,
              };
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