import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Messages } from './Messages/Messages';
import { NavBar } from './NavBar/NavBar';
import { PostPage } from './PostPage';
import { UserProfile } from './UserProfile/UserProfile';
import { UserStories } from './UserStories/UserStories';
import { Suggestions } from './Suggestions/Suggestions';

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
        exact
        render={(match) => <UserStories userId={match.match.params.userId} />}
      ></Route>
      <Route
        path={['/direct/t/:fromUserId', '/direct/inbox/']}
        render={(match) => (
          <Messages fromUserId={match.match.params.fromUserId} />
        )}
      ></Route>
      <Route path="/explore/people/" exact>
        <Suggestions />
      </Route>
      <Route path="/" exact={!isExpanded}>
        <NavBar></NavBar>
        <HomePage setIsExpanded={setIsExpanded} />
      </Route>
      <Route
        path={['/:userName/', '/:userName/channel/', '/:userName/tagged/']}
        exact
        render={(match) => (
          <UserProfile userName={match.match.params.userName} />
        )}
      ></Route>
    </BrowserRouter>
  );
}

export default App;
