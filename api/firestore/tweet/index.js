import { firestore } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  where,
} from "firebase/firestore";

let tweetsRef = collection(firestore, "tweets")
let likesRef = collection(firestore, "likesTweet")

// posting tweet
export const postingTweet = ({object,setTweet}) => {
    addDoc(tweetsRef, object)
        .then(() => {})
        .catch((error) => {
            return error
        })
    setTweet("")
};

// get all tweets for home screen
export const getTweets = (setDataTweets) => {
    const q = query(tweetsRef, orderBy("date", "desc"));
    onSnapshot(q, (response) => {
        setDataTweets(
          response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id };
          })
        );
    })
};

// like tweet
export const likeTweet = ({ userId, tweetId, isLiked, likesCount }) => {
    try {
        let docToLike = doc(likesRef, `${userId}_${tweetId}`);
        let docToUpdate = doc(tweetsRef, tweetId);
        if(isLiked) {
            deleteDoc(docToLike);
            updateDoc(docToUpdate,{ likesCount: likesCount - 1});
        } else {
            setDoc(docToLike, { userId, tweetId })
            updateDoc(docToUpdate,{ likesCount: likesCount + 1});
        }
    } catch (error) {
        console.log(error);
    }
};

// check if loggedInUser has liked the tweet
export const getLikesByUser = ({ userId, tweetId, setIsLiked }) => {
  try {
    let likeQuery = query(likesRef, where("tweetId", "==", tweetId));

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