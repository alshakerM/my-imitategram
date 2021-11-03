import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { NavBar } from "./NavBar/NavBar";
import { PostPage } from "./PostPage";


function App() {
  const [isExtended, setIsExtended] = React.useState(false);

  return (
    <BrowserRouter>
      <NavBar />
      <Route
        path="/p/:postId"
        render={(match) => <PostPage  isFloating={isExtended} postId={match.match.params.postId} />}
      ></Route>
      <Route path="/" exact={!isExtended}>
        <HomePage setIsExtended={setIsExtended} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
