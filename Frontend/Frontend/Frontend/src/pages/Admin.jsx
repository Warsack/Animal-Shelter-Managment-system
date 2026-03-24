import React, { useState } from 'react';

function Admin() {
  // Stan dla pól formularza
  const [formData, setFormData] = useState({
    imie: '',
    rasa: '',
    wiek: '',
    status: 'Do adopcji',
    foto: '',
    opis: '',
    gatunek: 'pies'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Używamy localhost, aby przeglądarka sama zdecydowała o IPv4 lub IPv6
    const targetUrl = 'http://localhost:5000/api/nowy-obiekt';
    
    console.log("🚀 Próba wysłania danych pod adres:", targetUrl);
    console.log("📦 Dane do wysłania:", formData);

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Sprawdzamy status odpowiedzi
      if (res.ok) {
        const data = await res.json();
        console.log("✅ Sukces serwera:", data);
        alert("✅ Sukces! Nowy zwierzak został dodany do bazy.");
        
        // Czyszczenie formularza
        setFormData({
          imie: '',
          rasa: '',
          wiek: '',
          status: 'Do adopcji',
          foto: '',
          opis: '',
          gatunek: 'pies'
        });
      } else {
        const errorText = await res.text();
        console.error("❌ Błąd serwera:", res.status, errorText);
        alert(`❌ Błąd: Serwer odpowiedział statusem ${res.status}.`);
      }
    } catch (err) {
      console.error("❌ Błąd połączenia:", err);
      alert("❌ Brak połączenia z serwerem. Czy uruchomiłeś 'node server.js'?");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 px-6">
      <div className="max-w-2xl mx-auto bg-zinc-900 p-10 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#13ec13]/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
            Panel <span className="text-[#13ec13]">Admina</span>
          </h1>
          <p className="text-zinc-500 mb-8 font-medium">System zarządzania podopiecznymi schroniska</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Imię pupila</label>
                <input 
                  required 
                  type="text"
                  placeholder="np. Burek" 
                  value={formData.imie} 
                  onChange={e => setFormData({...formData, imie: e.target.value})} 
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13] transition-all" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Gatunek</label>
                <select 
                  value={formData.gatunek} 
                  onChange={e => setFormData({...formData, gatunek: e.target.value})} 
                  className="bg-zinc-800 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13] cursor-pointer"
                >
                  <option value="pies">Pies</option>
                  <option value="kot">Kot</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Rasa</label>
                <input 
                  required 
                  type="text"
                  placeholder="np. Golden Retriever" 
                  value={formData.rasa} 
                  onChange={e => setFormData({...formData, rasa: e.target.value})} 
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13]" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Wiek</label>
                <input 
                  required 
                  type="text"
                  placeholder="np. 2 lata" 
                  value={formData.wiek} 
                  onChange={e => setFormData({...formData, wiek: e.target.value})} 
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13]" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Link do zdjęcia (URL)</label>
              <input 
                required 
                type="url"
                placeholder="https://images.unsplash.com/..." 
                value={formData.foto} 
                onChange={e => setFormData({...formData, foto: e.target.value})} 
                className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13]" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#13ec13] ml-2">Opis i charakterystyka</label>
              <textarea 
                required 
                rows="4"
                placeholder="Napisz kilka zdań o zwierzaku..." 
                value={formData.opis} 
                onChange={e => setFormData({...formData, opis: e.target.value})} 
                className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#13ec13] resize-none" 
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#13ec13] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#13ec13]/20 mt-4 text-lg uppercase tracking-wider"
            >
              Dodaj do bazy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;