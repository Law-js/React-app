// taper rsc et shift => code rapidement un component

import React from "react";

/////////////////////     routage    //////////////////////////////
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import News from "./pages/News";

// + <BrowserRouter><Switch><Route>
////////////////////////////////////////////////////////////////////

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/a-propos" exact component={About} />
          <Route path="/news" exact component={News} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
