import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import reduxStore from "./utils/reduxStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store = {reduxStore}>
      <BrowserRouter basename = "/">
        <Routes>
          <Route path = "/" element = {<Body />}>
            <Route path = "/" element = {<Feed />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/profile" element = {<Profile />} />
          </Route>
          {/* // <Route path = "/login" element = {<div>login page  </div>} /> */}
          {/* // <Route path = "/test" element = {<div>Test page</div>} /> */}
        </Routes>

      </BrowserRouter>
      {/* <NavBar /> */}
      </Provider>
    </>
  );
}

export default App;
