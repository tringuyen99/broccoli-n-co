import { Switch, Route } from 'react-router';

// Components
import { BrowserRouter } from 'react-router-dom';
import HomePage from './Components/HomePage';
import NotFound from './Components/NotFound';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
