import './App.css';
import Navbar from '../../Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Details from '../Details/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:foodId" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
