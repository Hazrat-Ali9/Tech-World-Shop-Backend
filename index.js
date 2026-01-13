const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000


// MiddleWare
app.use(cors())
app.use(express.json())

// TechWorld_Shop
//pGduoPZnJxt2M7X8

const uri = "mongodb+srv://TechWorld_Shop:pGduoPZnJxt2M7X8@cluster0.pdvgnv8.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const Service = client.db('TechWorld_Shop').collection('ServiceSection');
const Brand= client.db('TechWorld_Shop').collection('BrandName');
const BrandSlider= client.db('TechWorld_Shop').collection('BrandSlider');
const Product= client.db('TechWorld_Shop').collection('Brand_Product');
const Cart = client.db('TechWorld_Shop').collection('Mycart');
const CartData = client.db('TechWorld_Shop').collection('Cart');
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // app.delete('/DeletedTOCart/:email',async(req,res)=>{
    //   const email = req.params.email
    //   const find = {email: email}
    //   const body = req.body
    //   const query = {_id : new ObjectId(body._id)}
    //   const result = await Cart.findOne(find)

      
    // })
   app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    const query = {_id : new ObjectId(id)}
    const result = await CartData.deleteOne(query)
    res.send(result)
   })
  
  app.get('/Cart/:email',async(req,res)=>{
    const email = req.params.email
    const query = { email : email}
    const result = await CartData.find(query).toArray()
    res.send(result)
  })
    app.post('/AddtoCart',async(req,res)=>{
      const body = req.body
      const value = await CartData.insertOne(body)
      res.send(value)
    })
    //  app.put('/AddToCart/:email',async(req,res)=>{
    //   const body = req.body
    //  const email = req.params.email
    //  const find =  {email: email}
    //  const option = {upsert : true}
    //  const update = {
    //   $push :{
    //       myCart: body
    //   }

    //  }
    //  const result = await Cart.updateOne(find,update,option)
    //  res.send(result)

    // })

    app.get('/service',async(req,res)=>{
        const cursor = Service.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.post('/myCart',async(req,res)=>{
      const cursor = req.body
      const result = await Cart.insertOne(cursor)
      res.send(result)
    })

   

    app.get('/myCart/:email',async(req,res)=>{
      const email = req.params.email
      const query = { email : email}
      const result = await Cart.findOne(query)
      res.send(result)
    })
    
    app.get('/slider/:name',async(req,res)=>{
         const name = req.params.name
         const query = {brandName : name }
         const result = await BrandSlider.findOne(query)
         res.send(result)
    })

    app.get('/update/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await Product.findOne(query)
      res.send(result)
    })

    app.put('/update/:id',async(req,res)=>{
      const id = req.params.id
      const updateProduct = req.body
      const query = { _id : new ObjectId(id)}
      const option = {upsert : true}
      const update = {
        $set:{
        image : updateProduct.NewPhoto,
        name : updateProduct.NewName,
        brandName: updateProduct.NewBrand,
       type: updateProduct.NewType,
      price: updateProduct.NewPrice,
      Extrarating : updateProduct.NewRating
        }
      }
      const result = await Product.updateOne(query,update,option)
      res.send(result)
    })

    app.post('/Product',async(req,res)=>{
      const data = req.body
      const result = await Product.insertOne(data)
      res.send(result)
    })
    

    app.get('/BrandProduct/:name',async(req,res)=>{
         const BrandName = req.params.name
         const query = {brandName :{$eq : BrandName}}
         const result = await Product.find(query).toArray()
         res.send(result)
    })
  app.get('/BrandProduct',async(req,res)=>{ 
    const AllBrand = Product.find()
    const result = await AllBrand.toArray()
    res.send(result)
  })
  
    app.get('/Brand',async(req,res)=>{
      const cursor = Brand.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
   res.send('The tech world is rocking')
})

app.listen(port,()=>{
    console.log(port,'is running')
})