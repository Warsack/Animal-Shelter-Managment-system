const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
    try {
        await client.connect();
        console.log("✅ Połączono z MongoDB Atlas!");
        
        const db = client.db("Schronisko");
        const collection = db.collection("Zwierzeta");

        // Endpoint do pobierania wszystkich zwierząt
        app.get('/api/zwierzeta', async (req, res) => {
            const zwierzeta = await collection.find({}).toArray();
            res.json(zwierzeta);
        });

        app.listen(PORT, () => console.log(`🚀 Serwer śmiga na porcie ${PORT}`));
    } catch (e) {
        console.error("❌ Błąd połączenia:", e);
    }
}

startServer();