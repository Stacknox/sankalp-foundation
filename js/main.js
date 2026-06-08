/* Sankalp Foundation — interactions: nav, scroll-reveal, album lightbox */
(function () {
  "use strict";

  /* ---------- Sticky nav border on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          var el = en.target;
          setTimeout(function () { el.classList.add("in"); }, (el.dataset.delay ? +el.dataset.delay : i % 4 * 70));
          io.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Connection graph (community network) ---------- */
  (function network() {
    var canvas = document.getElementById("net");
    if (!canvas) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1, nodes = [], raf = null, running = false;
    var LINK = 160, ACCENT = "85,102,192"; // --blue-600 rgb

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(14, Math.min(54, Math.round(w * h / 16000)));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22 });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      var i, j, a, b, dx, dy, d;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i]; a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          a = nodes[i]; b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(" + ACCENT + "," + (1 - d / LINK) * 0.28 + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        ctx.fillStyle = "rgba(" + ACCENT + ",0.8)";
        ctx.beginPath(); ctx.arc(a.x, a.y, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      raf = window.requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; frame(); } }
    function stop() { running = false; if (raf) window.cancelAnimationFrame(raf); }

    size();
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es[0].isIntersecting ? start() : stop();
      }, { threshold: 0.01 }).observe(canvas);
    } else { start(); }
  })();

  /* ---------- Lightbox ---------- */
  var figures = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (!figures.length) return;

  var items = figures.map(function (f) {
    var img = f.querySelector("img");
    return { src: f.getAttribute("data-full") || img.src, cap: img.getAttribute("alt") || "" };
  });

  var lb = document.createElement("div");
  lb.className = "lb";
  lb.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-next" aria-label="Next">&#8250;</button>' +
    '<div class="lb-cap"></div>';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector(".lb-cap");
  var idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].src;
    lbImg.alt = items[idx].cap;
    lbCap.textContent = items[idx].cap;
  }
  function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  figures.forEach(function (f, i) {
    f.addEventListener("click", function () { open(i); });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });

  /* touch swipe */
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    x0 = null;
  });
})();
