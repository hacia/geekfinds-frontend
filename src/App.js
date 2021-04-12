import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Nav from './components/Nav/index';
import Home from './components/Home/index';
import Admin from './components/Admin/index';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <main role="main" className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
