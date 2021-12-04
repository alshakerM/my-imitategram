import { NavBar } from '../NavBar/NavBar';
import { Suggestions } from '../Suggestions/Suggestions';

export function SuggestionPage() {
  return (
    <>
      <NavBar />
      <Suggestions isExpanded />
    </>
  );
}
