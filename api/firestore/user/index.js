import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../../firebaseConfig'

// state redux
import { setLogin } from '../../../state/authSlice'

let usersRef = collection(firestore, "users");

// store user's data
export const postUserData = async ({ dispatch, ...payload }) => {
  let q = query(usersRef, where("email", "==", payload.email));
  addDoc(usersRef, payload)
    .then(() => {
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
    })
    .catch((error) => {
      return error;
    });
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

// experiment
export const experiment = () => {
  let q = query(usersRef, where("username", "==", "agngsptra._"));
  onSnapshot(q, (response) => {
    console.log(
      response.docs.map((doc) => {
        return {
          username: doc.data().username,
          firstName: doc.data().firstName,
          email: doc.data().email,
          id: doc.id
        };
      })
    );
  });
};