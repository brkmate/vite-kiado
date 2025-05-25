window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollToTopBtn");
  if (btn) {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});


