import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import BooksPage from "./pages/BooksPage";
import SingleBookPage from "./pages/SingleBookPage";
import './App.css';

function App() {
  return (
    <div className="page">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:bookId">
            <SingleBookPage />
          </Route>
          <Route exact path="/">
            <BooksPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
