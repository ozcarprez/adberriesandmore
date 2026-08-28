(function () {
  "use strict";

  var html = document.documentElement;
  var STORAGE_KEY = "adb-lang";

  function setLang(lang) {
    html.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
    document.title = lang === "es" ? window.__ADB_TITLE_ES__ : window.__ADB_TITLE_EN__;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", lang === "es" ? window.__ADB_DESC_ES__ : window.__ADB_DESC_EN__);
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang-btn"));
    });
  });

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved === "en" || saved === "es") setLang(saved);

  // Mobile nav
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll progress bar + header shadow on scroll
  var progress = document.getElementById("scroll-progress");
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Subtle mouse-tilt on the shipment route card (skipped for touch / reduced motion)
  var routeCard = document.querySelector(".route-card");
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia && window.matchMedia("(hover: none)").matches;
  if (routeCard && !prefersReducedMotion && !isTouch) {
    routeCard.addEventListener("mousemove", function (e) {
      var rect = routeCard.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      routeCard.style.transform =
        "perspective(900px) rotateY(" + (x * 6) + "deg) rotateX(" + (y * -6) + "deg) translateY(-2px)";
    });
    routeCard.addEventListener("mouseleave", function () {
      routeCard.style.transform = "";
    });
  }

  // Contact form (static — no backend yet)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = encodeURIComponent(form.name.value || "");
      var company = encodeURIComponent(form.company.value || "");
      var email = encodeURIComponent(form.email.value || "");
      var message = encodeURIComponent(form.message.value || "");
      var subject = encodeURIComponent("Website inquiry — " + (form.name.value || ""));
      var body = "Name/Nombre: " + name + "%0ACompany/Empresa: " + company + "%0AEmail: " + email + "%0A%0A" + message;
      window.location.href = "mailto:" + window.__ADB_EMAIL__ + "?subject=" + subject + "&body=" + body;
    });
  }
})();
