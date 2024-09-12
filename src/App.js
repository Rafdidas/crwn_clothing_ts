import Home from './components/routes/home.component';
import { Routes, Route, Outlet } from 'react-router-dom';


const Navigation = () => {
  return(
    <div>
      <div>
        <h1>Navigation</h1>
      </div>
      <Outlet/>
    </div>
  );
}

const Shop = () => {
  return(
    <div>
      <h1>Shop</h1>
    </div>
  );
}

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop/>} />
      </Route>
    </Routes>
  );
}

export default App;
