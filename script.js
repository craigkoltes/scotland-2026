// Basic JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Add a simple click event to demonstrate functionality
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('click', function() {
            this.style.backgroundColor = '#f0f0f0';
            setTimeout(() => {
                this.style.backgroundColor = 'white';
            }, 200);
        });
    });
    
    // Add current year to footer
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
});
