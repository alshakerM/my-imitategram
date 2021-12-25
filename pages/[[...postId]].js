import { HomePage } from '../components/pages/HomePage/HomePage';
import { useRouter } from 'next/router';
import { PostPage } from '../components/pages/PostPage';
import { NavBar } from '../components/NavBar/NavBar';
import { useSelect } from '@wordpress/data';
import React from 'react';
import { UserProfile } from '../components/pages/UserProfile/UserProfile';

export default function index() {
  const isExpanded = useSelect((select) =>
    select('ig-posts').getExpandedPost()
  );

  const router = useRouter();
  const pathNames = router.query.postId;
  // when post, url /p/32423432-234sdfdsfdsf2342csd-332 ['p', '32423432-234sdfdsfdsf2342csd-332']
  // when user, /marwan.alshaker ['marwan.alsahker'] ((the viewer wants a user's page))
  const postId = pathNames?.[1];
  const userName = pathNames?.[0];
  if (
    pathNames?.length === 1 ||
    ['channel', 'tagged'].includes(pathNames?.[1])
  ) {
    return (
      <>
        <NavBar />
        <UserProfile userName={userName} />
      </>
    );
  }
  return (
    <>
      {!postId && !isExpanded && (
        <>
          <HomePage /> <NavBar />
        </>
      )}
      {postId && isExpanded && (
        <>
          <HomePage />
          <PostPage postId={postId} isFloating={isExpanded} />
        </>
      )}
      {postId && !isExpanded && (
        <>
          <NavBar />
          <PostPage postId={postId} />
        </>
      )}
    </>
  );
}
