import React, { useEffect, useState } from 'react';

function App() {
  const [zwierzeta, setZwierzeta] = useState([]);
  const [loading, setLoading] = useState(true);

  // POBIERANIE PRAWDZIWYCH DANYCH Z BACKENDU
  useEffect(() => {
    fetch('http://localhost:5000/api/zwierzeta')
      .then(res => res.json())
      .then(data => {
        setZwierzeta(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd połączenia z serwerem:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#f6f8f6] min-h-screen font-['Plus_Jakarta_Sans'] text-slate-900">
      
      {/* NAGŁÓWEK */}
      <header className="sticky top-0 z-50 w-full border-b border-[#13ec13]/10 bg-[#f6f8f6]/80 backdrop-blur-md px-6 py-4 md:px-20">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#13ec13] text-slate-900 shadow-lg shadow-[#13ec13]/20">
              <span className="material-symbols-outlined text-2xl">pets</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Łapa Pomocy</h2>
          </div>
          <button className="flex items-center justify-center rounded-xl bg-[#13ec13] px-6 py-2.5 text-sm font-bold text-slate-900 shadow-md hover:scale-105 active:scale-95 transition-all">
            Rejestracja
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-6 py-10">
        <section className="mb-12">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
            Nasi <span className="text-[#13ec13]">podopieczni</span>
          </h2>
          <p className="text-slate-500 italic">Dane pobierane prosto z MongoDB Atlas</p>
        </section>

        {/* EKRAN ŁADOWANIA / BRAK DANYCH */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-slate-400 animate-pulse font-bold text-xl">Łączenie z bazą danych...</p>
          </div>
        ) : zwierzeta.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">Baza jest pusta. Dodaj pierwszego psa w MongoDB Atlas!</p>
          </div>
        ) : (
          /* SIATKA Z KARTAMI ZWIERZĄT */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {zwierzeta.map((pet, index) => (
              <div 
                key={pet._id || index} 
                className="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                {/* KONTENER ZDJĘCIA */}
                <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6 bg-slate-100">
                  <img 
                    src={pet.foto || "https://via.placeholder.com/600x400?text=Brak+zdjęcia"} 
                    alt={pet.imie} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {pet.wiek}
                    </span>
                  </div>
                </div>

                {/* DANE PSA */}
                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-2xl font-black text-slate-900">{pet.imie}</h4>
                    <span className="rounded-full bg-[#13ec13]/10 px-3 py-1 text-[10px] font-bold text-[#13ec13] uppercase">
                      {pet.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 font-medium">
                    {pet.rasa} • {pet.wiek}
                  </p>
                  
                  <button className="w-full rounded-2xl bg-[#13ec13] py-4 text-sm font-black text-slate-900 shadow-lg shadow-[#13ec13]/20 hover:bg-[#13ec13]/90 active:scale-[0.98] transition-all">
                    Adoptuj {pet.imie}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* STOPKA */}
      <footer className="mt-20 border-t border-slate-100 py-10 text-center text-slate-400 text-sm">
        <p>© 2026 Łapa Pomocy. Projekt Fullstack MERN.</p>
      </footer>
    </div>
  );
}

export default App;