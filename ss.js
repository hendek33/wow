// Mevcut HTML içeriğini sil
document.body.innerHTML = '';

// Yeni stil ve div oluştur
const style = document.createElement('style');
style.textContent = `
    .hack-text {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100px;
        font-family: Arial, sans-serif;
        font-weight: bold;
        text-align: center;
        z-index: 9999;
    }
`;
document.head.appendChild(style);

const div = document.createElement('div');
div.className = 'hack-text';
div.textContent = 'HACKLENDİNİZ';
document.body.appendChild(div);

// Renk değiştirme animasyonu
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Arka plan ve yazı için ayrı renk animasyonları
setInterval(() => {
    div.style.color = getRandomColor();
    div.style.backgroundColor = getRandomColor();
}, 500); // 0.5 saniyede bir renk değişir
