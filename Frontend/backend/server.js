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

        // 1. Endpoint do pobierania wszystkich zwierząt
        app.get('/api/zwierzeta', async (req, res) => {
            try {
                const zwierzeta = await collection.find({}).toArray();
                res.json(zwierzeta);
            } catch (err) {
                res.status(500).json({ error: "Błąd pobierania danych" });
            }
        });

        // 2. Endpoint do odbierania wniosków o adopcję
        app.post('/api/adopcja', async (req, res) => {
            try {
                const zgloszenia = db.collection("Zgloszenia");
                const noweZgloszenie = {
                    ...req.body,
                    data: new Date()
                };
                await zgloszenia.insertOne(noweZgloszenie);
                console.log("📩 Nowy wniosek zapisany w bazie!");
                res.status(201).json({ message: "Wniosek zapisany w bazie!" });
            } catch (err) {
                console.error("❌ Błąd zapisu:", err);
                res.status(500).json({ error: "Błąd serwera" });
            }
        });

        app.listen(PORT, () => console.log(`🚀 Serwer śmiga na porcie ${PORT}`));
        
    } catch (e) {
        console.error("❌ Błąd połączenia:", e);
    }
}


startServer();