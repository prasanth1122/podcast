import React, { useState } from "react";
import Header from "../components/Common/Header";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/Common/Input";
import FileInput from "../components/Common/Input/fileInput";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
export default function EpisodePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function audioFileHandle(file) {
    setAudioFile(file);
  }
  async function handleSubmit() {
    setLoading(true);
    if ((title, description, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title,
          description,
          audioFile: audioURL,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode created");
        navigate(`/podcast/${id}`);
        setTitle("");
        setDescription("");
        setAudioFile(null);
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All files are required");
      setLoading(false);
    }
  }
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create an Episode</h1>
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
          accept={"audio/+"}
          id="banner-image-input"
          fileHandleFnc={audioFileHandle}
          text={"upload Audio File"}
        />
        <Button
          disabled={loading}
          text={loading ? "Loading.." : "Create Episode"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
