const express=require('express');
require('./DB/config');
const app=express();
const User=require('./DB/User');
const Product=require('./DB/Product');

const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';


const cors=require('cors');
app.use(express.json());
app.use(cors());

app.post('/register',async (req,resp)=>{
  let user=new User(req.body);
  let result=await user.save();
  result=result.toObject();
  delete result.password;
  //resp.send(result);
  if(user){
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
      if(err){
        resp.send({result:"something went wrong"})
      }
      resp.send({result,auth:token});
    })
  }else{
    resp.send({result: "no result found"});
  }
});

app.get('/get',async(req,resp)=>{
  let user= await User.find({});
  return resp.json(user);
})
app.post('/login', async (req,resp)=>{
  console.log(req.body);
  if(req.body.password && req.body.email){
  let user= await User.findOne(req.body).select("-password");
  if(user){
    Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
      if(err){
        resp.send({result:"something went wrong"})
      }
      resp.send({user,auth:token});
    })
  }else{
    resp.send({result: "no result found"});
  }
}
});

app.patch('/update/:email', async (req, res) => {
  try {
    const { email } = req.params;  
    const updatedUserFields = { 
      email: 'email@gmail.com',   
    };
    let updatedUser = await User.findOneAndUpdate({ email }, updatedUserFields, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });0
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete('/delete/:email', async (req, res) => {
  try {
    const { email } = req.params;
    let deletedUser = await User.findOneAndDelete({ email });
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post('/add-product',async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})

app.get('/products',async(req,res)=>{
  let products=await Product.find();
  if(products.length>0){
    res.send(products);
  }
  else{
    res.send({message:'No products fpund'});
  }
});

app.get('/product/:id',async(req,res)=>{
  let result=await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }else{
    res.send({message:'result not found'});
  }
});


app.put('/product/:id',async(req,res)=>{
   let result=await Product.updateOne(
    {_id:req.params.id},
     {
      $set : req.body
     }
   )
   res.send(result);
});

app.get('/search/:key',async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
    ]
  });
  res.send(result);
})

app.listen(3000,()=>{
    console.log('server started on port 3000');
})