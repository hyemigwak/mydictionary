import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Post from "../pages/Post";
import PostWrite from "../pages/PostWrite";

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Post}/>
        <Route path="/write/:id" exact component={PostWrite}/>
        <Route path="/write" exact component={PostWrite}/>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
