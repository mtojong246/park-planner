import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Nav from './Routes/Nav/nav.component';
import Home from './Routes/Home/home.component';

const App = () => {
  return (
    <>
      <Nav />
      <Home />
    </>
  );
}

export default App;
