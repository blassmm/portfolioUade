// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Update local time
  const updateLocalTime = () => {
    const timeElement = document.querySelector(".footer-meta .time");
    if (timeElement) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      timeElement.textContent = `Local time ${hours}:${minutes}`;
    }
  };

  // Update time immediately and then every minute
  updateLocalTime();
  setInterval(updateLocalTime, 60000);

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // Toggle icon visibility
      if (navLinks.classList.contains("active")) {
        menuIcon.style.opacity = "0";
        menuIcon.style.transform = "rotate(90deg)";
        closeIcon.style.opacity = "1";
        closeIcon.style.transform = "rotate(0)";
        body.classList.add("menu-open");
      } else {
        menuIcon.style.opacity = "1";
        menuIcon.style.transform = "rotate(0)";
        closeIcon.style.opacity = "0";
        closeIcon.style.transform = "rotate(-90deg)";
        body.classList.remove("menu-open");
      }
    });
  }

  // Close mobile menu when clicking on a link
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      // Reset icon state
      if (menuIcon && closeIcon) {
        menuIcon.style.opacity = "1";
        menuIcon.style.transform = "rotate(0)";
        closeIcon.style.opacity = "0";
        closeIcon.style.transform = "rotate(-90deg)";
      }
      body.classList.remove("menu-open");
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would normally send the form data to a server
      // For now, we'll just show a success message

      // Create success message
      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.innerHTML = `
        <h3>Message Sent!</h3>
        <p>Thank you ${name}, I'll get back to you soon.</p>
      `;

      // Replace form with success message
      contactForm.innerHTML = "";
      contactForm.appendChild(successMessage);

      // Animate success message
      gsap.from(".form-success", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      // Log the form data to console (for demonstration)
      console.log({
        name,
        email,
        subject,
        message,
      });
    });
  }

  // Hero section animations
  const heroTl = gsap.timeline();

  // Animate hero text
  heroTl
    .from(".hero-section h1", {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    })
    .from(
      ".hero-section .creative",
      {
        duration: 0.6,
        opacity: 0,
        y: 20,
        color: "#FFFFFF",
        ease: "power3.out",
      },
      "-=0.3"
    )
    .from(
      ".hero-subheading",
      {
        duration: 0.6,
        opacity: 0,
        y: 20,
        ease: "power3.out",
      },
      "-=0.3"
    );

  // Animate 3D objects
  gsap.set(".object", { opacity: 0, scale: 0.5 });

  gsap.to(".object-1", {
    opacity: 0.5,
    scale: 1,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.to(".object-2", {
    opacity: 0.5,
    scale: 1,
    duration: 1.5,
    delay: 0.8,
    ease: "power3.out",
  });

  gsap.to(".object-3", {
    opacity: 0.5,
    scale: 1,
    duration: 1.5,
    delay: 1.1,
    ease: "power3.out",
  });

  // Continuous floating animation for 3D objects
  gsap.to(".object-1", {
    y: "-=20",
    x: "+=10",
    rotation: 5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".object-2", {
    y: "+=15",
    x: "-=10",
    rotation: -5,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5,
  });

  gsap.to(".object-3", {
    y: "-=15",
    x: "+=5",
    rotation: 8,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1,
  });

  // Animate navbar
  gsap.from(".navbar", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power3.out",
  });

  // Animate logo
  gsap.from(".logo", {
    duration: 1.2,
    x: -50,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out",
  });

  // Animate nav links
  gsap.from(".nav-links li", {
    duration: 1,
    opacity: 0,
    y: -20,
    stagger: 0.2,
    delay: 0.8,
    ease: "power3.out",
  });

  // Animate footer meta
  gsap.from(".footer-meta", {
    duration: 1,
    opacity: 0,
    y: 20,
    delay: 1.5,
    ease: "power3.out",
  });

  gsap.from(".social-links a", {
    duration: 0.8,
    opacity: 0,
    y: 10,
    stagger: 0.1,
    delay: 1.8,
    ease: "power3.out",
  });

  gsap.from(".cta-button", {
    duration: 0.8,
    opacity: 0,
    y: 10,
    delay: 2,
    ease: "power3.out",
  });

  // Section background animations
  const sectionBgs = document.querySelectorAll(".section");

  sectionBgs.forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      backgroundPosition: "center 30%",
      ease: "none",
    });
  });

  // Animate section headings with line effect
  const sectionHeadings = document.querySelectorAll(".section h2");

  sectionHeadings.forEach((heading) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(heading, {
      duration: 0.8,
      opacity: 0,
      y: 30,
      ease: "power3.out",
    });

    // Add the underline animation separately
    tl.fromTo(
      heading,
      { "--underline-width": "0px" },
      { "--underline-width": "60px", duration: 0.6, ease: "power3.inOut" },
      "-=0.3"
    );
  });

  // Animate about content
  gsap.from(".about-content p", {
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 1,
    opacity: 0,
    y: 30,
    ease: "power3.out",
  });

  // Animate project cards
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Animate contact content
  gsap.from(".contact-content p", {
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: "power3.out",
  });

  // Animate contact form
  gsap.from(".form-group", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".contact-btn", {
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    delay: 0.6,
    ease: "power3.out",
  });

  // Animate footer - without scroll trigger
  gsap.from("footer", {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 2.5,
    ease: "power3.out",
  });
});
