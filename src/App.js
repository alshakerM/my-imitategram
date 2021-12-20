import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './HomePage/HomePage';
import { Messages } from './Messages/Messages';
import { NavBar } from './NavBar/NavBar';
import { PostPage } from './PostPage';
import { SuggestionPage } from './SuggestionsPage/SuggestionPage';
import { UserProfile } from './UserProfile/UserProfile';
import { UserStories } from './UserStories/UserStories';
import { lockBodyScrolls } from './utils';
import { useSelect } from '@wordpress/data';

function App() {
  const isExpanded = Boolean(
    useSelect((select) => select('ig-posts').getExpandedPost())
  );
  lockBodyScrolls(isExpanded);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/stories/:userId/"
          exact
          render={(match) => <UserStories userId={match.match.params.userId} />}
        ></Route>
        <Route path="/" >
          <Switch>
            <Route
              path="/p/:postId"
              render={(match) => (
                <>
                  {!isExpanded && <NavBar />}
                  <PostPage
                    isFloating={isExpanded}
                    postId={match.match.params.postId}
                  />
                </>
              )}
            ></Route>
            <NavBar />
          </Switch>
          <Route
            path={['/direct/t/:fromUserId', '/direct/inbox/']}
            render={(match) => (
              <Messages fromUserId={match.match.params.fromUserId} />
            )}
          ></Route>
          <Route path="/explore/people/" exact>
            <SuggestionPage />
          </Route>
          <Route path="/" >
            <HomePage />
          </Route>
          <Route
            path={['/:userName', '/:userName/channel/', '/:userName/tagged/']}
            exact
            render={(match) => (
              <UserProfile userName={match.match.params.userName} />
            )}
          ></Route>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
