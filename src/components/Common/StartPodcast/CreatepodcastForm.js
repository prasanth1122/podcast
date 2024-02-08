import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import FileInput from "../Input/fileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
export default function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit() {
    if (title && description && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageUrl = await getDownloadURL(displayImageRef);
        const podcastData = {
          title,
          description,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDescription("");
        setBannerImage();
        setDisplayImage();
        toast.success("podcast created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Enter all values!");
    }
  }
  function displayImageHandle(file) {
    setDisplayImage(file);
  }
  function bannerImageHandle(file) {
    setBannerImage(file);
  }
  return (
    <>
      <InputComponent
        type="text"
        placeholder="Title"
        required={true}
        state={title}
        setState={setTitle}
      />
      <InputComponent
        type="text"
        placeholder="Description"
        required={true}
        state={description}
        setState={setDescription}
      />
      <FileInput
        accept={"image/+"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Banner Image Upload"}
      />
      <FileInput
        accept={"image/+"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Display Image Upload"}
      />
      <Button
        disabled={loading}
        text={loading ? "Loading.." : "Create podcast"}
        onClick={handleSubmit}
      />
    </>
  );
}
