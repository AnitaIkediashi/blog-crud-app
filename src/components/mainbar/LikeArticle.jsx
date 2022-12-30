import { HeartIcon } from "@heroicons/react/24/outline";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/Config";

const LikeArticle = ({id, likes}) => {
  const [user] = useAuthState(auth)

  const likeRef = doc(db, 'blogs', id)

  const handleLikes = () => {
    if(likes?.includes(user.uid)) {
      updateDoc(likeRef, {
        likes: arrayRemove(user.uid)
      }).then(() => {
        console.log('Unlike');
      }).catch((e) => {
        console.log(e);
      })
    } else {
      updateDoc(likeRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("Like");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div className="cursor-pointer">
      {!likes?.includes(user.uid) ? (
        <HeartIcon className="w-4" onClick={handleLikes} />
      ) : (
        <i className="ri-heart-fill text-color-gray-400" onClick={handleLikes}></i>
      )}
    </div>
  );
};

export default LikeArticle;
