import {React} from 'react'
import {Link,useNavigate} from 'react-router-dom';
export default function Nav() {
  const auth=localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/register');
  }
  return (
    <div>
        {auth ? 
        <ul className='nav-ul'>
            <li> <Link to="/">Products</Link></li>
            <li> <Link to="/add-product">Add Product</Link></li>
            <li> <Link to="/update/:id">Update Product</Link></li>
            <li> <Link to="/profile">Profile</Link></li>
            <li><Link  onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link> </li>
        </ul>
        :
        <ul className='nav-ul nav-right'>
           <li> <Link to="/register">Signup</Link></li>
            <li> <Link to="/login">Login</Link></li>
        </ul>
}
    </div>
  )
}
 {/* <li>{ auth ? <Link  onClick={logout} to="/register">Logout</Link> : 
            <Link to="/register">Signup</Link>}</li>
             <li> <Link to="/login">Login</Link></li> */}
