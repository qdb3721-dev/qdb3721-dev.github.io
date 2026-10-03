(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 主题切换 ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  /* ---------- 滚动进度 / 头部状态 / 回到顶部 ---------- */
  var progressBar = document.getElementById("progress-bar");
  var header = document.getElementById("header");
  var toTop = document.getElementById("to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(y / max, 1) : 0;

    if (progressBar) progressBar.style.width = (ratio * 100).toFixed(2) + "%";
    if (header) header.classList.toggle("is-stuck", y > 6);
    if (toTop) toTop.classList.toggle("is-visible", y > 420);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 打字机 ---------- */
  var typedEl = document.getElementById("typed");
  var phrases = ["开发者", "开源爱好者", "喜欢把复杂变简单", "终身学习者"];

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = phrases[0];
    } else {
      var pIndex = 0, cIndex = 0, deleting = false;

      (function tick() {
        var word = phrases[pIndex];
        typedEl.textContent = word.slice(0, cIndex);

        if (!deleting && cIndex < word.length) {
          cIndex++;
          setTimeout(tick, 95);
        } else if (!deleting && cIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1500);
        } else if (deleting && cIndex > 0) {
          cIndex--;
          setTimeout(tick, 45);
        } else {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          setTimeout(tick, 320);
        }
      })();
    }
  }

  /* ---------- 滚动进入动画 ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () { el.classList.add("is-in"); }, i * 70);
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 数字滚动 ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    var start = performance.now();
    var duration = 1200;

    (function step(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          co.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---------- 导航高亮 ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---------- 年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
