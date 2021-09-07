import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { Home } from "./container/Home";
import { Post } from "./container/Post";

function App() {
  return (
    <main>
      <section>
        <Router>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:subject/:id" exact>
            <Post />
          </Route>
        </Router>
      </section>
    </main>
  );
}
export default App;
