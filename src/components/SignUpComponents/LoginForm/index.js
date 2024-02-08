import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setuser } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { toast } from "react-toastify";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogin() {
    console.log("login");
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        dispatch(
          setuser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login Successfull");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.error(e);
        setLoading(false);
        toast.error("User not found");
      }
    } else {
      toast.error("email amd password are required");
      setLoading(false);
    }
  }
  function forgotPassword() {
    console.log("reset password");

    sendPasswordResetEmail(auth, email)
      .then(toast.success("reset link sent to email"))
      .catch((error) => {
        // Some error occurred.
        toast.error(error);
      });
  }
  return (
    <>
      <InputComponent
        type="email"
        placeholder="Email"
        required={true}
        state={email}
        setState={setEmail}
      />
      <InputComponent
        type="password"
        placeholder="Password"
        required={true}
        state={password}
        setState={setPassword}
      />

      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <p onClick={forgotPassword}>Forgot Password?</p>
    </>
  );
}
