import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import env from './env';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/reset.css';
import { Dashboard } from './routes/dashboard';
import { UserDetail } from './routes/user-detail';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetail />}></Route>
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </Router>
  );
};

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
