import { UserStories } from '../../components/pages/UserStories/UserStories';
import { useRouter } from 'next/router';
import React from 'react';

export default function Stories() {
  const router = useRouter();
  const { userId } = router.query;
  return <UserStories userId={userId} />;
}
