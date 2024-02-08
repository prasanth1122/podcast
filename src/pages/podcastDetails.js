import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";
import EpisodeDetails from "../components/Common/PodcastsFolder/PodcastCard/EpisodeDetails";
import AudioPlayer from "../components/Common/PodcastsFolder/AudioPlayer";
export default function PodcastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState({});
  const [playingFile, setPlayingFile] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);
  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("no match found");
        toast.error("No Podcast found");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  console.log(podcast, "acmakcm");
  console.log(auth.currentUser.uid, "ccccc");
  return (
    <div>
      <Header />
      <div
        className="input-wrapper"
        style={{ marginTop: "2rem", marginBottom: "4rem" }}
      >
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 style={{ textAlign: "left", width: "100%" }}>
                {podcast.title}
              </h1>
              {podcast.createBy == auth.currentUser.uid && (
                <Button
                  style={{ width: "200px", margin: "0" }}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-desc">{podcast.description}</p>
            <h1 className="episodes">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, i) => {
                  return (
                    <EpisodeDetails
                      key={i}
                      index={i + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
}
