import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
function UpdateProduct() {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])
    const getProductDetails=async()=>{
        console.log(params);
        let result=await  fetch(`http://localhost:3000/product/${params.id}`);
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }
    const updateProduct=async (req,res)=>{
        console.log(name,price,category,company);
        let result=await fetch(`http://localhost:3000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.log(result);
        navigate('/');
    }
  return (
    <div className='product '>
       <h1> update product</h1>
       <input type='text' placeholder='Enter product name' className='inputbox' value={name}  onChange={(e)=>{setName(e.target.value)}}/>
       
       <input type='text' placeholder='Enter product price' className='inputbox' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
       
       <input type='text' placeholder='Enter product category' className='inputbox' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
       
       <input type='text' placeholder='Enter product compnay'className='inputbox' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
       
       <button className='appbutton' onClick={updateProduct}>update product</button>
    </div>
  )
}

export default UpdateProduct