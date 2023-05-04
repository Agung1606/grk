import { firestore } from '../../../firebaseConfig'
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";


let usersRef = collection(firestore, "users");
let postsRef = collection(firestore, "posts");
let likesRef = collection(firestore, "likesPost");
let commentsRef = collection(firestore, "commentsPost");

// post photo
export const postingPhoto = (object)  => {
    try {
      addDoc(postsRef, object)
        .then(() => {})
        .catch((error) => {
          return error;
        });
    } catch (error) {
      console.log(error)
    }
};

// get all posts for home screen
export const getPosts = (setDataPosts) => {
    const q = query(postsRef, orderBy('date', 'desc'));
    onSnapshot(q, (response) => {
        setDataPosts(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id }
            })
        )
    });
};

// like post
export const likePost = ({ userId, postId, isLiked, likesCount }) => {
  try {
    let docToLike = doc(likesRef, `${userId}_${postId}`);
    let docToUpdate = doc(postsRef, postId);
    if (isLiked) {
      deleteDoc(docToLike);
      updateDoc(docToUpdate, { likesCount: likesCount - 1 });
    } else {
      setDoc(docToLike, { userId, postId });
      updateDoc(docToUpdate, { likesCount: likesCount + 1 });
    }
  } catch (error) {
    console.log(error);
  }
};

// check if loggedInUser has liked the post
export const getLikesByUser = ({ userId, postId, setIsLiked }) => {
  try {
    let likeQuery = query(likesRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      const isLiked = likes.some((like) => like.userId === userId);

      setIsLiked(isLiked);
      return isLiked;
    });
  } catch (err) {
    console.log(err);
  }
};

// comment post
export const commentPost = ({
  userId,
  postId,
  username,
  userProfileImg,
  comment,
  date,
  commentsCount,
  setComment,
}) => {
  try {
    let docToUpdate = doc(postsRef, postId)
    addDoc(commentsRef, {
      postId,
      userId,
      username,
      userProfileImg,
      comment,
      date,
    });
    updateDoc(docToUpdate, { commentsCount: commentsCount + 1 });
    setComment("");
  } catch (error) {
    console.log(error);
  }
};

// get posts comments
export const getComments = async ({ postId, setDataComments}) => {
  try {
    let q = query(
      commentsRef,
      where("postId", "==", postId, orderBy("date", "desc")),
    )
    onSnapshot(q, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          userId: doc.data().userId,
          username: doc.data().username,
          userProfileImg: doc.data().userProfileImg,
          comment: doc.data().comment,
        };
      });
      setDataComments(comments);
    });
  } catch (error) {
    console.log(error)
  }
};