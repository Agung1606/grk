import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { firestore } from '../../../firebaseConfig'

// state redux
import { setLogin } from '../../../state/authSlice'

let usersRef = collection(firestore, "users");

// store user's data
export const postUserData = async ({dispatch, ...payload}) => {
    addDoc(usersRef, payload)
        .then(() => {
             onSnapshot(usersRef, (response) => {
               dispatch(
                 setLogin({
                   user: response.docs
                     .map((docs) => {
                       return { ...docs.data(), id: docs.id };
                     })
                     .filter((item) => {
                       return item.email === payload.email;
                     })[0],
                 })
               );
             });
        })
        .catch((error) => {
            return error;
        })
};