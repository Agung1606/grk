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
  limit,
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

// for explore screen
export const getExplorePost = ({ setPostsData, limitNum }) => {
  let q = query(postsRef, orderBy("date"), limit(limitNum));
  onSnapshot(q, (response) => {
    setPostsData(
      response.docs.map((doc) => {
        return {
          id: doc.id,
          imgPost: doc.data().imgPost,
        };
      })
    );
  });
};

// get all posts from database to put at home screen
export const getPosts = (setDataPosts) => {
    const q = query(postsRef, orderBy('date', 'desc'));
    onSnapshot(q, (response) => {
        setDataPosts(
            response.docs.map((doc) => {
                return {...doc.data(), id: doc.id }
            })
        )
    });
};

// get current user's post
export const getUserPosts = (setDataPosts, userId) => {
  const q = query(postsRef, where("userId", "==", userId));
  onSnapshot(q, (response) => {
    setDataPosts(
      response.docs.map((doc) => {
        return {
          id: doc.id,
          imgPost: doc.data().imgPost
        }
      })
    )
  })
};

// get single post
export const getSinglePost = (setDataPost, postId) => {
  onSnapshot(postsRef, (response) => {
    setDataPost(
      response.docs.map((doc) => {
       return { ...doc.data(), id: doc.id };
      }).filter(doc => doc.id === postId)[0]
    )
  })
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
    console.log("error like firebase");
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