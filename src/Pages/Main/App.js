import './App.css';
import Navbar from '../../Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Details from '../Details/Details';
import { Flipper, Flipped } from 'react-flip-toolkit';

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
        <Route render={(routerDetails) => {
          return (
              <Flipper flipKey={routerDetails.location.pathname}>
                <Switch location={routerDetails.location}>
                  <Route exact path="/" component={Home} />
                  <Route path="/details/:foodId" component={Home} />
                </Switch>
              </Flipper>
            );
          }} />
      </div>
    </Router>
  );
}

export default App;
