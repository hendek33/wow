// Çerezden authToken’ı al
const getUsername = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            // Örnek: teldiven_3e9063adabc6e3313b969d093d5cbdb5 → teldiven
            return value.split('_')[0];
        }
    }
    return null;
};

const username = getUsername();

// SSE bağlantısı kur
const eventSource = new EventSource('https://tortoiseshell-bramble-day.glitch.me/komutlar');
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.username === username) {
        alert(data.mesaj);
    }
};
