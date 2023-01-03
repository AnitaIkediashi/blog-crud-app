import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import AnimatePage from "../components/mainbar/AnimatePage";

const CreatePage = ({setActive}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    createdAt: Timestamp.now().toDate()
  })

  const [user] = useAuthState(auth)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(0)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleImageChange = (e) => {
    setFormData({...formData, image:e.target.files[0]})
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if(!formData.title || !formData.description || !formData.image) {
      toast.error('Please fill all the fields');
      return;
    } 
    //create a reference to upload image to firebase
    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`)
    //manage upload
    const uploadImage = uploadBytesResumable(storageRef, formData.image)
    //monitor progress
    uploadImage.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setLoading(progress);
    },
    (err) => {
      console.log(err.message)
    }, 
    //when upload is complete
    () => {

      //getDownloadUrl of the image
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        //get the data from database
        const articleRef = collection(db, 'blogs')
        addDoc(articleRef, {
          title: formData.title,
          description: formData.description,
          imageUrl: url,
          createdAt: Timestamp.now().toDate(),
          createdBy: user.displayName,
          userId: user.uid,
          likes: [],
          comments: []
        })
        .then(() => {
          toast.success('Upload Successful')
          navigate("/");
          setActive('home')
          setFormData({
            title: '',
            description: '',
            image: ''
          })
          setLoading(0)
        })
        .catch((err) => {
          toast.error('Error adding blog')
        })
      })
    }
    );

  }

  return (
    <AnimatePresence>
      <AnimatePage>
        <div className="flex items-center h-screen justify-center">
          <div className="w-[500px] mx-auto shadow-lg rounded-md p-4 border border-color-gray-200">
            <h2 className="font-semibold font-Unbounded py-3 text-lg text-color-gray-400 text-center">
              Create Article
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-color-gray-400 font-semibold ">
                  Title:
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent px-2 py-3 border border-color-gray-300 rounded-md  overflow-x-auto text-color-gray-400"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-color-gray-400 font-semibold ">
                  Description:
                </label>
                <textarea
                  className="w-full h-24 overflow-y-scroll hide-scroll bg-transparent px-2 py-3 border border-color-gray-300 rounded-md text-sm text-color-gray-400"
                  name="description"
                  value={formData.description}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
              <button
                className="bg-color-gray-400 rounded-md py-2 flex justify-center items-center gap-3"
                onClick={handleUpload}
              >
                {loading === 0 ? null : (
                  <motion.span
                    className="w-10 h-10 rounded-full border-color-gray-100 border-[5px] border-b-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  ></motion.span>
                )}
                <span className="text-color-gray-100 font-semibold tracking-wider">
                  Upload
                </span>
              </button>
            </form>
          </div>
        </div>
      </AnimatePage>
    </AnimatePresence>
  );
};

export default CreatePage;
