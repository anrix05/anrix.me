/**
 * ANRIX — Single-Viewport Video Background Landing Page
 * Interactivity: Count-up Statistics & Mobile Sheet Navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initCountUpStats();
  initMobileMenu();
  initBgVideo();
  initSubdomainsModal();
});

/**
 * 1. Count-up Stats Animation
 * - Uses easeOutCubic
 * - Duration: 1500 + i * 80ms
 * - Start offset: 480 + i * 90ms
 * - Triggered once via IntersectionObserver (threshold 0.25)
 */
function initCountUpStats() {
  const statElements = document.querySelectorAll(".stat-item");
  if (!statElements.length) return;

  let animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function runCounter(elem, index) {
    const valueDisplay = elem.querySelector(".stat-number");
    if (!valueDisplay) return;

    const targetVal = parseFloat(valueDisplay.getAttribute("data-target") || "0");
    const decimals = parseInt(valueDisplay.getAttribute("data-decimals") || "0", 10);
    const duration = 1500 + index * 80;
    const startDelay = 480 + index * 90;

    setTimeout(() => {
      let startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentVal = easedProgress * targetVal;

        valueDisplay.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          valueDisplay.textContent = targetVal.toFixed(decimals);
        }
      }

      requestAnimationFrame(step);
    }, startDelay);
  }

  function startAllCounters() {
    if (animated) return;
    animated = true;
    statElements.forEach((el, idx) => {
      runCounter(el, idx);
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAllCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    const statsContainer = document.querySelector(".stats");
    if (statsContainer) {
      observer.observe(statsContainer);
    } else {
      startAllCounters();
    }
  } else {
    // Fallback if IntersectionObserver not available
    startAllCounters();
  }
}

/**
 * 2. Mobile Sheet Menu Controller
 * - Toggles aria-expanded, body.menu-open, .active on overlay and sheet
 * - Closes on overlay click, Escape key, link click, or resize > 720px
 */
function initMobileMenu() {
  const burgerBtn = document.querySelector(".burger-btn");
  const overlay = document.querySelector(".mobile-overlay");
  const sheet = document.querySelector(".mobile-sheet");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-signin-btn");

  if (!burgerBtn || !overlay || !sheet) return;

  function openMenu() {
    burgerBtn.setAttribute("aria-expanded", "true");
    overlay.classList.add("active");
    overlay.removeAttribute("hidden");
    sheet.classList.add("active");
    sheet.removeAttribute("hidden");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    burgerBtn.setAttribute("aria-expanded", "false");
    overlay.classList.remove("active");
    sheet.classList.remove("active");
    document.body.classList.remove("menu-open");

    setTimeout(() => {
      if (burgerBtn.getAttribute("aria-expanded") === "false") {
        overlay.setAttribute("hidden", "");
        sheet.setAttribute("hidden", "");
      }
    }, 300);
  }

  function toggleMenu() {
    const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle on burger click
  burgerBtn.addEventListener("click", toggleMenu);

  // Close on overlay click
  overlay.addEventListener("click", closeMenu);

  // Close on link click
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burgerBtn.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  // Close on resize > 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && burgerBtn.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
}

/**
 * 3. Background Video Resilience
 */
function initBgVideo() {
  const video = document.querySelector(".bg-video");
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Auto-play was prevented; ensure muted and retry on user interaction
      video.muted = true;
      const playOnTouch = () => {
        video.play();
        document.removeEventListener("touchstart", playOnTouch);
        document.removeEventListener("click", playOnTouch);
      };
      document.addEventListener("touchstart", playOnTouch, { once: true });
      document.addEventListener("click", playOnTouch, { once: true });
    });
  }
}

/**
 * 4. Subdomains Showcase Modal & Spotlight Carousel Controller
 * - Spotlight Carousel: Framed photographs shingled into a rail with the middle one opened out to carry its caption.
 * - It does not simply scale up — it re-crops, so the picture widens into the frame rather than stretching.
 */
function initSubdomainsModal() {
  const exploreBtn = document.getElementById("explore-btn");
  const modal = document.getElementById("subdomains-modal");
  const closeBtn = document.getElementById("modal-close");

  if (!modal) return;

  function openModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    modal.style.display = "flex";
    modal.removeAttribute("hidden");
    modal.setAttribute("aria-hidden", "false");
    void modal.offsetWidth; // Trigger reflow
    modal.classList.add("active");
    document.body.classList.add("menu-open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      if (!modal.classList.contains("active")) {
        modal.style.display = "none";
        modal.setAttribute("hidden", "");
      }
    }, 300);
  }

  // Expose globally so onclick can always invoke it directly
  window.openSubdomainsModal = openModal;
  window.closeSubdomainsModal = closeModal;

  if (exploreBtn) {
    exploreBtn.addEventListener("click", openModal);
  }

  // Check URL hash on load
  if (window.location.hash === "#subdomains" || window.location.hash === "#showcase") {
    openModal();
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Spotlight Carousel Rail Mechanics
  const cards = Array.from(modal.querySelectorAll(".spotlight-card"));
  const prevBtn = modal.querySelector("#carousel-prev");
  const nextBtn = modal.querySelector("#carousel-next");
  const dotBtns = Array.from(modal.querySelectorAll(".dot-btn"));
  let activeIndex = 1; // Default to center spotlight

  const initialActive = cards.findIndex((c) => c.classList.contains("is-spotlight"));
  if (initialActive !== -1) {
    activeIndex = initialActive;
  }

  function setSpotlight(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    activeIndex = index;

    cards.forEach((card, idx) => {
      if (idx === activeIndex) {
        card.classList.add("is-spotlight");
        card.setAttribute("aria-expanded", "true");
      } else {
        card.classList.remove("is-spotlight");
        card.setAttribute("aria-expanded", "false");
      }
    });

    dotBtns.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Shingled Cards: Click to Spotlight
  cards.forEach((card, idx) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".caption-launch-btn")) {
        return; // Allow direct link clicks
      }
      if (activeIndex !== idx) {
        e.preventDefault();
        setSpotlight(idx);
      }
    });
  });

  // Arrows
  if (prevBtn) {
    prevBtn.addEventListener("click", () => setSpotlight(activeIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => setSpotlight(activeIndex + 1));
  }

  // Dots
  dotBtns.forEach((dot, idx) => {
    dot.addEventListener("click", () => setSpotlight(idx));
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      setSpotlight(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      setSpotlight(activeIndex + 1);
    }
  });

  // Touch Swipe Gestures
  const rail = modal.querySelector("#spotlight-rail");
  if (rail) {
    let touchStartX = 0;
    let touchEndX = 0;

    rail.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    rail.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            setSpotlight(activeIndex + 1);
          } else {
            setSpotlight(activeIndex - 1);
          }
        }
      },
      { passive: true }
    );
  }
}


