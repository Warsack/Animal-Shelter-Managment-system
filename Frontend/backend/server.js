require('dotenv').config(); // Ładowanie .env na samym początku!
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Logowanie dla testu (pokaże link w konsoli, jeśli .env działa)
console.log("Mój link z ENV to:", process.env.MONGO_URI);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
}));

const adopcjaLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 godzina
    max: 5,
    message: { error: 'Za dużo wniosków. Spróbuj ponownie za godzinę.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 50,
    message: { error: 'Za dużo żądań. Spróbuj ponownie za 15 minut.' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Używamy zmiennej z .env, a jeśli jej nie ma, bierzemy link na sztywno
const DB_URL = process.env.MONGO_URI || "mongodb+srv://admin:123@schronisko.k8imroe.mongodb.net/?appName=Schronisko";

// Tworzymy klienta MongoDB (używamy MongoClient, nie mongoose)
const client = new MongoClient(DB_URL);

function walidujZwierze(body) {
    const { imie, rasa, wiek, status, foto, opis, gatunek } = body;

    if (!imie || !rasa || !wiek || !foto || !opis || !gatunek) {
        return 'Wszystkie pola są wymagane.';
    }
    if (typeof imie !== 'string' || typeof rasa !== 'string' || typeof wiek !== 'string' ||
        typeof status !== 'string' || typeof foto !== 'string' || typeof opis !== 'string' ||
        typeof gatunek !== 'string') {
        return 'Nieprawidłowy typ danych.';
    }
    if (imie.length > 50 || rasa.length > 100 || wiek.length > 30 || opis.length > 1000) {
        return 'Przekroczono dozwoloną długość pola.';
    }
    if (!['pies', 'kot'].includes(gatunek)) {
        return 'Gatunek musi być "pies" lub "kot".';
    }
    if (!['Do adopcji', 'Zarezerwowany', 'Adoptowany'].includes(status)) {
        return 'Nieprawidłowy status.';
    }
    if (!foto.startsWith('https://')) {
        return 'Link do zdjęcia musi zaczynać się od https://.';
    }
    return null;
}

function walidujZgloszenie(body) {
    const { piesId, piesImie, imieNazwisko, kontakt, wiadomosc } = body;

    if (!piesId || !piesImie || !imieNazwisko || !kontakt || !wiadomosc) {
        return 'Wszystkie pola są wymagane.';
    }
    if ([piesId, piesImie, imieNazwisko, kontakt, wiadomosc].some(v => typeof v !== 'string')) {
        return 'Nieprawidłowy typ danych.';
    }
    if (imieNazwisko.length > 100 || kontakt.length > 100 || wiadomosc.length > 2000) {
        return 'Przekroczono dozwoloną długość pola.';
    }
    return null;
}

function requireAdmin(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token || token !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Brak dostępu' });
    }
    next();
}

async function startServer() {
    try {
        await client.connect();
        console.log("✅ BAZA DANYCH PODŁĄCZONA (MongoDB Atlas)!");
        
        const db = client.db("Schronisko");

        
        app.get('/api/zwierzeta', async (req, res) => {
            try {
                const collection = db.collection("Zwierzeta");
                const zwierzeta = await collection.find({}).toArray();
                res.json(zwierzeta);
            } catch (err) {
                res.status(500).json({ error: "Błąd pobierania danych" });
            }
        });

        app.get('/api/zwierzeta/:id', async (req, res) => {
            try {
                if (!ObjectId.isValid(req.params.id)) {
                    return res.status(400).json({ error: "Nieprawidłowe ID" });
                }
                const collection = db.collection("Zwierzeta");
                const zwierze = await collection.findOne({ _id: new ObjectId(req.params.id) });
                if (!zwierze) return res.status(404).json({ error: "Nie znaleziono zwierzęcia" });
                res.json(zwierze);
            } catch (err) {
                res.status(500).json({ error: "Błąd pobierania danych" });
            }
        });

        
        app.post('/api/adopcja', adopcjaLimiter, async (req, res) => {
            const blad = walidujZgloszenie(req.body);
            if (blad) return res.status(400).json({ error: blad });

            try {
                const zgloszenia = db.collection("Zgloszenia");
                const { piesId, piesImie, imieNazwisko, kontakt, wiadomosc } = req.body;
                const noweZgloszenie = { piesId, piesImie, imieNazwisko, kontakt, wiadomosc, data: new Date() };
                await zgloszenia.insertOne(noweZgloszenie);
                console.log("📩 Nowy wniosek zapisany!");
                res.status(201).json({ message: "Wniosek zapisany!" });
            } catch (err) {
                console.error("❌ Błąd zapisu wniosku:", err.message);
                res.status(500).json({ error: "Błąd serwera" });
            }
        });

        
        app.post('/api/nowy-obiekt', adminLimiter, requireAdmin, async (req, res) => {
            const blad = walidujZwierze(req.body);
            if (blad) return res.status(400).json({ error: blad });

            try {
                const collection = db.collection("Zwierzeta");
                const { imie, rasa, wiek, status, foto, opis, gatunek } = req.body;
                const noweZwierze = { imie, rasa, wiek, status, foto, opis, gatunek, dataDodania: new Date() };
                const result = await collection.insertOne(noweZwierze);
                console.log("🐾 Dodano zwierzaka o ID:", result.insertedId);
                res.status(201).json({ message: "Zwierzak dodany pomyślnie!" });
            } catch (err) {
                console.error("❌ Błąd zapisu w Mongo:", err.message);
                res.status(500).json({ error: "Błąd serwera" });
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