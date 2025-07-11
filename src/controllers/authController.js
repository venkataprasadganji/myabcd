import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

// 🔐 Email/Password Login
export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user.emailVerified) {
    // 👇 Throw Firebase-style error code for i18n mapping
    const error = new Error("Email not verified");
    error.code = "auth/email-not-verified";
    throw error;
  }

  return user;
};

// 🆕 Signup + Send Email Verification
export const signupWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

// 🔁 Password Reset
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return true;
};

// 🔓 Google Sign-In
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result;
};
