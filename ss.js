// Yeni bir div oluştur
const hackDiv = document.createElement('div');
hackDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
`;

// Yazı elementini oluştur
const hackText = document.createElement('span');
hackText.textContent = 'HACKLENDİNİZ';
hackText.style.cssText = `
    font-size: 64px;
    font-weight: bold;
    animation: colorChange 0.5s infinite;
`;

// Renk animasyonu için CSS ekle
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes colorChange {
        0% { color: red; }
        25% { color: yellow; }
        50% { color: green; }
        75% { color: blue; }
        100% { color: red; }
    }
`;

// Elementleri sayfaya ekle
document.head.appendChild(styleSheet);
hackDiv.appendChild(hackText);
document.body.appendChild(hackDiv);
