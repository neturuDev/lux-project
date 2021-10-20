import { render, screen, fireEvent } from '@testing-library/react';
import SelectionsList from './SelectionsList';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import reducer from '../store/reducers';
import { createStore } from 'redux';

const renderWithRedux = (
  component,
  {initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}


const testSelectionsList = [{_id: 'selection id', author: 'Selection author', title: 'Selection title', email: 'testemail@email.com'}];

describe('Selections list test', () => {

  it('Selections list is rendered', async () => {
    renderWithRedux(<Router><SelectionsList selections={testSelectionsList}/></Router>);
    const selectionAuthorElement = screen.getByText(/Selection author/i);
    const selectionTitleElement = screen.getByText(/Selection title/i);
    const selectionEmailElement = screen.getByText(/testemail@email.com/i);
    expect(selectionAuthorElement).toBeInTheDocument();
    expect(selectionTitleElement).toBeInTheDocument();
    expect(selectionEmailElement).toBeInTheDocument();
  });

});