document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        
        // Save preference
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile Menu Toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('active');
});

// Prevent the mobile menu from closing when a nav link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent the default anchor link behavior
        event.preventDefault();

        // Get the target section from the href attribute
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smoothly scroll to the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Optionally, close the menu after clicking a link (if desired)
        // Uncomment the following lines if you want the menu to close after clicking a link:
        const navUl = document.querySelector('nav ul');
        navUl.classList.remove('active');
    });
});





    // Education Roadmap Interaction
    const educationMap = document.getElementById('education-map');
    const milestones = document.querySelectorAll('.milestone');
    let isZoomed = false;
    let currentMilestone = null;

    milestones.forEach((milestone, index) => {
        // Position milestones along the road
        const position = (index + 0.7) / (milestones.length + 1);
        milestone.style.left = `${position * 100}%`;
        
        milestone.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (currentMilestone === this && isZoomed) {
                resetZoom();
            } else {
                zoomToMilestone(this);
            }
        });
    });

    function updateMilestonePositions() {
        const isMobile = window.innerWidth <= 480;

        milestones.forEach((milestone, index) => {
            if (isMobile) {
                // For mobile (≤480px)
                milestone.style.position = 'relative';
                milestone.style.left = 'auto';
                milestone.style.top = 'auto';
            } else {
                // For larger screens, use absolute positioning
                const gap = 20; // Percentage gap between milestones
                const totalWidth = 100 - (gap * (milestones.length - 1));
                const basePosition = (totalWidth / milestones.length) * index;
                milestone.style.position = 'absolute';
                milestone.style.left = `${basePosition + (gap * index)}%`;
                milestone.style.top = '50%';
                milestone.style.transform = 'translateY(-50%)'; // Center vertically
            }

            milestone.addEventListener('click', function(e) {
                e.stopPropagation();

                if (currentMilestone === this && isZoomed) {
                    resetZoom();
                } else {
                    zoomToMilestone(this);
                }
            });
        });
    }
    
    

    function zoomToMilestone(milestone) {
        isZoomed = true;
        currentMilestone = milestone;

        milestones.forEach(m => {
            m.style.transform = isMobile ? 'scale(0.6)' : 'scale(0.6) translateY(-50%)';
            m.style.opacity = '0.5';
        });

        milestone.style.transform = isMobile ? 'scale(1.2)' : 'scale(1.2) translateY(-50%)';
        milestone.style.opacity = '1';

        const data = milestone.querySelector('.milestone-data');
        data.style.opacity = '1';
        data.style.pointerEvents = 'auto';

        if (!isMobile) {
            const mapRect = educationMap.getBoundingClientRect();
            const milestoneRect = milestone.getBoundingClientRect();
            const scrollX = milestoneRect.left - mapRect.left - (mapRect.width / 2) + (milestoneRect.width / 2);

            educationMap.scrollTo({
                left: educationMap.scrollLeft + scrollX,
                behavior: 'smooth'
            });
        }
    }

    
    function resetZoom() {
        isZoomed = false;
        currentMilestone = null;
        
        milestones.forEach(milestone => {
            milestone.style.transform = isMobile?'scale(1)':'scale(1) translateY(-50%)';
            milestone.style.opacity = '1';
            const data = milestone.querySelector('.milestone-data');
            data.style.opacity = '0';
            data.style.pointerEvents = 'none';
        });
    }

    

    // Certificates Slider
    const certificatesSlider = document.querySelector('.certificates-slider');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');
    
    prevBtn.addEventListener('click', () => {
        certificatesSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        certificatesSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    let isScrolling = false;
    let startX;
    let scrollLeft;

    certificatesSlider.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - certificatesSlider.offsetLeft;
        scrollLeft = certificatesSlider.scrollLeft;
    });

    certificatesSlider.addEventListener('mouseleave', () => isScrolling = false);
    certificatesSlider.addEventListener('mouseup', () => isScrolling = false);
    certificatesSlider.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - certificatesSlider.offsetLeft;
        const walk = (x - startX) * 2;
        certificatesSlider.scrollLeft = scrollLeft - walk;
    });
        //Expand an shrink Certificate
        const certificates = document.querySelectorAll(".certificate-card img");
    
        certificates.forEach((img) => {
            img.addEventListener("click", function () {
                if (this.classList.contains("fullscreen")) {
                    this.classList.remove("fullscreen"); // Shrink back
                } else {
                    removeFullscreen(); // Ensure only one image expands at a time
                    this.classList.add("fullscreen"); // Expand
                }
            });
        });
    
        function removeFullscreen() {
            certificates.forEach((img) => img.classList.remove("fullscreen"));
        }
    


    // Contact Form Handling with Validation
        document.getElementById("contact-form").addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent default submission
        
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();
            let formResponse = document.getElementById("form-response");
            let currentDate = new Date().toLocaleDateString("en-US");
        
            // Clear previous error messages
            document.getElementById("name-error").textContent = "";
            document.getElementById("email-error").textContent = "";
            document.getElementById("message-error").textContent = "";
            formResponse.textContent = "";
        
            let valid = true;
        
            // Validation
            if (name === "") {
                document.getElementById("name-error").textContent = "Name is required.";
                valid = false;
            }
        
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === "") {
                document.getElementById("email-error").textContent = "Email is required.";
                valid = false;
            } else if (!emailPattern.test(email)) {
                document.getElementById("email-error").textContent = "Enter a valid email address.";
                valid = false;
            }
        
            if (message === "") {
                document.getElementById("message-error").textContent = "Message is required.";
                valid = false;
            }
        
            if (!valid) return; // Stop submission if validation fails
        
            // Format the custom message
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
        
            // Set custom message in hidden field
            document.getElementById("formatted-message").value = formattedMessage;
        
            // Prepare form data
            let formData = new FormData();
            formData.append("access_key", "cabee0a5-0e77-4b3e-9ad9-e72ebb6e13db");
            formData.append("subject", "📩 New Contact Form Submission");
            formData.append("message", formattedMessage);
        
            // Send form data using fetch API
            let response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
        
            let result = await response.json();
        
            // Display response message
            if (result.success) {
                formResponse.style.color = "green";
                formResponse.textContent = "✅ Thank you! Your message has been sent.";
                this.reset(); // Clear the form after submition
            } else {
                formResponse.style.color = "red";
                formResponse.textContent = "❌ Oops! Something went wrong. Please try again.";
            }
        });

    // Typing Animation for About Section
    const typewriterText = document.querySelector('.typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < text.length) {
            typewriterText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('#about'));

}); // This correctly closes the event listener

document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Show the button when scrolling down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Scroll to the top when clicking the button
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Add this to your index.js file

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Function to animate education timeline
    function animateEducation() {
        const educationSection = document.getElementById('education');
        const road = document.querySelector('.road');
        const milestones = document.querySelectorAll('.milestone');
        
        if (isInViewport(educationSection)) {
            // Animate the road first
            road.classList.add('animate');
            
            // Then animate each milestone with a slight delay
            setTimeout(() => {
                milestones.forEach(milestone => {
                    milestone.classList.add('animate');
                });
            }, 500); // 500ms delay after road animation starts
            
            // Remove scroll event listener once animation is triggered
            window.removeEventListener('scroll', animateEducation);
        }
    }

    // Initial check on page load
    animateEducation();
    
    // Listen for scroll events to trigger animation
    window.addEventListener('scroll', animateEducation);
});