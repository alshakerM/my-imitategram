import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Messages } from './Messages/Messages';
import { NavBar } from './NavBar/NavBar';
import { PostPage } from './PostPage';
import { UserStories } from './UserStories/UserStories';

function App() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <BrowserRouter>
      <Route
        path="/p/:postId"
        render={(match) => (
          <>
            <NavBar></NavBar>
            <PostPage
              isFloating={isExpanded}
              postId={match.match.params.postId}
            />
          </>
        )}
      ></Route>
      <Route
        path="/stories/:userId/"
        render={(match) => <UserStories userId={match.match.params.userId} />}
      ></Route>
      <Route path="/direct/inbox/">
        <NavBar />
        <Messages />
      </Route>
      <Route
        path="/direct/:fromUserId"
        render={(match) => (
          <Messages fromUserId={match.match.params.fromUserId} />
        )}
      ></Route>
      <Route path="/" exact={!isExpanded}>
        <NavBar></NavBar>
        <HomePage setIsExpanded={setIsExpanded} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
