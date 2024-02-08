import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import PodcastCard from "../components/Common/PodcastsFolder/PodcastCard";
import InputComponent from "../components/Common/Input";
export default function PodcastPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  console.log(podcasts);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        console.log(podcastData);
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  let filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div>
      <Header />
      <div className="input-wrapper" style={{ marginTop: "2rem" }}>
        <h1>Discover Podcasts</h1>
        <InputComponent
          type="text"
          placeholder="Search By Title"
          required={true}
          state={search}
          setState={setSearch}
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcasts Not Found" : "No Podcastes exists"}</p>
        )}
      </div>
    </div>
  );
}
