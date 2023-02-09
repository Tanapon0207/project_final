const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases')
})


const { MongoClient } = require("mongodb");
const uri = "mongodb://Admin:63104111@127.0.0.1:27017/?authMechanism=DEFAULT&authSource=db_project";
const connectDB = async() => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();


// Read All API
app.get('/complaints', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('db_project').collection('admin')
        .find({}).limit(4378).toArray();

    await client.close();
    res.status(200).send(objects);
})


// Create API
app.post('/complaints/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('db_project').collection('admin').insertOne({
        id: parseInt(object.id),
        "username": object.username,
        "password": object.password,
        "position": object.position
        
       
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object
    });
})




const { ObjectId } = require('mongodb')
app.put('/complaints/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('db_project').collection('admin').updateOne({ '_id': ObjectId(id) }, {
        "$set": {
        "_id": ObjectId(id),
        "username": object.username,
        "password": object.password,
        "position": object.position,
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is updated",
        "object": object
    });
})


// Delete API
app.delete('/complaints/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('db_project').collection('admin').deleteOne({ '_id': ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is deleted"
    });
})

// Read by id API
app.get('/complaints/:id', async(req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('db_project').collection('admin').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Complaint with ID = " + id + " is deleted",
        "object": user
    });
})

// Read by id API
app.get('/complaints/findtext/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('db_project').collection('admin').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaints": objects
    });
})

// Query by filter API: Search text from Product Name
app.get('/complaints/Make/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('db_project').collection('admin').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(4378).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})