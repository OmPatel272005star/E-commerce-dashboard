import React,{useState} from 'react'
import '../App.css'
function AddProduct() {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false);
    const addProduct=async (req,res)=>{
        
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        } 
        
        console.log(name,price,category,company);
        const userId=JSON.parse(localStorage.getItem('user'))._id;
        const result=await fetch('http://localhost:3000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        const response=await result.json();
        console.log(response);
    }
  return (
    <div className='product '>
       <h1> Add product</h1>
       <input type='text' placeholder='Enter product name' className='inputbox' value={name}  onChange={(e)=>{setName(e.target.value)}}/>
       {error && !name && <span className='invalid-input'>Enter valid name</span>}
       <input type='text' placeholder='Enter product price' className='inputbox' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
       {error && !price && <span className='invalid-input'>Enter valid  price</span>}
       <input type='text' placeholder='Enter product category' className='inputbox' value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
       {error && !category && <span className='invalid-input'>Enter valid category</span>}
       <input type='text' placeholder='Enter product compnay'className='inputbox' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
       {error && !company && <span className='invalid-input'>Enter valid company</span>}
       <button className='appbutton' onClick={addProduct}>Add product</button>
    </div>
  )
}

export default AddProduct