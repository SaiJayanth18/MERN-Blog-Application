const express = require('express')
const app = express()
const port = process.env.PORT||5000
const cors= require('cors')


//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})


//mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://saijayanthjampa:nPbpurmDbQWRS8Pj@cluster0.rpypbux.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //Create a collection of documents
const bookscollection= client.db("BookInventory").collection("books");
//Insert document into collection
app.post("/upload-book", async(req, res)=>{
const data=req.body;
const result=await bookscollection.insertOne(data);
res.send(result);
})

//Get all books from the database
/*app.get("/all-books",async(req,res)=>{
    const books=bookscollection.find();
    const result=await books.toArray();
    res.send(result);
})*/


//update a book data: patch or update methods
app.patch("/book/:id", async(req,res)=>{
  const id=req.params.id;
  console.log(id);
  const updateBookData=req.body;
  const filter={_id: new ObjectId(id)};
  const updateDoc={
    $set:{
      ...updateBookData
    },
  }
    const options={upsert:true};
    //update
    const result= await bookscollection.updateOne(filter,updateDoc,options);
    res.send(result);
})


//Delete a book's data
app.delete("/book/:id",async(req, res)=>{
  const id=req.params.id;
  const filter={_id: new ObjectId(id)};
  const result=await bookscollection.deleteOne(filter);
  res.send(result);
})


//Find by category:-Eg. http://localhost:5000/all-books?category=Fiction
app.get("/all-books",async(req,res)=>{
  let query={};
  if(req.query?.category){
    query={category:req.query.category}
  }
  const result=await bookscollection.find(query).toArray();
  res.send(result);
})


//to get single book data
app.get("/book/:id",async(req,res)=>{
  const id= req.params.id;
  const filter={_id: new ObjectId(id)};
  const result=await bookscollection.findOne(filter);
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})