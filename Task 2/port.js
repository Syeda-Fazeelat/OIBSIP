        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real scenario, you would send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Add animation on scroll for various elements
        const animateOnScroll = () => {
            // Animate skill bars
            document.querySelectorAll('.skill-card').forEach(card => {
                const skillLevel = card.getAttribute('data-skill');
                const progressBar = card.querySelector('.progress-bar');
                const rect = card.getBoundingClientRect();
                
                if (rect.top < window.innerHeight * 0.8 && !progressBar.classList.contains('animated')) {
                    progressBar.style.width = skillLevel + '%';
                    progressBar.classList.add('animated');
                }
            });
            
            // Animate timeline items
            document.querySelectorAll('.timeline-item').forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    item.classList.add('visible');
                }
            });
            
            // Animate project cards
            document.querySelectorAll('.project-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }
            });
        };
        
        // Initialize project cards with animation properties
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "all 0.6s ease";
        });
        
        // Listen for scroll events
        window.addEventListener('scroll', animateOnScroll);
        
        // Trigger animation on load
        window.addEventListener('load', animateOnScroll);
        
        // Update active navigation link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
        });
    