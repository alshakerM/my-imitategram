import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { NavBar } from "./NavBar/NavBar";
import { PostPage } from "./PostPage";
import { UsersStoryPage } from "./UsersStoryPage/UsersStoryPage";
import { UserStories } from "./UserStories/UserStories";
/**      <Route
        path="/stories/:userId/"
        render={(match) => <UserStories userId={match.match.params.userId} />}
      ></Route> */
function App() {
  const [isExtended, setIsExtended] = React.useState(false);

  return (
    <BrowserRouter>
      <Route
        path="/p/:postId"
        render={(match) => (
          <>
            <NavBar></NavBar>
            <PostPage
              isFloating={isExtended}
              postId={match.match.params.postId}
            />
          </>
        )}
      ></Route>

      <Route
        path="/stories/:userId/"
        render={(match) => (
          <UsersStoryPage userId={match.match.params.userId} />
        )}
      ></Route>
      <Route path="/" exact={!isExtended}>
        <NavBar></NavBar>
        <HomePage setIsExtended={setIsExtended} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
