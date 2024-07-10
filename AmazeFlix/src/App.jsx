import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/movie/:id" component={MovieDetail} />
            </Switch>
        </Router>
    );
}

export default App;
