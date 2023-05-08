import { addDoc, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { firestore, storage } from '../../../firebaseConfig'
// storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { DEFAULT_AVATAR } from '@env';

// state redux
import { setLogin, userUpdate, userUpdateProfile } from '../../../state/authSlice'

let usersRef = collection(firestore, "users");
let postsRef = collection(firestore, "posts");
let tweetsRef = collection(firestore, "tweets");

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
                bio: doc.data().bio,
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

export const editProfileImg = async ({ userId, profileImg, dispatch, setProgress, setStartUpload }) => {
  let userToEdit = doc(usersRef, userId);
  let qPosts = query(postsRef, where("userId", "==", userId));
  let qTweets = query(tweetsRef, where("userId", "==", userId));
  // if user remove their profile then use default image otherwise upload a new one
  if(DEFAULT_AVATAR === profileImg) {
    updateDoc(userToEdit, { profileImg: DEFAULT_AVATAR })
    dispatch(userUpdateProfile({ profileImg: DEFAULT_AVATAR }))
    // change profile to all user's post
    onSnapshot(qPosts, (response) => {
      response.forEach((doc) => {
        updateDoc(doc.ref, { userProfileImg: DEFAULT_AVATAR})
      })
    })
    // change profile to all user's tweets
    onSnapshot(qTweets, (response) => {
      response.forEach((doc) => {
        updateDoc(doc.ref, { userProfileImg: DEFAULT_AVATAR})
      })
    })
  } else {
    const blobImg = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", profileImg, true);
      xhr.send(null);
    });

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "assets/" + profileImg.substring(profileImg.lastIndexOf('/') + 1, profileImg.length));
    const uploadTask = uploadBytesResumable(storageRef, blobImg, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // get tast progress, including the number of bytes uploaded and the total number of bytes to be upload
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        if (snapshot.state === "running") {
          setStartUpload(true)
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      // here, should be error handling but i decided to skip it for now
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateDoc(userToEdit, { profileImg: downloadURL });
          dispatch(userUpdateProfile({ profileImg: downloadURL }));
          // change profile to all user's post
          onSnapshot(qPosts, (response) => {
            response.forEach((doc) => {
              updateDoc(doc.ref, { userProfileImg: downloadURL });
            });
          });
          // change profile to all user's tweets
          onSnapshot(qTweets, (response) => {
            response.forEach((doc) => {
              updateDoc(doc.ref, { userProfileImg: downloadURL });
            });
          });
          setProgress(0);
          setStartUpload(false);
          alert('Updated successfuly');
        });
      }
    );
  }
};

// edit user profile data
export const editProfileData = ({ userId, payload, dispatch }) => {
  let userToEdit = doc(usersRef, userId);
  updateDoc(userToEdit, payload)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    })
  dispatch(
    userUpdate({
      name: payload.name,
      username: payload.username,
      bio: payload.bio,
    })
  );
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