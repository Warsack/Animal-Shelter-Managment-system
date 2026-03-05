import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DogDetails() {
  const { id } = useParams();
  const [pies, setPies] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/zwierzeta`)
      .then(res => res.json())
      .then(data => {
        const znaleziony = data.find(p => p._id === id);
        setPies(znaleziony);
      });
  }, [id]);

  if (!pies) return <div className="text-center py-20">Szukamy pieska w bazie...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 lg:py-20">
      <Link to="/" className="text-[#13ec13] font-bold flex items-center gap-2 mb-8 hover:underline">
        <span className="material-symbols-outlined">arrow_back</span> Powrót do listy
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="rounded-[2rem] overflow-hidden h-[400px]">
          <img src={pies.foto} alt={pies.imie} className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="bg-[#13ec13]/10 text-[#13ec13] px-4 py-1 rounded-full text-xs font-black uppercase mb-4 inline-block">
            {pies.status}
          </span>
          <h1 className="text-5xl font-black mb-2">{pies.imie}</h1>
          <p className="text-slate-400 text-lg mb-6">{pies.rasa} • {pies.wiek}</p>
          <div className="bg-slate-50 p-6 rounded-2xl mb-8">
            <h3 className="font-bold mb-2">O mnie:</h3>
            <p className="text-slate-600 leading-relaxed">{pies.opis || "Ten piesek jeszcze czeka na swój opis, ale już teraz wiemy, że jest wspaniały!"}</p>
          </div>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all">
            Złóż wniosek o adopcję
          </button>
        </div>
      </div>
    </div>
  );
}

export default DogDetails;