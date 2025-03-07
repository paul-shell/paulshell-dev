// Add tilt effect to recommendation cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the card
        const y = e.clientY - rect.top; // y position within the card
        
        // Calculate rotation based on mouse position
        // The further from center, the more tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 15; // Max 10-15 degrees rotation
        const rotateY = (x - centerX) / 15;
        
        // Apply the transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function handleMouseEnter(e) {
        const card = e.currentTarget;
        card.classList.add('tilt');
        
        // Clear any existing transform to avoid jumps
        setTimeout(() => {
            card.style.transition = 'transform 0.1s ease-out';
        }, 100);
    }
    
    function handleMouseLeave(e) {
        const card = e.currentTarget;
        card.classList.remove('tilt');
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    }
}); 