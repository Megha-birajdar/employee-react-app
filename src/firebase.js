import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVyHDPRWhRvIjGT4ZAN9KXcqsMuQO-fT4",
  authDomain: "authentication-4193f.firebaseapp.com",
  projectId: "authentication-4193f",
  storageBucket: "authentication-4193f.appspot.com",
  messagingSenderId: "538657254922",
  appId: "1:538657254922:web:cd6a628415df5a52d279f3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
