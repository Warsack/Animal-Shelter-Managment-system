import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DogDetails() {
  const { id } = useParams();
  const [pies, setPies] = useState(null);
  const [showForm, setShowForm] = useState(false); // Obsługa formularza adopcji

  useEffect(() => {
    fetch(`http://localhost:5000/api/zwierzeta`)
      .then(res => res.json())
      .then(data => {
        const znaleziony = data.find(p => p._id === id);
        setPies(znaleziony);
      });
  }, [id]);

  if (!pies) return (
    <div className="flex items-center justify-center h-screen font-black text-[#13ec13] animate-pulse text-xl">
      Szukamy przyjaciela w bazie...
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1200px] mx-auto px-6 py-12 lg:py-20">
      
      {/* PRZYCISK POWROTU */}
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-[#13ec13] transition-colors mb-10 group">
        <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
        Powrót do wszystkich ogonów
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEWA STRONA: ZDJĘCIE */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img src={pies.foto} alt={pies.imie} className="w-full h-[600px] object-cover" />
            <div className="absolute top-6 left-6">
              <span className="bg-[#13ec13] text-slate-900 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
                {pies.status}
              </span>
            </div>
          </div>
        </div>

        {/* PRAWA STRONA: INFORMACJE */}
        <div className="lg:col-span-5 bg-white rounded-[3.5rem] p-10 shadow-xl border border-slate-50">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-slate-900 mb-2">{pies.imie}</h1>
            <p className="text-xl text-slate-400 font-medium">{pies.rasa} • {pies.wiek}</p>
          </div>

          {/* SZYBKIE INFO */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <span className="material-symbols-outlined text-[#13ec13] mb-1">calendar_today</span>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Wiek</p>
              <p className="font-bold text-slate-900">{pies.wiek}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <span className="material-symbols-outlined text-[#13ec13] mb-1">potted_plant</span>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Charakter</p>
              <p className="font-bold text-slate-900">Łagodny</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl text-center">
              <span className="material-symbols-outlined text-[#13ec13] mb-1">home</span>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Dom</p>
              <p className="font-bold text-slate-900">Z ogrodem</p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">O mnie</h3>
            <p className="text-slate-500 leading-relaxed text-lg italic">
               "{pies.opis || "Nazywam się " + pies.imie + " i bardzo chciałbym Cię poznać! Jestem jeszcze trochę nieśmiały w nowym miejscu, ale moje serce jest pełne miłości."}"
            </p>
          </div>

          {/* PRZYCISK ADOPCJI (Otwiera formularz) */}
          <button 
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-[#13ec13] text-slate-900 py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-[#13ec13]/20 hover:scale-[1.02] active:scale-95 transition-all mb-4"
          >
            {showForm ? "Ukryj formularz" : "Złóż wniosek o adopcję"}
          </button>
        </div>
      </div>

      {/* --- TWOJA NOWA SEKCJA: FORMULARZ ADOPCJI --- */}
      {showForm && (
        <div className="mt-12 animate-in fade-in zoom-in duration-500 bg-slate-900 text-white rounded-[3.5rem] p-12 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-4">Wniosek o adopcję - <span className="text-[#13ec13]">{pies.imie}</span></h2>
            <p className="text-slate-400 mb-10">To Twój pierwszy krok do zyskania wiernego przyjaciela. Wypełnij krótkie info, a my się odezwiemy!</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13]">Twoje Imię</label>
                <input type="text" placeholder="Jan Kowalski" className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-[#13ec13] outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13]">E-mail / Telefon</label>
                <input type="text" placeholder="kontakt@twojmail.pl" className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-[#13ec13] outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13]">Dlaczego Ty?</label>
                <textarea rows="4" placeholder="Napisz kilka słów o sobie i warunkach, jakie oferujesz..." className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-[#13ec13] outline-none transition-all resize-none"></textarea>
              </div>
              <button type="button" className="md:col-span-2 bg-white text-slate-900 py-5 rounded-2xl font-black hover:bg-[#13ec13] transition-colors">
                Wyślij zgłoszenie
              </button>
            </form>
          </div>
          {/* Ozdobny piesek w tle formularza */}
          <span className="absolute -bottom-10 -right-10 material-symbols-outlined text-[200px] opacity-5 rotate-12 select-none">pets</span>
        </div>
      )}
    </div>
  );
}

export default DogDetails;