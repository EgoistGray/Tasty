import './App.css';
import Navbar from '../../Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import { Flipper, Flipped } from 'react-flip-toolkit';

function App() {
  return (
    <Router>
      <div className="App" onScroll={console.log(1)}>
        <Navbar />
        <Route render={(routerDetails) => {
          return (
            <Flipper flipKey={`${routerDetails.location.pathname}`}> 
                <Switch location={routerDetails.location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/details/:foodId" component={Home} />
                    <Route path="/about" component={About} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Flipper>
          );
        }} />
      </div>
    </Router>
  );
}

export default App;
