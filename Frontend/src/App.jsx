import React, { useEffect, useState } from 'react';

function App() {
  const [zwierzeta, setZwierzeta] = useState([]);

  
  useEffect(() => {
    const daneZSerwera = [
      { imie: "Reksio", rasa: "Kundelek", wiek: "3 lata", status: "Do adopcji" },
      { imie: "Luna", rasa: "Syberyjski", wiek: "1 rok", status: "W leczeniu" },
      { imie: "Bastek", rasa: "Mieszaniec", wiek: "5 lat", status: "Do adopcji" }
    ];
    setZwierzeta(daneZSerwera);
  }, []);

  return (
    <div className="bg-[#f6f8f6] min-h-screen font-sans text-slate-900">
      {/* NAGŁÓWEK */}
      <header className="p-6 border-b border-[#13ec13]/20 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-[#13ec13] flex items-center gap-2">
            <span className="material-symbols-outlined">pets</span> Łapa Pomocy
          </h1>
          <button className="bg-[#13ec13] px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-[#13ec13]/20">
            Rejestracja
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-black mb-10 tracking-tight">Nasi <span className="text-[#13ec13]">podopieczni</span></h2>
        
        {/* LISTA ZWIERZĄT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zwierzeta.map((pet, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="aspect-square bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-slate-300">
                <span className="material-symbols-outlined text-5xl">image</span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">{pet.imie}</h3>
                <span className="bg-[#13ec13]/10 text-[#13ec13] text-xs font-black px-3 py-1 rounded-full">
                  {pet.status}
                </span>
              </div>
              <p className="text-slate-500 mb-6">{pet.rasa} • {pet.wiek}</p>
              <button className="w-full bg-[#13ec13] py-4 rounded-2xl font-extrabold text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md">
                Adoptuj {pet.imie}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;