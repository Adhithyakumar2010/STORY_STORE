/**
 * AK STORY STORE - MAIN JAVASCRIPT FILE (script.js)
 * Clean, modern vanilla JavaScript for interactive UI elements
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 AK Story Store Frontend initialized successfully.");

    // Initialize Mobile Navigation Toggle
    initMobileNav();

    // Initialize Scroll-to-Top Button
    initScrollToTop();

    // Initialize Smooth Scrolling for Anchor Links
    initSmoothScroll();
});

/**
 * Mobile Navigation Menu Toggle Handler
 */
function initMobileNav() {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    // Open Mobile Menu
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.add("show-menu");
        });
    }

    // Close Mobile Menu
    if (navClose && navMenu) {
        navClose.addEventListener("click", function () {
            navMenu.classList.remove("show-menu");
        });
    }

    // Close menu when clicking on any nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu) {
                navMenu.classList.remove("show-menu");
            }
        });
    });
}

/**
 * Scroll to Top Button Visibility & Event Handler
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    // Show/Hide button on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 400) {
            scrollTopBtn.classList.add("show-scroll");
        } else {
            scrollTopBtn.classList.remove("show-scroll");
        }
    });

    // Smooth scroll to top on click
    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

/* ==========================================================================
   PLACEHOLDER FUNCTIONS FOR FUTURE FRONTEND EXPANSION
   ========================================================================== */

/**
 * Placeholder: Client-side Add to Cart Handler
 * @param {string} bookId 
 * @param {number} quantity 
 */
function addToCart(bookId, quantity = 1) {
    console.log(`[Placeholder] Adding Book ${bookId} (Qty: ${quantity}) to cart...`);
}

/**
 * Placeholder: Client-side Wishlist Toggle
 * @param {string} bookId 
 */
function toggleWishlist(bookId) {
    console.log(`[Placeholder] Toggling Wishlist for Book ${bookId}...`);
}

/**
 * Placeholder: Client-side Book Category Filter
 * @param {string} categoryId 
 */
function filterBooks(categoryId) {
    console.log(`[Placeholder] Filtering books by category: ${categoryId}...`);
}

/**
 * Helper: Format Number into Indian Rupee (INR) Currency String
 * @param {number} amount 
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}
