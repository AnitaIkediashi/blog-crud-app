import { ArrowLongLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { doc, onSnapshot } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import AnimatePage from "../components/mainbar/AnimatePage";
import Comment from "../components/mainbar/Comment";
import LikeArticle from "../components/mainbar/LikeArticle";
import { auth, db } from "../firebase/Config";

const SinglePage = () => {
  const {id} = useParams()

  const [user] = useAuthState(auth);

  const [article, setArticle] = useState(null)

  //get the documents from firebase
  useEffect(() => {
    const docRef = doc(db, 'blogs', id)
    onSnapshot(docRef, (snapshot) => {
      setArticle({...snapshot.data(), id: snapshot.id});
    })
  }, [id])

    
  return (
    <>
      <AnimatePresence>
        <AnimatePage>
          <div className=" pt-16 pb-6 md:w-4/5 w-full mx-auto">
            <Link to="/" className="flex items-center gap-1 mb-4 ">
              <ArrowLongLeftIcon className="w-6 " />
              <span className="text-color-gray-300 hover:text-color-gray-400 hover:font-semibold duration-300 ease-in">
                Back to Home
              </span>
            </Link>
            {article && (
              <div>
                <h2 className="mb-8 text-color-gray-400 font-semibold capitalize text-xl lg:text-2xl">
                  {article.title}
                </h2>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="mb-4"
                />
                <p className="text-color-gray-400 pb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 ">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 text-color-gray-400" />
                      <span className="font-medium text-color-gray-400">
                        {article.createdBy}
                      </span>
                    </div>
                    <small className="text-color-gray-400">
                      {article.createdAt.toDate().toDateString()}
                    </small>
                  </div>
                  <div className="flex items-center gap-1">
                    {user && <LikeArticle id={id} likes={article.likes} />}
                    <small className="text-color-gray-400">
                      {article.likes?.length} Likes
                    </small>
                  </div>
                </div>
                {/* comment */}
                <Comment id={article.id} />
              </div>
            )}
          </div>
        </AnimatePage>
      </AnimatePresence>
    </>
  );
};

export default SinglePage;
