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

/* формы */
const messages = {
  valueMissing: "Заполните это поле",
  typeMismatch: "Проверьте формат значения",
  patternMismatch: "Проверьте формат значения",
  tooShort: "Слишком короткое значение",
};

function validateField(field) {
  const wrap = field.closest(".form__field");
  const error = wrap.querySelector(".form__error");
  const key = Object.keys(messages).find((k) => field.validity[k]);
  const text = key ? field.dataset.error || messages[key] : "";
  error.textContent = text;
  wrap.classList.toggle("is-invalid", Boolean(text));
  wrap.classList.toggle("is-valid", !text && field.value !== "");
  return !text;
}

document.querySelectorAll("form[data-validate]").forEach((form) => {
  const fields = form.querySelectorAll("input, select, textarea");
  const status = form.querySelector(".form__status");

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form__field").classList.contains("is-invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = [...fields].map((field) => validateField(field));

    if (!results.every(Boolean)) {
      status.textContent = "";
      form.querySelector(".is-invalid :is(input, select, textarea)").focus();
      return;
    }

    form.reset();
    form.querySelectorAll(".form__field").forEach((w) => w.classList.remove("is-valid"));
    status.textContent = "Готово: форма прошла проверку. Отправка на сервер не подключена.";
  });
});
