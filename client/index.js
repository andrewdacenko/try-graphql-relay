import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ApolloProvider, ApolloClient } from 'react-apollo';

import SongCreate from './components/SongCreate';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={SongList}/>
            <Route exact path="/songs/new" component={SongCreate}/>
            <Route path="/songs/:id" component={SongDetail}/>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root/>,
  document.querySelector('#root')
);
