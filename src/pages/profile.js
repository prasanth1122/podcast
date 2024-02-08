import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Common/Header";
import Button from "../components/Common/Button";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/Common/Loader";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import PodcastCard from "../components/Common/PodcastsFolder/PodcastCard";
import FileInput from "../components/Common/Input/fileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export default function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  const [podcastData1, setPodcastData1] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [uploadProfile, setUploadProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [srcLen, setSrcLen] = useState(0);
  const [img, setImg] = useState("");
  let image = "";
  let srclength = uploadProfile.length;
  useEffect(() => {
    if (srclength > 0) {
      setSrcLen(uploadProfile.length);
      setImg(uploadProfile[srclength - 1].prfImage);
    } else {
      setImg("");
    }
  }, [uploadProfile, srclength, srcLen]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users", auth.currentUser.uid, "profileImage")),
      (querySnapshot) => {
        const profileImgSrc = [];
        querySnapshot.forEach((doc) => {
          profileImgSrc.push({ id: doc.id, ...doc.data() });
        });
        console.log(profileImgSrc, "qqqqqqq");
        setUploadProfile(profileImgSrc);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        console.log(podcastData);
        setPodcastData1(podcastData);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  let yourPodcasts = [];
  podcastData1.forEach((item) => {
    if (item.createBy == auth.currentUser.uid) {
      yourPodcasts.push(item);
    }
  });

  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfull");
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  console.log(srclength);
  console.log(auth.currentUser.uid);
  console.log(uploadProfile[srclength - 1], "profileIMGS");

  console.log(image, img, "Image");

  function displayProfileHandle(file) {
    setProfileImage(file);
  }
  async function handleProfile() {
    setLoading(true);
    if (profileImage) {
      try {
        const profileImageRef = ref(
          storage,
          `profileImages/${auth.currentUser.uid}`
        );
        await uploadBytes(profileImageRef, profileImage);

        const profileImageUrl = await getDownloadURL(profileImageRef);

        const profileImageData = {
          prfImage: profileImageUrl,
          createBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(
          collection(db, "users", auth.currentUser.uid, "profileImage"),
          profileImageData
        );
        setLoading(false);
        setProfileImage(profileImageData);
        toast.success("Profie Image created");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  if (!user) {
    return <Loader />;
  } else {
    return (
      <div>
        <Header />
        <div className="profileHeader">
          <h1>Your Profile</h1>
          <div className="profieImg">
            <img src={img} className="srcImage" />
          </div>
          <FileInput
            accept={"image/+"}
            id="select-profile"
            fileHandleFnc={displayProfileHandle}
            text={"Profile Image Upload"}
          />
          <Button
            disabled={loading}
            text={loading ? "Loading.." : "Upload"}
            onClick={handleProfile}
          />
        </div>
        <h1 className="h2">Your Podcasts</h1>
        {yourPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "2.5rem" }}>
            {yourPodcasts.map((item) => {
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
          <p>No Podcasts created bu User</p>
        )}
        <div className="logout">
          <Button
            text="Logout"
            onClick={handleLogout}
            style={{ width: "30vw" }}
          />
        </div>
      </div>
    );
  }
}
