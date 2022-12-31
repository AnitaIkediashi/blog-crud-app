import { ChatBubbleBottomCenterTextIcon, UserIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noData from "../assets/images/no-data.png";
import DeleteArticle from "../components/mainbar/DeleteArticle";
import { auth, db } from "../firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import AnimatePage from "../components/mainbar/AnimatePage";

const Home = () => {
  const [articles, setArticles] = useState([]);

  const [user] = useAuthState(auth);

  useEffect(() => {
    //get the documents
    const articleRef = collection(db, "blogs");
    //get multiple document in order
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      // console.log(articles);
    });
  }, []);

  return (
    <AnimatePage>
      <div className="py-6">
        {articles.length === 0 ? (
          <div className="flex items-center justify-center h-screen flex-col gap-6">
            <p className="text-color-gray-400 lg:text-lg text-base font-semibold ">
              No articles found!
            </p>
            <motion.img
              src={noData}
              alt="no articles"
              className="w-60 h-auto shadow-lg rounded-md"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 h-fit gap-4">
            {articles.map(
              ({
                id,
                createdAt,
                title,
                description,
                imageUrl,
                createdBy,
                userId,
                comments,
              }) => (
                <div
                  className="bg-color-gray-200 shadow-lg rounded-md relative p-4 cursor-pointer"
                  key={id}
                >
                  <div className="overflow-hidden mb-3">
                    <motion.img
                      src={imageUrl}
                      alt=""
                      className="w-full lg:h-40 h-60 lg:object-fill object-cover rounded-md"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    {createdBy && (
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 text-color-gray-400" />
                        <span className="text-color-gray-400 ">
                          {createdBy}
                        </span>
                      </div>
                    )}
                    <small>{createdAt.toDate().toDateString()}</small>
                  </div>
                  <h4 className="font-semibold text-color-gray-400 text-lg">
                    {title}
                  </h4>
                  <p className="text-color-gray-400 text-sm lg:text-base truncate">
                    {description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/blog/${id}`}
                      className="tracking-tight text-color-gray-300 font-semibold hover:underline hover:underline-offset-4 duration-300 ease-in"
                    >
                      Read More
                    </Link>

                    {comments && comments?.length > 0 && (
                      <div className="flex items-center gap-1">
                        <ChatBubbleBottomCenterTextIcon
                          className="w-4"
                          style={{ color: "#34382c" }}
                        />
                        <small>{comments?.length}</small>
                      </div>
                    )}
                  </div>
                  {user && user.uid === userId && (
                    <DeleteArticle id={id} imageUrl={imageUrl} />
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </AnimatePage>
  );
};

export default Home;
