import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
function Productlist() {
    const [Products , setProducts]=useState([]);

    useEffect(()=>{
       getProducts();
    },[]);

    const getProducts=async (req,res)=>{
        let result=await fetch('http://localhost:3000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
             result=await result.json();
             setProducts(result);
    }
    console.log('products',Products);

    const deleteProduct=async(id)=>{
            let result=fetch(`http://localhost:3000/product/${id}`,{
                method:'Delete'
            });
            result=(await result).json();
            if(result){
                getProducts();
            }
    }

    const searchHandle=async(e)=>{
       let key=e.target.value;
       if(key){
       let result=await fetch(`http://localhost:3000/search/${key}`);
       result=await result.json();
       if(result){
           setProducts(result);
       }
    }else{
         getProducts();
    }
    }
  return (
    <div className='products-list'>
        <h3>Product list</h3>
        <input className='search-product-box' type='text' placeholder='Serch Product' 
        onChange={searchHandle}
        />
        <ul>
            <li>S. No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>operation</li>
        </ul>
        {
            Products.map((item,index)=>
        <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
              <Link to={'/update/'+item._id} >Update</Link>
            </li>

        </ul>
            )
        }
    </div>
  )
}

export default Productlist