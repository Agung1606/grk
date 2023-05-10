import { addDoc, and, collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { firestore, storage } from '../../../firebaseConfig'
// storage
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { DEFAULT_AVATAR } from '@env';

// state redux
import { setLogin, userUpdate, userUpdateProfile } from '../../../state/authSlice'

let usersRef = collection(firestore, "users");
let postsRef = collection(firestore, "posts");
let tweetsRef = collection(firestore, "tweets");
let followersRef = collection(firestore, "followers");
let followingRef = collection(firestore, "following");

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

export const editProfileImg = async ({ userId, profileImg, dispatch }) => {
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
      (snapshot) => {},
      (error) => {},
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

// for search engine
export const searchUserFromFirestore = ({ input, setSearchedUser }) => {
  let q = query(usersRef, and(
    where("name", "==", input)
  ));
  onSnapshot(q, (response) => {
    setSearchedUser(
      response.docs.map((doc) => {
        return {
          id: doc.id,
          username: doc.data().username,
          profileImg: doc.data().profileImg
        };
      })
    );
  });
};


// follow and unfollow
export const toggleFollow = ({ userId, otherId, isFollowing }) => {
  try {
    let docToFollowers = doc(followersRef, `${userId}_${otherId}`);
    let docToFollowing = doc(followingRef, `${userId}_${otherId}`);

    if(isFollowing) {
      deleteDoc(docToFollowers);
      deleteDoc(docToFollowing);
    } else {
      setDoc(docToFollowers, { userId: otherId, otherId: userId});
      setDoc(docToFollowing, { userId, otherId });
    }
  } catch (error) {
    console.log(error)
  }
};

// chech if loggedInUser has followed the user they visited
export const getFollowByUserVisitedScreen = ({ loggedInUserId, visitedUserId, setIsFollowers, setIsFollowing, setFollowersCount, setFollowingsCount }) => {
  try {
    let follow = query(followersRef, where("userId", "==", loggedInUserId));
    onSnapshot(follow, (response) => {
      let followers = response.docs.map((doc) => doc.data());
      const isFollow = followers.some((f) => f.otherId === visitedUserId);

      setFollowingsCount(followers.length);
      setIsFollowers(isFollow);
    })

    let following = query(followingRef, where("userId", "==", loggedInUserId));
    onSnapshot(following, (response) => {
      let followings = response.docs.map((doc) => doc.data());
      const isFollowing = followings.some((f) => f.otherId === visitedUserId);

      setFollowersCount(followings.length)
      setIsFollowing(isFollowing)
    })
  } catch (error) {
    console.log(error)
  }
};

// get amount of followers for profile screen
export const getAmountOfFollowers = ({ userId, setFollowersCount, setFollowingsCount }) => {
  try {
    let follow = query(followersRef, where('userId', '==', userId));
    onSnapshot(follow, (response) => {
      let followers = response.docs.map((doc) => doc.data());

      setFollowersCount(followers.length)
    })

    let following = query(followingRef, where('userId', '==', userId));
    onSnapshot(following, (response) => {
      let followings = response.docs.map((doc) => doc.data());

      setFollowingsCount(followings.length)
    })
  } catch (error) {
    console.log(error)    
  }
};