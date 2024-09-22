import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';
import Authenticaion from "./routes/authenticaion/authentication.component";


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authenticaion />} />
      </Route>
    </Routes>
  );
}

export default App;
