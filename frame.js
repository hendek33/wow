const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

if (button) {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        document.body.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = 'https://katiponline.com/egitim-paketleri/';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';

        iframe.onload = () => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                // plan-title class’ına sahip span’ı bul
                const planTitle = iframeDoc.querySelector('span.plan-title');
                if (planTitle) {
                    // Sadece metni değiştirmek için (a etiketini koruyoruz)
                    const originalLink = planTitle.querySelector('a');
                    planTitle.innerHTML = 'Manipüle Edilmiş Paket ';
                    if (originalLink) {
                        planTitle.appendChild(originalLink); // <a> etiketini geri ekle
                    }
                }
            } catch (error) {
                console.error('Iframe manipülasyon hatası:', error);
            }
        };

        document.body.appendChild(iframe);
        window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
    });
}
