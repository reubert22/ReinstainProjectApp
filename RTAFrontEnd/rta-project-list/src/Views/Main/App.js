//@flow
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../Login';
import Home from '../Home/Home';

class App extends PureComponent<> {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/Home" render={() => <Home />} />
        </div>
      </Router>
    );
  }
}

export default App;
