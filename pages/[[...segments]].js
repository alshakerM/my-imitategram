import { HomePage } from '../components/pages/HomePage/HomePage';
import { PostPage } from '../components/pages/PostPage';
import { NavBar } from '../components/NavBar/NavBar';
import { useSelect } from '@wordpress/data';
import React from 'react';
import { UserProfile } from '../components/pages/UserProfile/UserProfile';

export default function CatchAll({ query }) {
  const expandedPostId = useSelect((select) =>
    select('ig-posts').getExpandedPost()
  );

  // when expanded post is closed, the postId from the query remains stuck
  // which means postId is true, and expandedPostId is false, which looks like an independent post
  // this makes sure to keep track of expandedPostId until serverPostId changes (the query resets)
  // keeping them in sync
  const lastExpandedPostId = React.useMemo(
    () => expandedPostId,
    [serverPostId]
  );

  const serverPostId = query?.postId;
  const userName = query?.segments?.[0];
  const onlyComments = query?.comments;

  const userProfile = query?.segments?.length === 1;

  // user profile route
  if (userProfile || ['channel', 'tagged'].includes(query?.segments?.[1])) {
    return (
      <>
        <NavBar userName={userName} />
        <UserProfile userName={userName} />

        {expandedPostId && (
          <PostPage
            postId={expandedPostId}
            isFloating
            onlyComments={onlyComments}
          />
        )}
      </>
    );
  }

  if ((expandedPostId || lastExpandedPostId) && !onlyComments) {
    return (
      <>
        <NavBar />
        <HomePage />
        <PostPage
          postId={expandedPostId || lastExpandedPostId}
          isFloating={!!expandedPostId}
          onlyComments={onlyComments}
        />
      </>
    );
  }

  // independent post id
  if (serverPostId) {
    return (
      <>
        <NavBar />
        <PostPage postId={serverPostId} onlyComments={onlyComments} />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
}

CatchAll.getInitialProps = async function (context) {
  return { query: context.query };
};
