import { HomePage } from "./HomePage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Comments } from "./Comments/Comments";
import data from "./Data/MOCK_DATA.json";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/comments">
          <Comments data={data} />
          </Route>
        <Route path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
