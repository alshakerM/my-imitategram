import { NavBar } from '../../components/NavBar/NavBar';
import { Suggestions } from '../../components/Suggestions/Suggestions';
import React from 'react';

export default function index() {
  return (
    <>
      <NavBar />
      <Suggestions isExpanded />
    </>
  );
}
