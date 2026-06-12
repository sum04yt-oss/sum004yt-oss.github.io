const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const form = document.querySelector("[data-form]");
const formMessage = document.querySelector("[data-form-message]");

// Mobile navigation uses one shared close helper so menu links and CTAs behave consistently.
const closeMenu = () => {
  header?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open") ?? false;
  document.body.classList.toggle("nav-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector("button");
  const answer = item.querySelector(".faq-answer");

  // The answer height is measured dynamically, which keeps the accordion smooth with any text length.
  button?.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0";
  });
});

// Sections fade in once, when they enter the viewport.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".section-reveal").forEach((section) => {
  revealObserver.observe(section);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  // Demo form: no data is sent, but the user gets clear confirmation.
  form.reset();
  if (formMessage) {
    formMessage.textContent = "Dziękujemy! Skontaktujemy się z Tobą w ciągu 24h.";
  }
});
