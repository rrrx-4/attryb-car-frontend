import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedLayout from './pages/SharedLayout';
import AllCars from './pages/AllCars';
import AddCar from './pages/AddCar';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<ProtectedRoute> <SharedLayout></SharedLayout> </ProtectedRoute>}>
          <Route index element={<AllCars></AllCars>} ></Route>
          <Route path='/addcar' element={<AddCar ></AddCar>} ></Route>
        </Route>

        <Route path='/register' element={<Register></Register>} ></Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
