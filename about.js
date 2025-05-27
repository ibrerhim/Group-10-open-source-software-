// About Page JavaScript - Enhanced Interactivity and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollAnimations();
    initializeHeaderEffects();
    initializeTeamInteractions();
    initializeTestimonialSlider();
    initializeScrollToTop();
    initializeCounterAnimations();
    initializeTimelineAnimation();
    initializeParallaxEffect();
});

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate children with staggered delay
                const children = entry.target.querySelectorAll('.team-member, .value-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.about-story, .team, .values, .testimonials, footer');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Header Effects
function initializeHeaderEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Team Member Interactions
function initializeTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add click event for team member details
        member.addEventListener('click', () => {
            const name = member.querySelector('h3').textContent;
            const position = member.querySelector('.position').textContent;
            const description = member.querySelector('p').textContent;
            const image = member.querySelector('img').src;
            
            showTeamMemberModal(name, position, description, image);
        });
        
        // Add hover effect for social links
        const socialLinks = member.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add ripple effect
                createRippleEffect(link, e);
            });
        });
    });
}

// Team Member Modal
function showTeamMemberModal(name, position, description, image) {
    const modal = document.createElement('div');
    modal.className = 'team-modal';
    modal.innerHTML = `
        <div class="team-modal-content">
            <div class="team-modal-header">
                <button class="close-modal">&times;</button>
            </div>
            <div class="team-modal-body">
                <div class="team-modal-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="team-modal-info">
                    <h2>${name}</h2>
                    <p class="position">${position}</p>
                    <p class="description">${description}</p>
                    <div class="team-stats">
                        <div class="stat">
                            <span class="stat-number" data-target="150">0</span>
                            <span class="stat-label">Projects Completed</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number" data-target="8">0</span>
                            <span class="stat-label">Years Experience</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number" data-target="95">0</span>
                            <span class="stat-label">Client Satisfaction %</span>
                        </div>
                    </div>
                    <button class="btn contact-member">Contact ${name.split(' ')[0]}</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .team-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease forwards;
        }
        .team-modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            animation: scaleIn 0.3s ease forwards;
        }
        .team-modal-header {
            padding: 15px 20px;
            text-align: right;
            border-bottom: 1px solid #eee;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            transition: color 0.3s;
        }
        .close-modal:hover {
            color: #333;
        }
        .team-modal-body {
            padding: 30px;
        }
        .team-modal-image {
            text-align: center;
            margin-bottom: 20px;
        }
        .team-modal-image img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #3498db;
        }
        .team-modal-info h2 {
            text-align: center;
            margin-bottom: 10px;
            color: #2c3e50;
        }
        .team-modal-info .position {
            text-align: center;
            color: #3498db;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .team-modal-info .description {
            text-align: center;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .team-stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
        }
        .stat-label {
            font-size: 12px;
            color: #7f8c8d;
        }
        .contact-member {
            width: 100%;
            margin-top: 20px;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Animate stats
    setTimeout(() => {
        animateStats(modal);
    }, 500);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    modal.querySelector('.contact-member').addEventListener('click', () => {
        showNotification(`Contact form for ${name} would open here!`);
        closeModal();
    });
}

// Animate Statistics
function animateStats(modal) {
    const statNumbers = modal.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 30);
    });
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const testimonialSection = document.querySelector('.testimonials');
    if (!testimonialSection) return;
    
    // Create multiple testimonials
    const testimonials = [
        {
            text: "Prestige Estates helped us find our dream home. Their attention to detail and customer service is unmatched.",
            author: "Sarah Johnson",
            position: "Happy Homeowner",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
        },
        {
            text: "Professional, reliable, and truly caring about their clients. I couldn't have asked for a better experience.",
            author: "Michael Chen",
            position: "Property Investor",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
        },
        {
            text: "The team at Prestige Estates made selling our home stress-free and profitable. Highly recommended!",
            author: "Emily Rodriguez",
            position: "Former Client",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
        }
    ];
    
    let currentTestimonial = 0;
    
    // Create slider controls
    const sliderControls = document.createElement('div');
    sliderControls.className = 'testimonial-controls';
    sliderControls.innerHTML = `
        <button class="prev-testimonial"><i class="fas fa-chevron-left"></i></button>
        <div class="testimonial-dots">
            ${testimonials.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('')}
        </div>
        <button class="next-testimonial"><i class="fas fa-chevron-right"></i></button>
    `;
    
    testimonialSection.appendChild(sliderControls);
    
    // Update testimonial content
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        const testimonialElement = document.querySelector('.testimonial');
        
        testimonialElement.style.opacity = '0';
        setTimeout(() => {
            testimonialElement.querySelector('.quote p').textContent = testimonial.text;
            testimonialElement.querySelector('.client img').src = testimonial.image;
            testimonialElement.querySelector('.client-info h4').textContent = testimonial.author;
            testimonialElement.querySelector('.client-info p').textContent = testimonial.position;
            testimonialElement.style.opacity = '1';
        }, 300);
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Event listeners
    document.querySelector('.prev-testimonial').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
    
    document.querySelector('.next-testimonial').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    });
    
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentTestimonial = parseInt(dot.getAttribute('data-index'));
            updateTestimonial(currentTestimonial);
        });
    });
    
    // Auto-slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 5000);
}

// Counter Animations
function initializeCounterAnimations() {
    // Add stats section if it doesn't exist
    const aboutStory = document.querySelector('.about-story');
    if (aboutStory) {
        const statsSection = document.createElement('div');
        statsSection.className = 'company-stats';
        statsSection.innerHTML = `
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <i class="fas fa-home"></i>
                        <span class="counter" data-target="500">0</span>
                        <p>Properties Sold</p>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span class="counter" data-target="1200">0</span>
                        <p>Happy Clients</p>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-award"></i>
                        <span class="counter" data-target="15">0</span>
                        <p>Years Experience</p>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-star"></i>
                        <span class="counter" data-target="98">0</span>
                        <p>Satisfaction Rate %</p>
                    </div>
                </div>
            </div>
        `;
        
        aboutStory.parentNode.insertBefore(statsSection, aboutStory.nextSibling);
        
        // Animate counters when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
}

// Animate Counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    });
}

// Timeline Animation
function initializeTimelineAnimation() {
    // Add company timeline if it doesn't exist
    const valuesSection = document.querySelector('.values');
    if (valuesSection) {
        const timelineSection = document.createElement('section');
        timelineSection.className = 'company-timeline';
        timelineSection.innerHTML = `
            <div class="container">
                <h2>Our Journey</h2>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-year">2008</div>
                        <div class="timeline-content">
                            <h3>Company Founded</h3>
                            <p>Started with a vision to revolutionize real estate</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2012</div>
                        <div class="timeline-content">
                            <h3>First 100 Sales</h3>
                            <p>Reached our first major milestone</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2018</div>
                        <div class="timeline-content">
                            <h3>Digital Expansion</h3>
                            <p>Launched our online platform</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2023</div>
                        <div class="timeline-content">
                            <h3>Industry Leader</h3>
                            <p>Recognized as top real estate agency</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        valuesSection.parentNode.insertBefore(timelineSection, valuesSection.nextSibling);
    }
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax Effect
function initializeParallaxEffect() {
    const banner = document.querySelector('.page-banner');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (banner) {
            banner.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Ripple Effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
