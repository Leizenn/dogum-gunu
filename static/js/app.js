// ===== BURAYI DÜZENLE =====
const ISIM = "Elvin";
const HEDIYE_NOTU = "Doğum günün kutlu olsun umarım sevdiklerinle,ailenle ,arkadaşların sağlıklı ve mutlu bir yaş olur.Geçen sene bu kadar yakın olmadığımızdan kutlayamamıştım doğru dürüst hediyede alamamıştım ve içimde kalmıştı gerçi şuanda doğum gününü kutlayacak kadar yakınlığımız sorgulanabilir bir tık yüzsüz gibi davranıyor eğer sinir bozucuysam özür dilerim😞​🙏​🙏​.Neyse benim için doğum günün kutlanacak kadar değerli olan insanlar arasındasın sanıırm ben değilim kutlamadığın içinde kızmıyorum kızamamda zaten kimsse zorunda değil falan filen.Lisenin başında senle tanışmak büyük bir şans çok eğlenceli ve iyiy birisin bundan daha büyük şey varsa o da tekrar arkadaş olmak falandır umarım aynısı senin içinde geerlidir bir tık içimi kustum neyse.Çooooooooooooooooooooooooooooook iyi birisin buarada🫰🫰🫰🫰 .OFFF BİTİREMEDİM ZAMNINDA SAAT 00.00 AFFET PLS.";
const KAPANIS = "Elvin Yılmaz 💙";
// ==========================

const COL = ["#6F9FE6", "#8DB4EE", "#3F6FD8", "#BBD3F5", "#F2D28B"];
const $ = (id) => document.getElementById(id);

function go(id) {
  document.querySelectorAll(".stage").forEach((s) => (s.hidden = s.id !== id));
  window.scrollTo(0, 0);
}

// 1: pasta
const flames = document.querySelectorAll(".flame");
let wished = false;
function snuff(f) {
  f.classList.add("out");
  const allOut = [...flames].every((x) => x.classList.contains("out"));
  if (allOut && !wished) {
    wished = true;
    setTimeout(() => {
      $("finalTitle").textContent = "İyi ki doğdun tekrardan, " + ISIM + " 💙";
      go("stageGift");
      confetti(120);
    }, 700);
  }
}
flames.forEach((f) => f.addEventListener("click", () => snuff(f)));
$("blow").addEventListener("click", () =>
  flames.forEach((f, i) => setTimeout(() => snuff(f), i * 250))
);

// 2: hediye
$("gift").addEventListener("click", () => {
  $("gift").hidden = true;
  $("giftHint").hidden = true;
  $("giftText").textContent = HEDIYE_NOTU;
  $("closing").textContent = KAPANIS;
  $("giftNote").hidden = false;
  confetti(160);
});

// konfeti (tek döngü, üst üste çağrılabilir)
const cv = $("confetti");
const cx = cv.getContext("2d");
let bits = [];
let running = false;
function confetti(n = 140) {
  cv.width = innerWidth;
  cv.height = innerHeight;
  for (let i = 0; i < n; i++) {
    bits.push({
      x: Math.random() * cv.width,
      y: -20 - Math.random() * cv.height * 0.5,
      s: 6 + Math.random() * 7,
      vy: 1.5 + Math.random() * 3,
      vx: -1 + Math.random() * 2,
      r: Math.random() * 6,
      vr: -0.1 + Math.random() * 0.2,
      c: COL[(Math.random() * COL.length) | 0],
    });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
}
function frame() {
  cx.clearRect(0, 0, cv.width, cv.height);
  bits = bits.filter((b) => b.y < cv.height + 20);
  bits.forEach((b) => {
    b.x += b.vx;
    b.y += b.vy;
    b.r += b.vr;
    cx.save();
    cx.translate(b.x, b.y);
    cx.rotate(b.r);
    cx.fillStyle = b.c;
    cx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * 0.6);
    cx.restore();
  });
  if (bits.length) requestAnimationFrame(frame);
  else running = false;
}

// açılış
$("title1").textContent = "İyi ki doğdun, " + ISIM + "!";
go("stageCake");
