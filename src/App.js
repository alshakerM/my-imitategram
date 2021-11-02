import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { PostPage } from "./PostPage";
import React from "react";
import { NavBar } from "./NavBar/NavBar";


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
