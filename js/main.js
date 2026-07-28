/* =====================================================================
   Patrick Kinyua Karimi — Portfolio interactions
   Vanilla JS · no dependencies
   ===================================================================== */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const stored = localStorage.getItem("pk-theme");
  if (stored) root.setAttribute("data-theme", stored);

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("pk-theme", next);
  });

  /* ---------- Mobile menu ---------- */
  const burger = $("#navBurger");
  const navLinks = $("#navLinks");
  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    burger?.classList.remove("is-open");
    burger?.setAttribute("aria-expanded", "false");
  };
  burger?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Nav state on scroll + scroll progress + back-to-top ---------- */
  const nav = $("#nav");
  const progress = $(".scroll-progress span");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 20);
    toTop?.classList.toggle("is-visible", y > 600);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // gentle stagger for grouped items
            const delay = Math.min(i * 60, 180);
            setTimeout(() => el.classList.add("is-in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Active nav link (scroll spy) ---------- */
  const sections = $$("main section[id]");
  const linkFor = {};
  $$('.nav__links a[href^="#"]').forEach((a) => {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            $$(".nav__links a").forEach((a) => a.classList.remove("active"));
            linkFor[entry.target.id]?.classList.add("active");
          }
        });
      },
      { threshold: 0.5, rootMargin: "-30% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Animated stat counters ---------- */
  const counters = $$(".stat__num");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { runCounter(entry.target); cObs.unobserve(entry.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cObs.observe(c));
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Subtle parallax on hero glows (pointer) ---------- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    const glows = $$(".backdrop__glow");
    window.addEventListener("mousemove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      glows.forEach((g, i) => {
        const depth = (i + 1) * 8;
        g.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Contact form (mailto, self-contained) ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cf-name").value.trim();
    const email = $("#cf-email").value.trim();
    const subject = $("#cf-subject").value.trim();
    const message = $("#cf-message").value.trim();

    note.className = "contact__note";
    if (!name || !email || !message) {
      note.textContent = "Please fill in your name, email and message.";
      note.classList.add("is-err");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "That email address doesn't look right.";
      note.classList.add("is-err");
      return;
    }

    const subj = encodeURIComponent(subject || `Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:kinyua.patrickk@gmail.com?subject=${subj}&body=${body}`;

    note.textContent = "Opening your email client… thank you for reaching out!";
    note.classList.add("is-ok");
    form.reset();
  });

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
