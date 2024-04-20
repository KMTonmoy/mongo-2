const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//^ MiddleWires
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://tonmoyahamed2009:tonmoytoma5200@cluster0.zsmqyom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        const database = client.db("usersDB");
        const usersColection = database.collection("users");

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log("new User", user);
            const result = await usersColection.insertOne(user);
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Simple Crud Is Running ')
})

app.listen(port, () => {
    console.log(`Simple Crud Is Running on Port:  ${port}`)
})