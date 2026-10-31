/* год */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* меню */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  });
}

/* кнопка наверх */
const toTop = document.querySelector(".to-top");

if (toTop) {
  window.addEventListener("scroll", () => {
    toTop.hidden = window.scrollY < 400;
  });
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* аккордеон */
document.querySelectorAll(".accordion__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !open);
    panel.hidden = open;
  });
});

/* фильтр портфолио */
const filterBtns = document.querySelectorAll(".filter__btn");
const projects = document.querySelectorAll("#projects .card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    projects.forEach((card) => {
      const show = btn.dataset.filter === "all" || card.dataset.category === btn.dataset.filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

/* формы — скип, другое задание */
