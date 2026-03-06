const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// --- KLUCZOWA POPRAWKA: Zwiększenie limitów danych ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
    try {
        await client.connect();
        console.log("✅ Połączono z MongoDB Atlas!");
        
        const db = client.db("Schronisko");

        // 1. Endpoint do pobierania wszystkich zwierząt
        app.get('/api/zwierzeta', async (req, res) => {
            try {
                const collection = db.collection("Zwierzeta");
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
                const noweZgloszenie = { ...req.body, data: new Date() };
                await zgloszenia.insertOne(noweZgloszenie);
                console.log("📩 Nowy wniosek zapisany!");
                res.status(201).json({ message: "Wniosek zapisany!" });
            } catch (err) {
                console.error("❌ Błąd zapisu wniosku:", err.message);
                res.status(500).json({ error: "Błąd serwera" });
            }
        });

        // 🚀 3. Endpoint do dodawania nowego zwierzaka (Panel Admina)
        app.post('/api/nowy-obiekt', async (req, res) => {
            console.log("📥 Serwer odebrał żądanie POST na /api/zwierzeta");
            try {
                const collection = db.collection("Zwierzeta");
                const noweZwierze = { 
                    ...req.body, 
                    dataDodania: new Date() 
                };
                const result = await collection.insertOne(noweZwierze);
                console.log("🐾 Dodano zwierzaka o ID:", result.insertedId);
                res.status(201).json({ message: "Zwierzak dodany pomyślnie!" });
            } catch (err) {
                console.error("❌ Błąd zapisu w Mongo:", err.message);
                res.status(500).json({ error: err.message });
            }
        });

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Serwer śmiga na porcie ${PORT}`);
            console.log("📌 Trasy aktywne: GET /api/zwierzeta, POST /api/adopcja, POST /api/zwierzeta");
        });
        
    } catch (e) {
        console.error("❌ Błąd połączenia z bazą:", e);
    }
}

startServer();