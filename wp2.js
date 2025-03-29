// Yeni bir duello penceresi aç ve iframe ile wp-login.php’yi göster
(function() {
    // Yeni pencere aç
    const newWindow = window.open('https://katiponline.com/duello', '_blank');
    
    // Yeni pencere yüklendiğinde iframe ekle
    newWindow.onload = () => {
        const doc = newWindow.document;
        
        // Sayfayı temizle ve iframe ekle
        doc.body.innerHTML = '';
        const iframe = doc.createElement('iframe');
        iframe.src = 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        doc.body.appendChild(iframe);

        // Adres çubuğunu manipüle et
        newWindow.history.pushState({}, document.title, 'https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1');

        // Çalıştığını doğrulamak için konsol mesajı
        console.log('Yeni pencere açıldı ve iframe yüklendi!');
    };
})();
