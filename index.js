const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f1vo05q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // await client.connect();
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const teamMembersCollections = client.db("residential").collection("teamMembers")
        const featuredPropertiesCollections = client.db("residential").collection("featuredProperties")
        const blogsCollections = client.db("residential").collection("blogs")


        app.get("/FeaturedProperties", async (req, res) => {
            const FeaturedProperties = await featuredPropertiesCollections.find().toArray();
            res.send(FeaturedProperties) 
        })
        app.get("/TeamMembers", async (req, res) => {
            const TeamMembers = await teamMembersCollections.find().toArray();
            res.send(TeamMembers) 
        })
        app.get("/Blogs", async (req, res) => {
            const Blogs = await blogsCollections.find().toArray();
            res.send(Blogs) 
        })


    } finally { 
        //console.log()
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Hello residential-real-estate")
})




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
