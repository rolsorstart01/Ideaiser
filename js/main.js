import { initAuth } from './services/auth.js';
import { UIController } from './ui/ui.js';

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Auth first
    const authService = initAuth((state) => {
        // Update Plan UI based on state
        const proBtn = document.getElementById('proPlanBtn');
        const pricingGrid = document.querySelector('.pricing-grid');

        if (state.isPro) {
            if (proBtn) {
                proBtn.innerText = "Pro Member ✨";
                proBtn.disabled = true;
                proBtn.classList.add('pro-active');
            }
            if (pricingGrid) pricingGrid.style.opacity = "0.7";
        } else {
            if (proBtn) {
                proBtn.innerText = "Upgrade to Pro";
                proBtn.disabled = false;
                proBtn.classList.remove('pro-active');
            }
            if (pricingGrid) pricingGrid.style.opacity = "1";
        }

        // Update user stats in settings if open
        const usedCount = document.getElementById('analysisUsedCount');
        if (usedCount) usedCount.innerText = state.analysisCount;
    });

    // Initialize Interactions
    new UIController(authService);

    // Initialize Gradients
    const svg = document.querySelector('.score-ring');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#f093fb"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
    }

    // Razorpay Integration (Keep minimal here or move to services/payment.js if needed)
    window.initPayments(authService);
});

// Mocking initPayments globally for now to avoid breaking existing Razorpay calls
window.initPayments = function (authService) {
    const proBtn = document.getElementById('proPlanBtn');
    const RAZORPAY_KEY_ID = 'rzp_live_RuaMsQ3mGUXGtH';

    if (proBtn) {
        proBtn.addEventListener('click', () => {
            if (authService.isPro()) return;

            if (!authService.getCurrentUser()) {
                document.getElementById('authModal').classList.remove('hidden');
                alert("Please log in or sign up first to secure your Pro membership! 🚀");
                return;
            }

            const options = {
                "key": RAZORPAY_KEY_ID,
                "amount": "50000",
                "currency": "INR",
                "name": "Ideaiser Pro",
                "description": "3 Months Special Offer",
                "handler": async function (response) {
                    await authService.incrementAnalysis(); // Mocking upgrade here
                    // Ideally call a backend function or update specific field
                    alert("Welcome to Pro! (Mock Success) ✨");
                    localStorage.setItem('ideaiser_pro', 'true');
                    location.reload();
                },
                "theme": { "color": "#667eea" }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        });
    }
}
