document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const updateLocalTime = () => {
    const timeElement = document.querySelector(".footer-meta .time");
    if (timeElement) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      timeElement.textContent = `Local time ${hours}:${minutes}`;
    }
  };

  updateLocalTime();
  setInterval(updateLocalTime, 60000);

  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
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

  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      if (menuIcon && closeIcon) {
        menuIcon.style.opacity = "1";
        menuIcon.style.transform = "rotate(0)";
        closeIcon.style.opacity = "0";
        closeIcon.style.transform = "rotate(-90deg)";
      }
      body.classList.remove("menu-open");
    });
  });

  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.innerHTML = `
        <h3>Message Sent!</h3>
        <p>Thank you ${name}, I'll get back to you soon.</p>
      `;

      contactForm.innerHTML = "";
      contactForm.appendChild(successMessage);

      gsap.from(".form-success", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      console.log({
        name,
        email,
        subject,
        message,
      });
    });
  }

  const heroTl = gsap.timeline();

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

  gsap.from(".navbar", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".logo", {
    duration: 1.2,
    x: -50,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(".nav-links li", {
    duration: 1,
    opacity: 0,
    y: -20,
    stagger: 0.2,
    delay: 0.8,
    ease: "power3.out",
  });

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
    x: -10,
    stagger: 0.1,
    delay: 1.8,
    ease: "power3.out",
  });

  gsap.from(".status-dot", {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    delay: 2,
    ease: "back.out(1.7)",
  });

  gsap.from(".location, .time", {
    duration: 0.8,
    opacity: 0,
    y: 10,
    stagger: 0.2,
    delay: 2.1,
    ease: "power3.out",
  });

  gsap.from(".cta-button", {
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    delay: 2.3,
    ease: "power3.out",
  });

  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    gsap.from(section.querySelector(".section::before"), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".section h2").forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(heading.querySelector("h2::after"), {
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      width: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  });

  gsap.from(".about-content p", {
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-container",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".contact-content p", {
    scrollTrigger: {
      trigger: ".contact-content",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".form-group", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.from(".contact-btn", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from("footer", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: "power3.out",
  });
});
