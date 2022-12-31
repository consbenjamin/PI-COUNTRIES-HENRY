import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Creator from './Components/Creator/Creator';
import Detail from './Components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/activities' component={Creator}/>
          <Route exact path='/home/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
