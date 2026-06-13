document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SLIDING MOBILE MENU TOGGLE ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const slidingMenu = document.getElementById('sliding-menu');

    if (mobileMenuToggle && slidingMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            slidingMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('is-active'); 
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                slidingMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('is-active'); 
            });
        });
    }
    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // 1. Check if the user previously saved a theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    // 2. Apply the saved theme immediately on load
    if (savedTheme === 'light') {
        body.classList.replace('dark-theme', 'light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon'); // Change to moon icon
    }

    // 3. Handle the click event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Give the button a little spin animation on click
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => themeToggle.style.transform = 'rotate(0deg)', 300);

            if (body.classList.contains('dark-theme')) {
                // Switch to Light
                body.classList.replace('dark-theme', 'light-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                // Switch to Dark
                body.classList.replace('light-theme', 'dark-theme');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    // --- 2. SMOOTH SCROLLING ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 3. CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    
    let formResult = document.getElementById('form-result');
    if (!formResult && contactForm) {
        formResult = document.createElement('p');
        formResult.id = 'form-result';
        formResult.style.marginTop = '1rem';
        formResult.style.textAlign = 'center';
        contactForm.appendChild(formResult);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 
            let nameInput = contactForm.querySelector('input[name="name"]');
            let emailInput = contactForm.querySelector('input[name="email"]');
            let messageInput = contactForm.querySelector('textarea[name="message"]');
            
            let name = nameInput ? nameInput.value.trim() : "";
            let email = emailInput ? emailInput.value.trim() : "";
            let message = messageInput ? messageInput.value.trim() : "";
            let currentDate = new Date().toLocaleDateString("en-US");

            if (!name || !email || !message) {
                formResult.style.display = 'block';
                formResult.innerHTML = "❌ Please fill out all fields.";
                formResult.style.color = "#ef4444";
                return;
            }

            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            formResult.style.display = 'block';
            formResult.innerHTML = "Sending message...";
            formResult.style.color = "#a1a1aa";

            let formattedMessage = `
📝 New Contact Form Submission
───────────────────────────────
📌 Name: ${name}
📧 Email: ${email}
✉️ Message: 
${message}
───────────────────────────────
📅 Sent on: ${currentDate}
            `;

            let formData = new FormData(contactForm);
            formData.set("message", formattedMessage);
            formData.set("subject", "📩 New Contact Form Submission from " + name);

            try {
                let response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                let result = await response.json();

                if (response.status === 200 && result.success) {
                    formResult.innerHTML = "✅ Message sent successfully!";
                    formResult.style.color = "#2dd4bf";
                    contactForm.reset();
                } else {
                    formResult.innerHTML = "❌ " + (result.message || "Something went wrong.");
                    formResult.style.color = "#ef4444";
                }
            } catch (error) {
                formResult.innerHTML = "❌ Network error. Please try again.";
                formResult.style.color = "#ef4444";
            } finally {
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 5000);
            }
        });
    }

    // --- 4. APPLE-STYLE SPOTLIGHT HOVER (OPTIMIZED) ---
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            // Check if this card has the spotlight effect (some might not need it)
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only update CSS variables for the specific card being hovered
            requestAnimationFrame(() => {
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    });
    // --- 5. STAGGERED SCROLL ANIMATIONS ---
    const cardObserver = new IntersectionObserver((entries) => {
        let delay = 0; 
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                delay += 100; 
                cardObserver.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // --- 6. MAGNETIC BUTTONS ---
    const magneticButtons = document.querySelectorAll('.btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 7. CLICK TO EXPAND CERTIFICATES ---
    const certModal = document.getElementById("cert-modal");
    const fullCertImg = document.getElementById("full-cert-img");
    const closeCertModal = document.querySelector(".close-modal");

    if (certModal && fullCertImg && closeCertModal) {
        const certItems = document.querySelectorAll('.cert-item');
        
        certItems.forEach(item => {
            item.style.cursor = 'zoom-in';
            item.addEventListener('click', function() {
                const fullImageSrc = this.getAttribute('data-full-cert');
                if (fullImageSrc) {
                    certModal.style.display = "flex";
                    certModal.style.alignItems = "center";
                    certModal.style.justifyContent = "center";
                    fullCertImg.src = fullImageSrc;
                }
            });
        });

        closeCertModal.onclick = () => certModal.style.display = "none";
        certModal.onclick = (e) => {
            if (e.target !== fullCertImg) certModal.style.display = "none";
        };
    }

    // --- 8. BACK TO TOP BUTTON (Rocket Launch) ---
    const backToTopButton = document.getElementById("backToTop");
    let isLaunching = false; 
    
    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            if (isLaunching) return;
            if (window.scrollY > 200) {
                backToTopButton.style.display = "flex";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener("click", function () {
            isLaunching = true; 
            backToTopButton.classList.add('btn-launch');
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            setTimeout(() => {
                backToTopButton.style.display = "none";
                backToTopButton.classList.remove('btn-launch');
                isLaunching = false; 
            }, 1200); 
        });
    }

    // --- 9. CONSOLE EASTER EGG ---
    console.log(
        "%cHello fellow developer! \n%cLooking at my code? Let's build something great: smdhanu652@gmail.com",
        "color: #0ea5e9; font-size: 20px; font-weight: bold; font-family: monospace;",
        "color: #a1a1aa; font-size: 14px; font-family: monospace;"
    );
    console.log(`
      ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗
      ██╔══██╗██║  ██║██╔══██╗████╗  ██║██║   ██║
      ██║  ██║███████║███████║██╔██╗ ██║██║   ██║
      ██║  ██║██╔══██║██╔══██║██║╚██╗██║██║   ██║
      ██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╔╝
      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
    `);

}); 

// --- 10. SCROLL PROGRESS BAR ---
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

// --- 11. TYPEWRITER EFFECT ---
    const textToType = "Software Developer & AI Enthusiast";
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        let i = 0;
        
        // Wait 1 second to let the CSS slide-up animation finish first
        setTimeout(() => {
            function type() {
                if (i < textToType.length) {
                    typewriterElement.innerHTML += textToType.charAt(i);
                    i++;
                    
                    setTimeout(type, Math.random() * 50 + 40); 
                }
            }
            type();
        }, 1000); 
    }