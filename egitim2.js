// Butonu bul
const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

if (button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault(); // Yönlendirmeyi engelle

        try {
            // Eğitim paketleri sayfasını çek
            const response = await fetch('https://katiponline.com/egitim-paketleri/');
            const html = await response.text();

            // HTML’i bir DOMParser ile parse et
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Head içindeki stil ve scriptleri al
            const headContent = doc.head.innerHTML;
            const bodyContent = doc.body.innerHTML;

            // Mevcut sayfanın head ve body’sini güncelle
            document.head.innerHTML = headContent;
            document.body.innerHTML = bodyContent;

            // Stil dosyalarının doğru yüklenmesini sağlamak için relatif yolları tam yola çevir
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http')) {
                    link.setAttribute('href', 'https://katiponline.com' + (href.startsWith('/') ? '' : '/') + href);
                }
            });

            // Script dosyalarını da tam yola çevir ve yeniden yükle
            document.querySelectorAll('script[src]').forEach(script => {
                const src = script.getAttribute('src');
                if (src && !src.startsWith('http')) {
                    const newSrc = 'https://katiponline.com' + (src.startsWith('/') ? '' : '/') + src;
                    const newScript = document.createElement('script');
                    newScript.src = newSrc;
                    document.body.appendChild(newScript);
                }
            });

            // URL’yi güncelle
            window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
        } catch (error) {
            console.error('Hata:', error);
        }
    });
}
