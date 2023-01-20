import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';


const httpLink = new HttpLink({
  uri: "https://skilltaxonomyprod-production.up.railway.app"
});

const client = new ApolloClient({
  link:httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);