// Configuration
const START_DATE = new Date('2023-01-18T00:00:00');

// DOM Elements
const elements = {
    totalDays: document.getElementById('totalDays'),
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days')
};

// Calculate date difference
function calculateDateDifference() {
    const now = new Date();
    const diffTime = now - START_DATE;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days
    let years = now.getFullYear() - START_DATE.getFullYear();
    let months = now.getMonth() - START_DATE.getMonth();
    let days = now.getDate() - START_DATE.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    return { totalDays, years, months, days };
}

// Format number with leading zero
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Animate value change
function animateValue(element, newValue, isTotal = false) {
    const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;

    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';

        if (isTotal) {
            element.textContent = newValue.toLocaleString('en-US');
        } else {
            element.textContent = formatNumber(newValue);
        }

        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update counter
function updateCounter() {
    const { totalDays, years, months, days } = calculateDateDifference();

    animateValue(elements.totalDays, totalDays, true);
    animateValue(elements.years, years);
    animateValue(elements.months, months);
    animateValue(elements.days, days);
}

// Initialize
function init() {
    updateCounter();
    setInterval(updateCounter, 60000); // Update every minute

    // Update immediately when tab becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateCounter();
        }
    });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
