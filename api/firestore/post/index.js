import { firestore } from '../../../firebaseConfig'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'

let postsRef = collection(firestore, "posts");

// post photo
export const postingPhoto = async (object)  => {
    await addDoc(postsRef, object)
        .then(() => {})
        .catch((error) => {
            return error;
        })
};

// get all posts
export const getPosts = (setDataPosts) => {
    const q = query(postsRef, orderBy('timeStamp'));
    onSnapshot(q, (response) => {
        setDataPosts(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id }
            })
        )
    });
};