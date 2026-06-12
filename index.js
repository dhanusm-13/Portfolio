document.addEventListener('DOMContentLoaded', function() {

    // --- 1. MOBILE MENU TOGGLE ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        // Toggle menu open/close when clicking the hamburger icon
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close the menu automatically when any link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
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

    // --- 3. CONTACT FORM (Merged: Validation, Custom Message & No-Redirect) ---
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    
    // Ensure we have a place to show the result message
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
            e.preventDefault(); // Stop standard redirect

            // Grab inputs
            let nameInput = contactForm.querySelector('input[name="name"]');
            let emailInput = contactForm.querySelector('input[name="email"]');
            let messageInput = contactForm.querySelector('textarea[name="message"]');
            
            let name = nameInput ? nameInput.value.trim() : "";
            let email = emailInput ? emailInput.value.trim() : "";
            let message = messageInput ? messageInput.value.trim() : "";
            let currentDate = new Date().toLocaleDateString("en-US");

            // Basic validation
            if (!name || !email || !message) {
                formResult.style.display = 'block';
                formResult.innerHTML = "❌ Please fill out all fields.";
                formResult.style.color = "#ef4444";
                return;
            }

            // Show loading state
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            formResult.style.display = 'block';
            formResult.innerHTML = "Sending message...";
            formResult.style.color = "#a1a1aa";

            // Your custom formatted message
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

            // Prepare Form Data
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
                // Reset button state
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formResult.style.display = 'none';
                }, 5000);
            }
        });
    }

    // --- 4. BACK TO TOP BUTTON (Optional) ---
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});


    //  APPLE-STYLE SPOTLIGHT HOVER
    
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for the radial gradient
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    
    //  STAGGERED SCROLL ANIMATIONS
    
    const cardObserver = new IntersectionObserver((entries) => {
        let delay = 0; // Starts with no delay
        
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the class with a cascading delay
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                delay += 100; // Adds 100ms delay to the next card in the row
                cardObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { 
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the bottom
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    
    //  CONSOLE EASTER EGG
   
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

    const magneticButtons = document.querySelectorAll('.btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            
            // FIXED: Using clientX and clientY instead of pageX and pageY
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Move the button slightly towards the cursor
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseout', function(e) {
            // Snap back to original position when mouse leaves
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

   // ==========================================
    // CLICK TO EXPAND CERTIFICATES
    // ==========================================
    const certModal = document.getElementById("cert-modal");
    const fullCertImg = document.getElementById("full-cert-img");
    const closeCertModal = document.querySelector(".close-modal");

    if (certModal && fullCertImg && closeCertModal) {
        // Select the clickable areas
        const certItems = document.querySelectorAll('.cert-item');

        certItems.forEach(item => {
            item.style.cursor = 'zoom-in';
            item.addEventListener('click', function() {
                // Grab the path to the full image from the data attribute
                const fullImageSrc = this.getAttribute('data-full-cert');
                if (fullImageSrc) {
                    certModal.style.display = "flex";
                    certModal.style.alignItems = "center";
                    certModal.style.justifyContent = "center";
                    fullCertImg.src = fullImageSrc;
                }
            });
        });

        // Close logic
        closeCertModal.onclick = () => certModal.style.display = "none";
        certModal.onclick = (e) => {
            if (e.target !== fullCertImg) certModal.style.display = "none";
        };
    }