import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Test from "./components/Test";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
