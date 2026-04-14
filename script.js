const API_URL = "https://finansal-os-backend-production.up.railway.app";

document.getElementById('calculateBtn').addEventListener('click', async () => {
    const btn = document.getElementById('calculateBtn');
    btn.innerText = "Hesaplanıyor...";
    
    const payload = {
        principal: parseFloat(document.getElementById('principal').value),
        rate: parseFloat(document.getElementById('rate').value),
        years: parseInt(document.getElementById('years').value)
    };

    try {
        const response = await fetch(`${API_URL}/api/v1/calculate/compound`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const res = await response.json();
        
        document.getElementById('resultCard').classList.remove('hidden');
        document.getElementById('finalAmount').innerText = `₺${res.nominal_final}`;
        document.getElementById('realValue').innerText = `₺${res.real_final}`;
        document.getElementById('rpiValue').innerText = res.rpi;
        document.getElementById('note').innerText = res.data_note;
        
    } catch (error) {
        alert("Bağlantı Hatası: Backend yanıt vermiyor!");
    } finally {
        btn.innerText = "Sistemi Çalıştır";
    }
});