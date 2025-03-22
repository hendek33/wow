const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

if (button) {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // Mevcut içeriği temizle
        document.body.innerHTML = '';

        // Iframe oluştur
        const iframe = document.createElement('iframe');
        iframe.src = 'https://katiponline.com/egitim-paketleri/';
        iframe.style.width = '100%';
        iframe.style.height = '100vh'; // Tam ekran
        iframe.style.border = 'none'; // Çerçevesiz
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';

        // Iframe’i sayfaya ekle
        document.body.appendChild(iframe);

        // URL’yi güncelle
        window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
    });
}
