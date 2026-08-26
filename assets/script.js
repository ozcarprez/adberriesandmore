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
