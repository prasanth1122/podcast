import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setuser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignUp() {
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length > 5 &&
      fullName &&
      email
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });
        dispatch(
          setuser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User has been created");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password != confirmPassword) {
        toast.error("Passwords not match");
      } else if (password.length < 6) {
        toast.error("password length must be more than 6");
      }
      setLoading(false);
      console.error("passwords not match");
    }
  }
  return (
    <>
      <InputComponent
        type="text"
        placeholder="Full Name"
        required={true}
        state={fullName}
        setState={setFullName}
      />
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
      <InputComponent
        type="password"
        placeholder="Confirm Password"
        required={true}
        state={confirmPassword}
        setState={setConfirmPassword}
      />
      <Button
        disabled={loading}
        text={loading ? "Loading.." : "SignUp"}
        onClick={handleSignUp}
      />
    </>
  );
}
