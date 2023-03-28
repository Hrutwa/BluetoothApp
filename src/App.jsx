import { useState } from "react";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import "./styles/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <SignUp /> */}
      <Home />
    </div>
  );
}

export default App;
