require('dotenv').config(); // Ładowanie .env na samym początku!
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Logowanie dla testu (pokaże link w konsoli, jeśli .env działa)
console.log("Mój link z ENV to:", process.env.MONGO_URI);

app.use(cors());

// --- Zwiększenie limitów danych dla zdjęć ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Używamy zmiennej z .env, a jeśli jej nie ma, bierzemy link na sztywno
const DB_URL = process.env.MONGO_URI || "mongodb+srv://admin:123@schronisko.k8imroe.mongodb.net/?appName=Schronisko";

// Tworzymy klienta MongoDB (używamy MongoClient, nie mongoose)
const client = new MongoClient(DB_URL);

async function startServer() {
    try {
        await client.connect();
        console.log("✅ BAZA DANYCH PODŁĄCZONA (MongoDB Atlas)!");
        
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

        // 3. Endpoint do dodawania nowego zwierzaka (Panel Admina)
        app.post('/api/nowy-obiekt', async (req, res) => {
            console.log("📥 Serwer odebrał żądanie POST na /api/nowy-obiekt");
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
            console.log("📌 Trasy aktywne: GET /api/zwierzeta, POST /api/adopcja, POST /api/nowy-obiekt");
        });
        
    } catch (e) {
        console.error("❌ Błąd połączenia z bazą:", e);
    }
}

startServer();