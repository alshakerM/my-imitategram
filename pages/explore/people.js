import { NavBar } from '../../components/NavBar/NavBar';
import { Suggestions } from '../../components/Suggestions/Suggestions';

export default function index() {
  return (
    <>
      <NavBar />
      <Suggestions isExpanded />
    </>
  );
}
