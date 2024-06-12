import { useRef, useState } from "react";
import { checkValidData } from "../Utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    console.log(email.current.value, password.current.value, "megha");
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  }
  return (
    <div>

      <div>
        <img
          className="absolute bg-white w-full"
          src="data:image/jpeg;base64,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"
          alt="image"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()}
        className="w-1/4 absolute p-4 bg-sky-600 my-4 mx-auto right-0 left-0"
      >
        <h1 className="font-bold text-3xl p-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-2 w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full"
        />
        <p className="text-red font-bold text-lg py-2">{errorMessage}
        </p>
        <button
          className="p-2 my-2 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer"
          onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to App? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;