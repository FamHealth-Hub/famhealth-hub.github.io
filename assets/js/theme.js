// ===== DEIN PERFEKTER THEME SWITCHER =====
document.addEventListener("DOMContentLoaded", () => {
  const themePoints = document.querySelectorAll(".theme-points span");
  const themeMarker = document.getElementById("themeMarker");

  function setTheme(mode) {
    if (mode === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", mode);
    }
    localStorage.setItem("gc-theme", mode);

    const indexMap = { auto: 0, light: 1, dark: 2 };
    const idx = indexMap[mode] ?? 0;
    themeMarker.style.transform = `translateX(${idx * 100}%)`;

    // Active-Klasse für besseren Kontrast
    themePoints.forEach(s => s.classList.remove("active"));
    themePoints[idx].classList.add("active");
  }

  themePoints.forEach(span => {
    span.addEventListener("click", () => setTheme(span.dataset.mode));
  });

  // Beim Laden
  let saved = localStorage.getItem("gc-theme");
  if (!saved || !["auto","light","dark"].includes(saved)) saved = "auto";
  setTheme(saved);

  // Live-Reaktion bei Systemänderung (nur wenn Auto aktiv)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (localStorage.getItem("gc-theme") === "auto") setTheme("auto");
  });
});