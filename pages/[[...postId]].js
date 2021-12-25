import { HomePage } from '../components/pages/HomePage/HomePage';
import { useRouter } from 'next/router';
import { PostPage } from '../components/pages/PostPage';
import { NavBar } from '../components/NavBar/NavBar';
import { useSelect } from '@wordpress/data';
import React from 'react';

export default function index() {
  const isExpanded = useSelect((select) =>
    select('ig-posts').getExpandedPost()
  );

  const router = useRouter();
  const pathnames = router.query.postId;
  const postId = pathnames?.[1];

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
          <NavBar />
        </>
      )}
      {postId && !isExpanded && <PostPage postId={postId} />}
    </>
  );
}
