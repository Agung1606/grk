import { storage } from '../../firebaseConfig'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// firestore
import { postingPhoto } from '../firestore/post'

export const uploadPostImg = async ({
  file,
  name,
  setStartUpload,
  setProgress,
  setCaption,
  goToPostsScreen,
  object,
}) => {
  const blobImg = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", file, true);
    xhr.send(null);
  });

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "assets/" + name);
  const uploadTask = uploadBytesResumable(storageRef, blobImg, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      switch (snapshot.state) {
        case "paused":
          // console.log("Upload is paused");
          break;
        case "running":
          setStartUpload(true)
          break;
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
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        postingPhoto({
          ...object,
          imgPost: downloadURL,
        });
        setProgress(0);
        setStartUpload(false)
        setCaption("");
        goToPostsScreen();
      });
    }
  );
};