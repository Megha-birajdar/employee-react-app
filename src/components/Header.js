import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("employee/employeeList");
      }
      else {
        dispatch(
          removeUser()
        );
        navigate("/");
      }
    });
    return () => unsubscribe();

  }, []);
  return (
    <div className=" w-2/12 float-right -my-12 ">
      {user && (
        <button onClick={handleSignOut} className=" font-bold rounded-lg border-2 border-black bg-slate-500 float-right text-black mr-4 p-2 ">
          Sign Out
        </button>
      )}
    </div>
  )
};
export default Header;