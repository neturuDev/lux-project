import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import LinkButton from './components/LinkButton';

import BooksPage from "./pages/BooksPage";
import OneBookPage from "./pages/OneBookPage";
import SelectionsPage from "./pages/SelectionsPage";
import OneSelectionPage from "./pages/OneSelectionPage";



function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative">
          <Toolbar>
            <Stack direction="row" spacing={2}>
              <LinkButton variant="contained" color="warning" to="/books">Books</LinkButton>
              <LinkButton variant="contained" color="warning" to="/selections">Selections</LinkButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
     
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/">
            <Redirect to='/books' />
          </Route>
          <Route exact path="/books">
            <BooksPage />
          </Route>
          <Route exact path="/books/:bookId">
            <OneBookPage />
          </Route>
          <Route exact path="/selections">
            <SelectionsPage />
          </Route>
          <Route exact path="/selections/:selectionId">
            <OneSelectionPage />
          </Route>
        </Switch>
      </Container>
      
    </Router>
  );
}

export default App;
