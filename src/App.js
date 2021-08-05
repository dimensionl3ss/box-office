import React from 'react';
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path='/'>
          This is home page.
      </Route>
      <Route exact path='/started'>
          started.
      </Route>
      <Route >
          This is 404.
      </Route>

    </Switch>
    
  );
}

export default App;
