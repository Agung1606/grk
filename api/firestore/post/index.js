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


let postsRef = collection(firestore, "posts");
let likesRef = collection(firestore, "likes")

// post photo
export const postingPhoto = async (object)  => {
    await addDoc(postsRef, object)
        .then(() => {})
        .catch((error) => {
            return error;
        })
};

// get all posts for global
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
    });
  } catch (err) {
    console.log(err);
  }
};