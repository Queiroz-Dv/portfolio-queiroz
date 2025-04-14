// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Update current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

function highlightNavLink() {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector(".header").offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// Add scroll animation for elements
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".section-header, .about-grid, .experience-card, .project-card, .methodology-card, .skill-item"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight * 0.8) {
      element.classList.add("animate");
    }
  });
}

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .section-header, .about-grid, .experience-card, .project-card, .methodology-card, .skill-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section-header.animate, .about-grid.animate, .experience-card.animate, .project-card.animate, .methodology-card.animate, .skill-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active, .mobile-nav-link.active {
        color: rgb(var(--primary));
        font-weight: 600;
    }
`;
document.head.appendChild(style);

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// SVG favicon for browsers that support it
const faviconSvg = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="url(#favicon-gradient)"/>
    <path d="M25 65V35H45C50 35 53.75 36.25 56.25 38.75C58.75 41.25 60 44.5833 60 48.75C60 52.9167 58.75 56.25 56.25 58.75C53.75 61.25 50 62.5 45 62.5H35V65H25ZM35 52.5H45C46.6667 52.5 48 52 49 51C50 50 50.5 48.5833 50.5 46.75C50.5 44.9167 50 43.5 49 42.5C48 41.5 46.6667 41 45 41H35V52.5Z" fill="white"/>
    <path d="M60 65V35H70V50L85 35H97.5L80 52.5L97.5 65H85L70 50V65H60Z" fill="white"/>
    <defs>
        <linearGradient id="favicon-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#9333EA"/>
            <stop offset="100%" stop-color="#EC4899"/>
        </linearGradient>
    </defs>
</svg>
`;

// Create a blob URL for the SVG favicon
const blob = new Blob([faviconSvg], { type: "image/svg+xml" });
const url = URL.createObjectURL(blob);

// Create a link element for the favicon
const link = document.createElement("link");
link.rel = "icon";
link.href = url;
link.type = "image/svg+xml";

// Add the favicon to the document head
document.head.appendChild(link);
