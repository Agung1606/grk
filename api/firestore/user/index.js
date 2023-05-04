import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
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
                     .map((doc) => {
                      return {
                        ...doc.data(),
                        id: doc.id,
                      };
                      // return {
                        //   id: doc.id,
                        //   firstName: doc.data().firstName,
                        //   lastName: doc.data().lastName,
                        //   username: doc.data().username,
                        //   profileImg: doc.data().profileImg,
                        // };
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

// get user data
export const getUser = ({ username, setUserData }) => {
  let q = query(usersRef, where("username", "==", username));
  onSnapshot(q, (response) => {
    setUserData(
      response.docs.map((doc) => {
        return {
          ...doc.data(),
        }
      })[0]
    )
  });
};