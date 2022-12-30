import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Config";
import profileImage from "../../assets/images/blank-profile.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { TrashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const Comment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [currentlyLoggedInUser] = useAuthState(auth);

  const commentRef = doc(db, "blogs", id);

  
  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, [id]);

  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment)
    }).then((e) => {
      console.log(e);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleSubmitComment = () => {
    updateDoc(commentRef, {
      comments: arrayUnion({
        user: currentlyLoggedInUser.uid,
        userName: currentlyLoggedInUser.displayName,
        comment: comment,
        createdAt: new Date(),
        commentId: uuidv4(),
      }),
    }).then(() => {
      setComment("");
    });
  };

  return (
    <div className="mt-8">
      Comments ({comments?.length})
      <div>
        {comments !== null &&
          comments?.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId} className=" p-5 ">
              <div className="grid grid-cols-[50px,1fr] gap-3 mb-3">
                <img
                  src={profileImage}
                  alt=""
                  className="w-8 sm:w-40 md:w-full object-fill h-auto rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="text-color-gray-400 font-medium text-lg">
                    {userName}
                  </h4>
                  <small className="text-color-gray-400 ">
                    {createdAt.toDate().toDateString()}
                  </small>
                </div>
              </div>
              <p className="text-color-gray-400 ">{comment}</p>
              {user === currentlyLoggedInUser?.uid && (
                <div
                  className="bg-color-gray-400 w-7 h-7 grid place-items-center text-color-gray-100 cursor-pointer rounded-md"
                  onClick={() => {
                    handleDeleteComment({
                      commentId,
                      user,
                      comment,
                      userName,
                      createdAt,
                    });
                  }}
                >
                  <TrashIcon className="w-4" />
                </div>
              )}
            </div>
          ))}

        {currentlyLoggedInUser && (
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-color-gray-400 font-semibold ">
                Add your comment:
              </h3>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="h-24 overflow-y-scroll hide-scroll bg-transparent px-2 py-3 border border-color-gray-300 rounded-md text-sm text-color-gray-400"
              ></textarea>
            </div>
            <div>
              <motion.button
                className="bg-color-gray-400 px-5 py-2 text-color-gray-100 tracking-tight font-medium rounded-md"
                onClick={handleSubmitComment}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 0.9 }}
              >
                Submit
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
