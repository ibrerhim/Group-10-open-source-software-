// Services Page JavaScript - Enhanced Interactivity and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollAnimations();
    initializeHeaderEffects();
    initializeServiceInteractions();
    initializeScrollToTop();
    initializeParallaxEffect();
    addServiceData();
});

// Service data
const servicesData = [
    {
        id: 'property-buying',
        title: 'Property Buying',
        icon: 'fas fa-home',
        description: 'Expert guidance through every step of the property buying process.',
        features: [
            'Market Analysis',
            'Property Search',
            'Negotiation Support',
            'Legal Assistance',
            'Financing Help'
        ],
        pricing: [
            { service: 'Consultation', price: 'Free' },
            { service: 'Property Search', price: '$500' },
            { service: 'Full Service', price: '2.5% of property value' }
        ]
    },
    {
        id: 'property-selling',
        title: 'Property Selling',
        icon: 'fas fa-dollar-sign',
        description: 'Maximize your property value with our comprehensive selling services.',
        features: [
            'Property Valuation',
            'Marketing Strategy',
            'Professional Photography',
            'Buyer Screening',
            'Closing Support'
        ],
        pricing: [
            { service: 'Market Evaluation', price: 'Free' },
            { service: 'Basic Marketing', price: '$1,000' },
            { service: 'Premium Package', price: '3% of sale price' }
        ]
    },
    {
        id: 'property-management',
        title: 'Property Management',
        icon: 'fas fa-building',
        description: 'Complete property management solutions for landlords and investors.',
        features: [
            'Tenant Screening',
            'Rent Collection',
            'Maintenance Coordination',
            'Financial Reporting',
            '24/7 Support'
        ],
        pricing: [
            { service: 'Basic Management', price: '8% of monthly rent' },
            { service: 'Full Service', price: '12% of monthly rent' },
            { service: 'Premium Package', price: '15% of monthly rent' }
        ]
    },
    {
        id: 'investment-consulting',
        title: 'Investment Consulting',
        icon: 'fas fa-chart-line',
        description: 'Strategic real estate investment advice to grow your portfolio.',
        features: [
            'Market Research',
            'ROI Analysis',
            'Portfolio Planning',
            'Risk Assessment',
            'Exit Strategies'
        ],
        pricing: [
            { service: 'Initial Consultation', price: '$200/hour' },
            { service: 'Market Report', price: '$500' },
            { service: 'Full Analysis', price: '$2,000' }
        ]
    }
];

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
                
                // Animate service items with staggered delay
                const serviceItems = entry.target.querySelectorAll('.service-item');
                serviceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.services-full, footer');
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
}

// Add Service Data to Page
function addServiceData() {
    const servicesContainer = document.querySelector('.services-full .container');
    if (!servicesContainer) return;
    
    // Clear existing content except title
    const title = servicesContainer.querySelector('h2');
    servicesContainer.innerHTML = '';
    if (title) {
        servicesContainer.appendChild(title);
    }
    
    // Add service items
    servicesData.forEach((service, index) => {
        const serviceItem = createServiceItem(service, index);
        servicesContainer.appendChild(serviceItem);
    });
}

// Create Service Item
function createServiceItem(service, index) {
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.id = service.id;
    
    serviceItem.innerHTML = `
        <div class="service-icon">
            <i class="${service.icon}"></i>
        </div>
        <div class="service-content">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="service-actions">
                <button class="btn learn-more" data-service="${service.id}">Learn More</button>
                <button class="btn btn-outline get-quote" data-service="${service.id}">Get Quote</button>
            </div>
        </div>
    `;
    
    return serviceItem;
}

// Service Interactions
function initializeServiceInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.learn-more')) {
            const btn = e.target.closest('.learn-more');
            const serviceId = btn.getAttribute('data-service');
            showServiceModal(serviceId);
        }
        
        if (e.target.closest('.get-quote')) {
            const btn = e.target.closest('.get-quote');
            const serviceId = btn.getAttribute('data-service');
            showQuoteForm(serviceId);
        }
        
        if (e.target.closest('.service-icon')) {
            const serviceItem = e.target.closest('.service-item');
            const serviceId = serviceItem.id;
            showServiceModal(serviceId);
        }
    });
    
    // Add hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.service-item')) {
            const serviceItem = e.target.closest('.service-item');
            addHoverEffect(serviceItem);
        }
    });
}

// Add Hover Effect
function addHoverEffect(serviceItem) {
    const icon = serviceItem.querySelector('.service-icon i');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
}

// Show Service Modal
function showServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <div class="service-modal-header">
                <h2><i class="${service.icon}"></i> ${service.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="service-modal-body">
                <p>${service.description}</p>
                
                <div class="service-features">
                    <h3>What's Included</h3>
                    <div class="feature-grid">
                        ${service.features.map(feature => `
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <h4>${feature}</h4>
                                <p>Professional ${feature.toLowerCase()} services tailored to your needs.</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="pricing-info">
                    <h4>Pricing Information</h4>
                    ${service.pricing.map(item => `
                        <div class="price-item">
                            <span>${item.service}</span>
                            <span class="price-value">${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="service-actions">
                    <button class="btn get-quote" data-service="${service.id}">Get Free Quote</button>
                    <button class="btn btn-outline contact-us">Contact Us</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close functionality
    const closeModal = () => modal.remove();
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Button functionality
    modal.querySelector('.get-quote').addEventListener('click', () => {
        closeModal();
        showQuoteForm(serviceId);
    });
    
    modal.querySelector('.contact-us').addEventListener('click', () => {
        closeModal();
        window.location.href = 'contact.html';
    });
}

// Show Quote Form
function showQuoteForm(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="service-modal-content">
            <div class="service-modal-header">
                <h2>Get Quote - ${service.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="service-modal-body">
                <form class="quote-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone">
                        </div>
                        <div class="form-group">
                            <label for="timeline">Timeline</label>
                            <select id="timeline" name="timeline">
                                <option value="">Select timeline</option>
                                <option value="asap">ASAP</option>
                                <option value="1-month">Within 1 month</option>
                                <option value="3-months">Within 3 months</option>
                                <option value="6-months">Within 6 months</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="details">Project Details</label>
                        <textarea id="details" name="details" rows="4" placeholder="Please describe your requirements..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="budget">Budget Range</label>
                        <select id="budget" name="budget">
                            <option value="">Select budget range</option>
                            <option value="under-1k">Under $1,000</option>
                            <option value="1k-5k">$1,000 - $5,000</option>
                            <option value="5k-10k">$5,000 - $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-plus">$25,000+</option>
                        </select>
                    </div>
                    <button type="submit" class="btn submit-quote">Submit Quote Request</button>
                </form>
            </div>
        </div>
    `;
    
    // Add form styles
    const style = document.createElement('style');
    style.textContent = `
        .quote-form {
            max-width: 100%;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #2c3e50;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #3498db;
        }
        .submit-quote {
            width: 100%;
            padding: 15px;
            font-size: 16px;
            margin-top: 20px;
        }
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
                gap: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close functionality
    const closeModal = () => {
        modal.remove();
        style.remove();
    };
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Form submission
    modal.querySelector('.quote-form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitQuoteForm(modal, service);
    });
}

// Submit Quote Form
function submitQuoteForm(modal, service) {
    const form = modal.querySelector('.quote-form');
    const submitBtn = form.querySelector('.submit-quote');
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        modal.remove();
        showSuccessMessage(service.title);
    }, 2000);
}

// Success Message
function showSuccessMessage(serviceTitle) {
    const successModal = document.createElement('div');
    successModal.className = 'service-modal';
    successModal.innerHTML = `
        <div class="service-modal-content">
            <div class="service-modal-body" style="text-align: center; padding: 40px;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: #27ae60; margin-bottom: 20px;"></i>
                <h3>Quote Request Submitted!</h3>
                <p>Thank you for your interest in our ${serviceTitle} service.</p>
                <p>We'll review your requirements and get back to you within 24 hours with a detailed quote.</p>
                <button class="btn" onclick="this.closest('.service-modal').remove()" style="margin-top: 20px;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successModal.parentElement) {
            successModal.remove();
        }
    }, 5000);
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

// Smooth scroll to service sections
function scrollToService(serviceId) {
    const serviceElement = document.getElementById(serviceId);
    if (serviceElement) {
        serviceElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Highlight the service temporarily
        serviceElement.style.background = 'rgba(52, 152, 219, 0.1)';
        setTimeout(() => {
            serviceElement.style.background = '';
        }, 2000);
    }
}

// Export function for external use
window.scrollToService = scrollToService;
