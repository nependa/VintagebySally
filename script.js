let cart = [];
let total = 0;
let slideIndex = 0; // Track carousel position globally

const productDiv = document.getElementById('productModal');

// Open Expanded View Modal
function openProduct(name, price, desc, images) {
    // These remain exactly as you had them
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalDescription').innerText = desc;
    
    const track = document.querySelector('.carousel-track');
    
    // 1. Clear the old images from the carousel
    track.innerHTML = '';
    
    // 2. Inject the new images passed from the function
    images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${src}" alt="${name}">`;
        track.appendChild(slide);
    });

    productDiv.style.display = "block";

    // Reset carousel to the first image
    slideIndex = 0;
    updateCarouselPosition();

    document.getElementById('addBtn').onclick = function() {
        addToCart(name, price);
        closeProduct();
    };
}

// Fixed Carousel Movement Logic
function updateCarouselPosition() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let slideWidth = slides[0].offsetWidth;
        track.style.transform = 'translateX(-' + (slideWidth * slideIndex) + 'px)';
    }
}

// Setup listeners once when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');

    if (nextButton && prevButton) {
        nextButton.onclick = function() {
            const slides = document.querySelectorAll('.carousel-slide');
            slideIndex = (slideIndex + 1) % slides.length;
            updateCarouselPosition();
        };

        prevButton.onclick = function() {
            const slides = document.querySelectorAll('.carousel-slide');
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            updateCarouselPosition();
        };
    }
});

// Rest of your functions (closeProduct, toggleCart, addToCart, etc.) remain unchanged
function closeProduct() {
    productDiv.style.display = "none";
}

// Sidebar Cart Controls
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

function addToCart(name, price) {
    cart.push({name, price});
    updateCartUI();
    toggleCart(); // Automatically show cart when item is added
}

function updateCartUI() {
    const list = document.getElementById('cartItems');
    list.innerHTML = "";
    total = 0;
    
    cart.forEach((item) => {
        total += item.price;
        list.innerHTML += `<p style="margin-bottom:10px; border-bottom:1px solid #eee;">${item.name} - $${item.price}</p>`;
    });
    
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cartTotal').innerText = total;
}

// Payment Redirect
function goToPayment() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to Stripe Secure Payment for $" + total + ".00...");
        // This is where you would call the Stripe checkout session
    }
}