import { Switch, Route } from 'react-router';

// Components
import HomePage from './Components/HomePage';
import NotFound from './Components/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
