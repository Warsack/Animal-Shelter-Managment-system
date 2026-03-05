import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [zwierzeta, setZwierzeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/zwierzeta')
      .then(res => res.json())
      .then(data => {
        setZwierzeta(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen font-black text-[#13ec13] text-2xl animate-pulse">
      Ładowanie piesków...
    </div>
  );

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* --- SEKCJA HERO (BANER) --- */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Lewa strona - Tekst */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-[#13ec13]/10 text-[#13ec13] font-bold text-sm mb-6 uppercase tracking-wider">
              Schronisko dla zwierząt
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Każda łapa zasługuje na <span className="text-[#13ec13]">ciepły dom.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Łapa Pomocy to miejsce, gdzie porzucone serca odnajdują nadzieję. Pomóż nam tworzyć historie ze szczęśliwym zakończeniem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-[#13ec13] text-slate-900 font-black rounded-2xl shadow-xl shadow-[#13ec13]/20 hover:scale-105 active:scale-95 transition-all">
                Adoptuj teraz
              </button>
              <button className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all">
                Wesprzyj nas
              </button>
            </div>
          </div>

          {/* Prawa strona - Zdjęcie "Premium" */}
          <div className="flex-1 relative">
            <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
                alt="Szczęśliwe psy" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ozdobne kółko w tle */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#13ec13]/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --- LISTA ZWIERZĄT --- */}
      <main className="mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
              Nasi <span className="text-[#13ec13]">podopieczni</span>
            </h2>
            <p className="text-slate-500">Odkryj zwierzęta czekające na nowy dom</p>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold">Wszystkie</button>
            <button className="px-5 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 text-sm font-bold hover:bg-slate-50">Psy</button>
            <button className="px-5 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 text-sm font-bold hover:bg-slate-50">Koty</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {zwierzeta.map((pet) => (
            <div 
              key={pet._id} 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-slate-100"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-[2rem] mb-6">
                <img 
                  src={pet.foto} 
                  alt={pet.imie} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                    {pet.rasa}
                  </span>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900">{pet.imie}</h4>
                    <p className="text-slate-400 text-sm font-bold">{pet.wiek}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#13ec13]/10 text-[#13ec13]">
                    <span className="material-symbols-outlined font-bold">arrow_forward</span>
                  </div>
                </div>
                
                <Link 
                  to={`/pies/${pet._id}`} 
                  className="block w-full text-center rounded-[1.2rem] bg-slate-900 py-4 text-sm font-black text-white hover:bg-[#13ec13] hover:text-slate-900 transition-all duration-300"
                >
                  Zobacz profil
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;