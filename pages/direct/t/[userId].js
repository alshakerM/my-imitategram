import { Messages } from '../../../components/pages/Messages/Messages';
import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar/NavBar';
import React from 'react';

export default function Inbox() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <>
      <NavBar />
      <Messages fromUserId={userId} />
    </>
  );
}
