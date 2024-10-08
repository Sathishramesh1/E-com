import logo from './logo.svg';
import './App.css';
import GetAllProducts from './productComponent/getAllProducts';
import { Routes,Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import GetCartItems from './productComponent/getCartItems';
import Register from './Auth/Register';
import Login from './Auth/Login';
import SearchData from './SearchData';
import GetSingleProduct from './productComponent/getSingleProduct';

function App() {
  const userId = localStorage.getItem("userId")

  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path="/getAll" element={<GetAllProducts/>}/>
      <Route path="/cart" element={userId ? <Navigate to="/cart" /> : <Login />}/>
      <Route path="/search" element={<SearchData/>}/>
      <Route path='/single/:id' element={<GetSingleProduct/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
     </Routes>
      
    </div>
  );
}

export default App;