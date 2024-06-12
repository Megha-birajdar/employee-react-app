import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkbb2SmFrUwauKiQPJqLzG0jRJFQgwDm4",
  authDomain: "employeetrainingapp.firebaseapp.com",
  projectId: "employeetrainingapp",
  storageBucket: "employeetrainingapp.appspot.com",
  messagingSenderId: "493398345347",
  appId: "1:493398345347:web:a67d2d1ab55b37e7b53db6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();