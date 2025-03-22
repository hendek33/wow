const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

if (button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            // Eğitim paketleri sayfasını çek
            const response = await fetch('https://katiponline.com/egitim-paketleri/');
            const html = await response.text();

            // HTML’i parse et
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Mevcut sayfaya hedef sayfanın stil dosyalarını ekle
            const styles = doc.querySelectorAll('link[rel="stylesheet"]');
            styles.forEach(style => {
                const href = style.getAttribute('href');
                const fullHref = href.startsWith('http') ? href : 'https://katiponline.com' + (href.startsWith('/') ? '' : '/') + href;
                const newStyle = document.createElement('link');
                newStyle.rel = 'stylesheet';
                newStyle.href = fullHref;
                document.head.appendChild(newStyle);
            });

            // Body içeriğini güncelle
            document.body.innerHTML = doc.body.innerHTML;

            // URL’yi güncelle
            window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
        } catch (error) {
            console.error('Hata:', error);
        }
    });
}
