import { render, screen } from '@testing-library/react';
import SelectionsListItem from './SelectionsListItem';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../store/reducers';
import { BrowserRouter as Router } from "react-router-dom";

const renderWithRedux = (
  component,
  {initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('Selections list item test', () => {

  it('Selections list item is rendered', async () => {
    renderWithRedux(<Router><SelectionsListItem title="Test title" author="Test Author" id="selectionId" email="testemail@email.com"/></Router>);
    const selectionAuthorElement = screen.getByText(/Test Author/i);
    const selectionTitleElement = screen.getByText(/Test title/i);
    const selectionEmailElement = screen.getByText(/testemail@email.com/i);
    expect(selectionAuthorElement).toBeInTheDocument();
    expect(selectionTitleElement).toBeInTheDocument();
    expect(selectionEmailElement).toBeInTheDocument();
  });

});