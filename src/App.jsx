import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./Body";
import Login from "./Login";
import Test from "./Test";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
