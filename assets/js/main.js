/*========== MENU TOGGLE ==========*/
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}

/*========== CLOSE MENU ON LINK CLICK ==========*/
const navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

/*========== ACTIVE LINK ON SCROLL ==========*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
            '.nav__menu a[href="#' + sectionId + '"]'
        );

        if (!navLink) return;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLink.classList.add("active-link");
        } else {
            navLink.classList.remove("active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);

/*========== HEADER SHADOW ==========*/
const header = document.querySelector(".l-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)";
    } else {
        header.style.boxShadow = "0 1px 4px rgba(146,161,176,.15)";
    }
});

/*========== SMOOTH SCROLL ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length <= 1) return;

        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/*========== CONTACT FORM (Web3Forms) ==========*/
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector(".contact__button");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        fetch(contactForm.action, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formStatus.textContent = "Message sent! I'll get back to you soon.";
                    formStatus.classList.add("form-status--success");
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Something went wrong. Please try again.";
                    formStatus.classList.add("form-status--error");
                }
            })
            .catch(() => {
                formStatus.textContent = "Network error. Please try again later.";
                formStatus.classList.add("form-status--error");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            });
    });
}

/*========== SCROLL REVEAL ==========*/
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        origin: "bottom",
        distance: "50px",
        duration: 900,
        delay: 120,
        reset: false
    });

    sr.reveal(".home__data");
    sr.reveal(".home__img", { origin: "right" });
    sr.reveal(".about__img", { origin: "left" });
    sr.reveal(".about__text, .about__subtitle", { origin: "right" });

    sr.reveal(
        ".education__card, .skill__card, .project__card, .certificate__card",
        { interval: 100 }
    );

    sr.reveal(".contact__card", { interval: 80 });
    sr.reveal(".contact__form", { origin: "bottom" });
}
