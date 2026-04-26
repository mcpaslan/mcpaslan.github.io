// =============================================
// Hafta 7 — JavaScript Etkileşimleri
// (1) Tema Değiştirme
// (2) Form Verilerinden Özet Üretme
// =============================================

// ---------- Tema Değiştirme ----------
const temaBtn = document.getElementById("temaBtn");
const htmlEl = document.documentElement;

temaBtn.addEventListener("click", function () {
  // Bootstrap 5.3 data-bs-theme toggle
  const mevcutTema = htmlEl.getAttribute("data-bs-theme");

  if (mevcutTema === "dark") {
    htmlEl.setAttribute("data-bs-theme", "light");
    temaBtn.textContent = "🌙 Koyu Tema";

    // Hero arka planını açık temaya çevir
    document.querySelector(".hero-section").classList.remove("hero-dark");
    document.querySelector(".hero-section").classList.add("hero-light");
  } else {
    htmlEl.setAttribute("data-bs-theme", "dark");
    temaBtn.textContent = "☀️ Açık Tema";

    // Hero arka planını koyu temaya çevir
    document.querySelector(".hero-section").classList.remove("hero-light");
    document.querySelector(".hero-section").classList.add("hero-dark");
  }
});

// ---------- Form Doğrulama ve Özet Üretme ----------
const form = document.getElementById("basvuruFormu");
const uyari = document.getElementById("uyariAlani");
const sonuc = document.getElementById("sonucAlani");

form.addEventListener("submit", function (event) {
  // Sayfa yenilenmesini engelle
  event.preventDefault();

  // Alanlardan değerleri al
  const adSoyad = document.getElementById("adSoyad").value.trim();
  const eposta = document.getElementById("eposta").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const oturum = document.getElementById("oturum").value;
  const mesaj = document.getElementById("mesaj").value.trim();
  const kvkk = document.getElementById("kvkk").checked;

  // Eksik alan kontrolü
  const eksikler = [];
  if (!adSoyad) eksikler.push("Ad Soyad");
  if (!eposta) eksikler.push("E-posta");
  if (!telefon) eksikler.push("Telefon");
  if (!oturum) eksikler.push("Oturum seçimi");
  if (!kvkk) eksikler.push("KVKK onayı");

  // Eksik varsa uyarı göster
  if (eksikler.length > 0) {
    uyari.classList.remove("d-none");
    uyari.innerHTML =
      "<strong>⚠️ Lütfen eksik alanları doldurun:</strong><br>" +
      eksikler.join(", ");

    // Sonuç alanını temizle
    sonuc.innerHTML = "";
    return;
  }

  // Uyarıyı gizle
  uyari.classList.add("d-none");
  uyari.innerHTML = "";

  // Başvuru özeti kartı oluştur
  sonuc.innerHTML = `
    <div class="card border-success shadow rounded-4">
      <div class="card-body p-4">
        <h4 class="card-title fw-bold text-success mb-3">✅ Başvurunuz Alındı!</h4>
        <table class="table table-borderless mb-0">
          <tr>
            <td class="text-secondary fw-semibold" style="width:160px;">Ad Soyad</td>
            <td>${adSoyad}</td>
          </tr>
          <tr>
            <td class="text-secondary fw-semibold">E-posta</td>
            <td>${eposta}</td>
          </tr>
          <tr>
            <td class="text-secondary fw-semibold">Telefon</td>
            <td>${telefon}</td>
          </tr>
          <tr>
            <td class="text-secondary fw-semibold">Oturum</td>
            <td>${oturum}</td>
          </tr>
          <tr>
            <td class="text-secondary fw-semibold">Mesaj</td>
            <td>${mesaj || "<em class='text-muted'>Belirtilmedi</em>"}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  // Sonuç alanına scroll
  sonuc.scrollIntoView({ behavior: "smooth", block: "center" });
});
