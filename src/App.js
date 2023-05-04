import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Nav from './Routes/Nav/nav.component';
import Home from './Routes/Home/home.component';
import ParkPage from './Routes/ParkPage/park-page.component';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route index element={<Home />} />
          <Route path=':park' element={<ParkPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
