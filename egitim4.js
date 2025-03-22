const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

if (button) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Script çalışıyor, iframe yükleniyor!'); // Kontrol mesajı

        document.body.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = 'https://katiponline.com/egitim-paketleri/';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        document.body.appendChild(iframe);

        window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
    });
}
