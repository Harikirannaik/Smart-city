const express = require('express');
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const d = new Date();

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const avgLatencey = 0;
const reqRev = 0;

app.post('/register', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("iot");
        const collection = database.collection("sensors");

        const result = await collection.insertOne(req.body);
        // console.log(result);
        res.json({ message: 'Data inserted successfully', insertedData: result.insertedId });
    } catch (error) {
        console.error("Error occurred during insertion:", error);
        res.status(500).json({ message: 'An error occurred during insertion' });
    } finally {
        // Close the connection after response is sent
        // await client.close();
    }
});


app.post('/info', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("iot");
        const collection = database.collection("data");
        const time = d.getTime();
        const latencey = req.body.startTime - time;
        console.log("latencey :", latencey);
        reqRev += 1;
        avgLatencey += latencey;
        console.log("avgLatencey: ", avgLatencey / reqRev);
        const result = await collection.insertOne(req.body);
        // console.log(result);
        res.json({ message: 'Data inserted successfully', insertedData: result.insertedId });
    } catch (e) {

    }
});


app.get('/allData', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("iot");
        const collection = database.collection("data");

        const result = await collection.find().toArray();
        // console.log(result);
        res.json(result); // Sending the result as a JSON response
    } catch (e) {
        console.error("Error occurred:", e);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
});


app.get('/data/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("iot");
        const collection = database.collection("data");

        const result = await collection.find({ sensorData: req.params.id }).toArray();
        res.json(result); // Sending the result as a JSON response
    } catch (e) {
        console.error("Error occurred:", e);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
});


app.get('/allSensor', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("iot");
        const collection = database.collection("sensors");

        const result = await collection.find().toArray();
        // console.log(result);
        res.json(result); // Sending the result as a JSON response
    } catch (e) {
        console.error("Error occurred:", e);
        res.status(500).json({ message: 'An error occurred while fetching data' });
    }
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
