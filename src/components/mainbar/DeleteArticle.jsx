import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/Config";

const DeleteArticle = ({id, imageUrl}) => {
  const handleDelete = async() => {
    if(window.confirm('Are you sure you want to delete this article')) {
      try {
        //delete document
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Article deleted Successfully");
        //delete image
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        toast.error("Erorr deleting article");
        // console.log(error.message);
      }
    }
  }

  return <div className="w-8 h-8 rounded-md bg-color-gray-400 text-color-gray-100 absolute top-2 right-2 z-10 grid place-items-center" onClick={handleDelete}>
    <TrashIcon className="w-6" />
  </div>;
};

export default DeleteArticle;
