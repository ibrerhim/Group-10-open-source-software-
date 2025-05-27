// Properties Page JavaScript - Enhanced Interactivity and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollAnimations();
    initializeHeaderEffects();
    initializePropertyFilters();
    initializePropertyCards();
    initializePagination();
    initializeScrollToTop();
    initializeParallaxEffect();
    loadProperties();
});

// Sample property data
const propertiesData = [
    {
        id: 1,
        title: "Luxury Villa in Beverly Hills",
        price: "$2,500,000",
        location: "Beverly Hills, CA",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 4500,
        type: "house",
        status: "for-sale",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
        ],
        description: "Stunning luxury villa with panoramic city views, modern amenities, and exquisite finishes throughout.",
        amenities: ["Swimming Pool", "Gym", "Garden", "Garage", "Security System", "Smart Home"]
    },
    {
        id: 2,
        title: "Modern Downtown Apartment",
        price: "$850,000",
        location: "Downtown LA, CA",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        type: "apartment",
        status: "for-sale",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
        ],
        description: "Contemporary apartment in the heart of downtown with city views and modern amenities.",
        amenities: ["Balcony", "Gym", "Concierge", "Parking", "Rooftop Deck"]
    },
    {
        id: 3,
        title: "Cozy Family Home",
        price: "$650,000",
        location: "Pasadena, CA",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: "house",
        status: "for-rent",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
        ],
        description: "Perfect family home with spacious rooms, beautiful garden, and quiet neighborhood.",
        amenities: ["Garden", "Garage", "Fireplace", "Patio"]
    }
];

let currentProperties = [...propertiesData];
let currentPage = 1;
const propertiesPerPage = 6;

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
                const children = entry.target.querySelectorAll('.property-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.property-filters, .property-listings, footer');
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

// Property Filters
function initializePropertyFilters() {
    const filterForm = document.querySelector('.filter-form');
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterForm && filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            applyFilters();
        });
        
        // Real-time filtering
        const selects = filterForm.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', applyFilters);
        });
    }
}

// Apply Filters
function applyFilters() {
    const typeFilter = document.querySelector('select[name="type"]')?.value || 'all';
    const statusFilter = document.querySelector('select[name="status"]')?.value || 'all';
    const priceFilter = document.querySelector('select[name="price"]')?.value || 'all';
    const bedroomsFilter = document.querySelector('select[name="bedrooms"]')?.value || 'all';
    
    currentProperties = propertiesData.filter(property => {
        let matches = true;
        
        if (typeFilter !== 'all' && property.type !== typeFilter) {
            matches = false;
        }
        
        if (statusFilter !== 'all' && property.status !== statusFilter) {
            matches = false;
        }
        
        if (bedroomsFilter !== 'all' && property.bedrooms < parseInt(bedroomsFilter)) {
            matches = false;
        }
        
        // Price filtering (simplified)
        if (priceFilter !== 'all') {
            const price = parseInt(property.price.replace(/[$,]/g, ''));
            switch (priceFilter) {
                case 'under-500k':
                    if (price >= 500000) matches = false;
                    break;
                case '500k-1m':
                    if (price < 500000 || price >= 1000000) matches = false;
                    break;
                case 'over-1m':
                    if (price < 1000000) matches = false;
                    break;
            }
        }
        
        return matches;
    });
    
    currentPage = 1;
    renderProperties();
    updatePagination();
    
    // Show filter animation
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        filterBtn.style.transform = 'scale(1)';
    }, 150);
}

// Load and Render Properties
function loadProperties() {
    renderProperties();
    updatePagination();
}

function renderProperties() {
    const propertiesContainer = document.querySelector('.properties');
    if (!propertiesContainer) return;
    
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const pageProperties = currentProperties.slice(startIndex, endIndex);
    
    propertiesContainer.innerHTML = '';
    
    if (pageProperties.length === 0) {
        propertiesContainer.innerHTML = `
            <div class="no-properties">
                <i class="fas fa-home"></i>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters to see more results.</p>
            </div>
        `;
        return;
    }
    
    pageProperties.forEach((property, index) => {
        const propertyCard = createPropertyCard(property);
        propertiesContainer.appendChild(propertyCard);
        
        // Animate card appearance
        setTimeout(() => {
            propertyCard.classList.add('animate');
        }, index * 100);
    });
}

// Create Property Card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}">
            <div class="tag">${property.status === 'for-sale' ? 'For Sale' : 'For Rent'}</div>
            <button class="favorite-btn" data-id="${property.id}">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="property-details">
            <h3>${property.title}</h3>
            <div class="price">${property.price}</div>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </div>
            <div class="features">
                <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sqft</span>
            </div>
            <div class="property-actions">
                <button class="btn view-details" data-id="${property.id}">View Details</button>
                <button class="btn btn-secondary contact-agent" data-id="${property.id}">Contact</button>
            </div>
        </div>
    `;
    
    return card;
}

// Property Cards Interactions
function initializePropertyCards() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn')) {
            const btn = e.target.closest('.favorite-btn');
            toggleFavorite(btn);
        }
        
        if (e.target.closest('.view-details')) {
            const btn = e.target.closest('.view-details');
            const propertyId = parseInt(btn.getAttribute('data-id'));
            showPropertyModal(propertyId);
        }
        
        if (e.target.closest('.contact-agent')) {
            const btn = e.target.closest('.contact-agent');
            const propertyId = parseInt(btn.getAttribute('data-id'));
            contactAgent(propertyId);
        }
        
        if (e.target.closest('.property-card') && !e.target.closest('button')) {
            const card = e.target.closest('.property-card');
            const propertyId = parseInt(card.querySelector('.view-details').getAttribute('data-id'));
            showPropertyModal(propertyId);
        }
    });
}

// Toggle Favorite
function toggleFavorite(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.classList.add('active');
        showNotification('Added to favorites!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.classList.remove('active');
        showNotification('Removed from favorites!', 'info');
    }
    
    // Add animation
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Show Property Modal
function showPropertyModal(propertyId) {
    const property = propertiesData.find(p => p.id === propertyId);
    if (!property) return;
    
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    modal.innerHTML = `
        <div class="property-modal-content">
            <div class="property-modal-header">
                <h2>${property.title}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="property-modal-body">
                <div class="property-gallery">
                    <img src="${property.gallery[0]}" alt="${property.title}" id="gallery-image">
                    ${property.gallery.length > 1 ? `
                        <button class="gallery-nav prev" onclick="changeGalleryImage(-1)">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-nav next" onclick="changeGalleryImage(1)">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="property-info">
                    <div class="price">${property.price}</div>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    
                    <div class="property-specs">
                        <div class="spec-item">
                            <i class="fas fa-bed"></i>
                            <div class="spec-value">${property.bedrooms}</div>
                            <div class="spec-label">Bedrooms</div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-bath"></i>
                            <div class="spec-value">${property.bathrooms}</div>
                            <div class="spec-label">Bathrooms</div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-ruler-combined"></i>
                            <div class="spec-value">${property.sqft}</div>
                            <div class="spec-label">Sq Ft</div>
                        </div>
                    </div>
                    
                    <div class="property-description">
                        <h3>Description</h3>
                        <p>${property.description}</p>
                    </div>
                    
                    <div class="property-amenities">
                        <h3>Amenities</h3>
                        <div class="amenities-grid">
                            ${property.amenities.map(amenity => `
                                <div class="amenity-item">
                                    <i class="fas fa-check"></i>
                                    ${amenity}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="contact-agent">
                        <div class="agent-info">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Agent">
                            <div class="agent-details">
                                <h4>John Smith</h4>
                                <p>Senior Real Estate Agent</p>
                            </div>
                        </div>
                        <div class="contact-buttons">
                            <button class="btn" onclick="contactAgent(${property.id})">
                                <i class="fas fa-phone"></i> Call
                            </button>
                            <button class="btn" onclick="emailAgent(${property.id})">
                                <i class="fas fa-envelope"></i> Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store gallery data for navigation
    modal.galleryImages = property.gallery;
    modal.currentImageIndex = 0;
    
    // Close functionality
    const closeModal = () => modal.remove();
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Gallery Navigation
let currentGalleryIndex = 0;
function changeGalleryImage(direction) {
    const modal = document.querySelector('.property-modal');
    if (!modal || !modal.galleryImages) return;
    
    currentGalleryIndex += direction;
    if (currentGalleryIndex < 0) {
        currentGalleryIndex = modal.galleryImages.length - 1;
    } else if (currentGalleryIndex >= modal.galleryImages.length) {
        currentGalleryIndex = 0;
    }
    
    const galleryImage = document.getElementById('gallery-image');
    galleryImage.style.opacity = '0';
    setTimeout(() => {
        galleryImage.src = modal.galleryImages[currentGalleryIndex];
        galleryImage.style.opacity = '1';
    }, 200);
}

// Contact Agent
function contactAgent(propertyId) {
    showNotification('Connecting you with our agent...', 'info');
    // In a real app, this would open a contact form or initiate a call
}

function emailAgent(propertyId) {
    const property = propertiesData.find(p => p.id === propertyId);
    const subject = `Inquiry about ${property.title}`;
    const body = `Hi, I'm interested in learning more about the property: ${property.title} (${property.price})`;
    window.location.href = `mailto:agent@prestigeestates.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Pagination
function initializePagination() {
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(currentProperties.length / propertiesPerPage);
    let paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        document.querySelector('.property-listings').appendChild(paginationContainer);
    }
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProperties();
            updatePagination();
            scrollToTop();
        }
    });
    paginationContainer.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderProperties();
            updatePagination();
            scrollToTop();
        });
        paginationContainer.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProperties();
            updatePagination();
            scrollToTop();
        }
    });
    paginationContainer.appendChild(nextBtn);
}

function scrollToTop() {
    document.querySelector('.property-listings').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
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

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
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
