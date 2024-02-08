import React from "react";
import Header from "../components/Common/Header";
import CreatePodcastForm from "../components/Common/StartPodcast/CreatepodcastForm";
export default function CreatePodcast() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create a Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
}
