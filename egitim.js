// Butonu bul (Eğitim Paketleri yazısını içeren nav-link)
const button = Array.from(document.querySelectorAll('.nav-link')).find(link => 
    link.querySelector('.link-title') && link.querySelector('.link-title').textContent.includes('Eğitim Paketleri')
);

// Tıklama olayını yakala
if (button) {
    button.addEventListener('click', async (event) => {
        event.preventDefault(); // Yönlendirmeyi engelle

        try {
            // Eğitim paketleri sayfasını çek
            const response = await fetch('https://katiponline.com/egitim-paketleri/');
            const html = await response.text();

            // Mevcut sayfanın içeriğini değiştir
            document.body.innerHTML = html;

            // URL’yi manipüle et (tarayıcıda adres çubuğunu güncelle, ama sayfa yenilenmesin)
            window.history.pushState({}, 'Eğitim Paketleri', '/egitim-paketleri');
        } catch (error) {
            console.error('Hata:', error); // Hata olursa konsolda göster
        }
    });
}
