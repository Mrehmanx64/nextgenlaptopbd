//  PRODUCTS DATA
const PRODUCTS = [
  {
    id: 1,
    name: "Apple MacBook Pro M3 Pro",
    spec: '14" · 18GB · 512GB SSD',
    price: 189000,
    oldPrice: 210000,
    img: "https://images.unsplash.com/photo-1611186871525-854d9b4f16c4?w=300&q=80",
    rating: 5,
    brand: "Apple",
    badge: "hot",
  },
  {
    id: 2,
    name: "ASUS ROG Strix Scar 16",
    spec: "RTX 4090 · 32GB · 1TB SSD",
    price: 295000,
    oldPrice: 320000,
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=80",
    rating: 5,
    brand: "ASUS",
    badge: "hot",
  },
  {
    id: 3,
    name: "Dell XPS 15 OLED",
    spec: "i9-13900H · RTX 4060 · 32GB",
    price: 185000,
    oldPrice: 200000,
    img: "https://images.unsplash.com/photo-1588702547923-7408b552c4b7?w=300&q=80",
    rating: 4,
    brand: "Dell",
    badge: "sale",
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Extreme",
    spec: "i7-13800H · RTX 3060 · 16GB",
    price: 155000,
    oldPrice: 170000,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
    rating: 4,
    brand: "Lenovo",
    badge: "",
  },
  {
    id: 5,
    name: "HP Spectre x360 14",
    spec: "i7 Ultra · 16GB · 1TB · OLED",
    price: 155000,
    oldPrice: 168000,
    img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80",
    rating: 4,
    brand: "HP",
    badge: "",
  },
  {
    id: 6,
    name: "Acer Predator Helios 18",
    spec: "i9-14900HX · RTX 4080 · 32GB",
    price: 265000,
    oldPrice: 290000,
    img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&q=80",
    rating: 5,
    brand: "Acer",
    badge: "hot",
  },
  {
    id: 7,
    name: "MSI Titan GT77 HX",
    spec: "i9-13980HX · RTX 4090 · 64GB",
    price: 395000,
    oldPrice: 420000,
    img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80",
    rating: 5,
    brand: "MSI",
    badge: "hot",
  },
  {
    id: 8,
    name: "HP EliteBook 860 G10",
    spec: "i7-1365U · 16GB · 512GB SSD",
    price: 95000,
    oldPrice: 115000,
    img: "https://images.unsplash.com/photo-1611186871525-854d9b4f16c4?w=300&q=80",
    rating: 4,
    brand: "HP",
    badge: "sale",
  },
];

//  CART STATE
let cart = [];
let cartOpen = false;

function addToCart(name, price) {
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  showToast(`${name} added to cart!`, "fa-cart-plus");
  // Bounce cart icon
  const cartBtns = document.querySelectorAll(".icon-btn");
  cartBtns.forEach((btn) => {
    if (btn.querySelector(".fa-cart-shopping")) {
      btn.style.transform = "scale(1.3)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 300);
    }
  });
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document
    .querySelectorAll("#cart-count")
    .forEach((el) => (el.textContent = count));
  document.getElementById("cart-total").textContent =
    "৳ " + total.toLocaleString("en-IN");

  const itemsEl = document.getElementById("cart-items");
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div style="text-align:center;padding:40px 20px;color:var(--text3);"><i class="fa-solid fa-cart-shopping" style="font-size:48px;opacity:0.3;margin-bottom:12px;display:block;"></i><p style="font-size:14px;">Your cart is empty</p></div>`;
    return;
  }
  itemsEl.innerHTML = cart
    .map(
      (item, idx) => `
    <div style="background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:12px;display:flex;align-items:center;gap:12px;">
      <div style="width:48px;height:48px;background:var(--bg3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">💻</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:12px;font-weight:600;font-family:'Montserrat',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
        <div style="font-size:13px;color:var(--primary);font-family:'Oswald',sans-serif;">৳ ${item.price.toLocaleString("en-IN")}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <button onclick="changeQty(${idx},-1)" style="width:26px;height:26px;border-radius:50%;background:var(--bg3);border:1px solid var(--card-border);cursor:pointer;color:var(--text);font-size:14px;display:flex;align-items:center;justify-content:center;">-</button>
        <span style="font-size:13px;font-weight:600;min-width:20px;text-align:center;">${item.qty}</span>
        <button onclick="changeQty(${idx},1)" style="width:26px;height:26px;border-radius:50%;background:var(--primary);border:none;cursor:pointer;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;">+</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
  showToast("Cart cleared", "fa-trash");
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById("mini-cart").classList.toggle("open", cartOpen);
  document.getElementById("cart-overlay").classList.toggle("open", cartOpen);
  document.body.style.overflow = cartOpen ? "hidden" : "";
}

//  TOAST
function showToast(msg, icon = "fa-circle-check") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

//  THEME
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  const icon = document.getElementById("theme-icon");
  icon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
}

//  PRODUCTS RENDER
function renderProducts() {
  const grid = document.getElementById("products-grid");
  // Skeleton first
  grid.innerHTML = PRODUCTS.map(
    () => `
    <div class="product-card">
      <div class="img-wrap"><div class="skeleton" style="width:100%;height:100%;"></div></div>
      <div style="padding:16px;"><div class="skeleton" style="height:16px;margin-bottom:8px;"></div><div class="skeleton" style="height:12px;width:70%;margin-bottom:12px;"></div><div class="skeleton" style="height:20px;width:50%;"></div></div>
    </div>
  `,
  ).join("");

  setTimeout(() => {
    grid.innerHTML = PRODUCTS.map(
      (p) => `
      <div class="product-card">
        <div class="img-wrap">
          ${p.badge === "hot" ? '<span class="badge badge-hot"><i class="fa-solid fa-fire"></i> HOT</span>' : p.badge === "sale" ? '<span class="badge badge-sale"><i class="fa-solid fa-tag"></i> SALE</span>' : ""}
          <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        </div>
        <div style="padding:16px;">
          <div style="font-size:10px;color:var(--primary);font-family:'Montserrat',sans-serif;font-weight:600;text-transform:uppercase;margin-bottom:4px;">${p.brand}</div>
          <h4 style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:13px;margin-bottom:4px;line-height:1.4;">${p.name}</h4>
          <p style="font-size:11px;color:var(--text3);margin-bottom:8px;">${p.spec}</p>
          <div class="stars mb-2">${'<i class="fa-solid fa-star"></i>'.repeat(p.rating)}${p.rating < 5 ? '<i class="fa-regular fa-star"></i>'.repeat(5 - p.rating) : ""} <span style="font-size:10px;color:var(--text3);margin-left:2px;">(${Math.floor(Math.random() * 200 + 50)})</span></div>
          <div class="flex items-center justify-between mt-2">
            <div>
              ${p.oldPrice ? `<div class="price-old">৳ ${p.oldPrice.toLocaleString("en-IN")}</div>` : ""}
              <div class="price">৳ ${p.price.toLocaleString("en-IN")}</div>
            </div>
            <button class="btn-primary" style="padding:8px 14px;font-size:11px;" onclick="addToCart('${p.name}',${p.price})">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `,
    ).join("");
  }, 1200);
}

//  CAROUSEL
let currentSlide = 0;
const slides = 3;

function initCarousel() {
  const dotsEl = document.getElementById("carousel-dots");
  for (let i = 0; i < slides; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${i === 0 ? "var(--primary)" : "rgba(255,255,255,0.3)"};cursor:pointer;transition:all 0.3s;`;
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);
  }
  setInterval(() => goToSlide((currentSlide + 1) % slides), 4000);
}

function goToSlide(idx) {
  currentSlide = idx;
  document.getElementById("carousel-track").style.transform =
    `translateX(-${idx * 100}%)`;
  document.querySelectorAll("#carousel-dots div").forEach((d, i) => {
    d.style.background = i === idx ? "var(--primary)" : "rgba(255,255,255,0.3)";
    d.style.width = i === idx ? "24px" : "8px";
    d.style.borderRadius = "99px";
  });
}

//  COUNTDOWN
function initCountdown() {
  let h = 8,
    m = 45,
    s = 30;
  setInterval(() => {
    s--;
    if (s < 0) {
      s = 59;
      m--;
    }
    if (m < 0) {
      m = 59;
      h--;
    }
    if (h < 0) {
      h = 23;
    }
    document.getElementById("cd-h").textContent = String(h).padStart(2, "0");
    document.getElementById("cd-m").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-s").textContent = String(s).padStart(2, "0");
  }, 1000);
}

//  SCROLL EFFECTS
function initScrollEffects() {
  // Header scroll
  window.addEventListener("scroll", () => {
    document
      .getElementById("header")
      .classList.toggle("scrolled", window.scrollY > 50);
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

//  MOBILE SEARCH
function toggleMobileSearch() {
  const el = document.getElementById("mobile-search");
  el.classList.toggle("hidden");
  if (!el.classList.contains("hidden")) el.querySelector("input").focus();
}

//  SMOOTH SCROLL
function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

//  SEARCH
function doSearch() {
  const val = document.getElementById("search-input").value.trim();
  if (val) showToast(`Searching for "${val}"…`, "fa-magnifying-glass");
}
document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById("search-input");
  if (inp) {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }
});

//  GSAP ANIMATIONS
function initGSAP() {
  if (typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.from(".hero-text > *", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.3,
  });
  gsap.from(".laptop-float", {
    x: 80,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    delay: 0.5,
  });

  // Feature cards stagger
  gsap.from(".feature-card", {
    scrollTrigger: { trigger: "#features", start: "top 75%" },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power3.out",
  });

  // Brand cards
  gsap.from(".brand-card", {
    scrollTrigger: { trigger: "#brands", start: "top 75%" },
    scale: 0.85,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "back.out(1.5)",
  });
}

//  INIT
window.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initCarousel();
  initCountdown();
  initScrollEffects();
  setTimeout(initGSAP, 100);
});

// Swipe support for carousel
let touchStartX = 0;
document.getElementById("bento-carousel")?.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
document.getElementById("bento-carousel")?.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40)
    goToSlide(
      diff > 0
        ? (currentSlide + 1) % slides
        : (currentSlide - 1 + slides) % slides,
    );
});
