import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Inicio from './components/Inicio';
import Navbar from './components/AppBar';
import FormularioRegistro from './components/FormularioRegistro';
import Signup from './components/Registro';
import Signin from './components/Login';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <hr />
        <Switch>
          <Route path="/" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/dashboard" exact>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
            <Navbar />
            <Inicio />
          </Route>
          <Route path="/extintor">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
            <Navbar />
            <FormularioRegistro />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;