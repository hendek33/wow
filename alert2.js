// Çerezden authToken’ı al ve username’i ayrıştır
const getUsername = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            return value.split('_')[0]; // Ör: teldiven_xxx → teldiven
        }
    }
    return null;
};

const username = getUsername();

// SSE bağlantısı
const eventSource = new EventSource('https://tortoiseshell-bramble-day.glitch.me/komutlar');
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.username === username) {
        alert(data.mesaj); // Eşleşirse alert göster
    }
};
eventSource.onerror = (err) => {
    console.log('SSE hatası! Detay:', err);
};
eventSource.onopen = () => {
    console.log('SSE bağlantısı açıldı');
};
