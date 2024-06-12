import employeeStore from "./Utils/employeeStore";
import { Provider, useSelector } from "react-redux";
import Header from "./components/Header";
import { Outlet } from "react-router";
import Login from "./components/Login";


const App = () => {
  const user = useSelector((store) => store.user);

  return (
    <Provider store={employeeStore}>
      <div className="main-layout ">
        <Header />
        {!user && <Login />}
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;
