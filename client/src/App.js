import './App.css';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatedPokemon from './components/CreatedPokemon';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/:id' component={Details} />
          <Route path='/create' component={CreatedPokemon} />
        </Switch>      
      </div>
      </BrowserRouter>
  );
}

export default App;
