// script.js — interactions, animations and basic form handling
document.addEventListener("DOMContentLoaded", () => {
  // year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobile-nav");
  burger && burger.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
  });

  // theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle && themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function(e){
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
        // hide mobile nav after click
        if (window.innerWidth < 760) {
          const mob = document.getElementById("mobile-nav");
          if (mob) mob.style.display = "none";
        }
      }
    });
  });

  // animate skill bars
  const skillBars = document.querySelectorAll(".skill-bar");
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const percent = parseInt(bar.getAttribute("data-percent") || "0", 10);
      const fill = bar.querySelector(".skill-bar-fill");
      const pctText = bar.querySelector(".skill-percent");
      if (fill) {
        // animate with CSS transition
        setTimeout(() => {
          fill.style.width = percent + "%";
        }, 200);
      }
      if (pctText) pctText.textContent = percent + "%";
    });
  };

  // intersection observer to trigger animation when in view
  const obsOptions = { threshold: 0.35 };
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.disconnect();
      }
    });
  }, obsOptions);
  const skillsSection = document.getElementById("skills");
  if (skillsSection) obs.observe(skillsSection);

  // contact form basic handling
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // simple validation
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill all fields.";
        return;
      }
      // fake submit demo
      status.textContent = "Sending message...";
      setTimeout(() => {
        status.textContent = "Message sent (demo). Replace with real backend/API.";
        form.reset();
      }, 900);
    });
  }

  // lazy image load (basic)
  document.querySelectorAll('img').forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
      img.setAttribute('loading', 'lazy');
    }
  });
});