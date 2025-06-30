import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import App from '../App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

test('renders Reminisce heading', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getByText(/Reminisce/i);
  expect(headingElement).toBeInTheDocument();
}); 