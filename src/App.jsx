import { BrowserRouter, Routes, Route } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import RequireAuth from "./utils/RequireAuth";
import "./styles/App.css";

import { createContext, useState } from "react";
export const UserContext = createContext(null);
function App() {
  const [authUser, setAuthUser] = useState(null);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ authUser, setAuthUser, userSignOut }}>
          <Routes>
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
