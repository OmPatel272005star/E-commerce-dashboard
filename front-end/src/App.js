import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Productlist from './components/Productlist';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav/>
       <Routes>
        
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Productlist/>}></Route>
        <Route path="/add-product" element={<AddProduct/>}></Route>
        <Route path="/update/:id" element={<UpdateProduct/>}></Route>
        <Route path="/logout" element={<h1>Logout Product compoenents</h1>}></Route>
        <Route path="/profile" element={<h1>Profile Product compoenents</h1>}></Route>
        </Route>

        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
       </Routes>
     </BrowserRouter>
       <Footer/>
    </div>
  );
}

export default App;
