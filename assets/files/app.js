document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const projectItems = document.querySelectorAll('.proj');

    if (!projectsContainer || !prevBtn || !nextBtn || projectItems.length === 0) {
        console.error("Missing elements for carousel functionality.");
        return;
    }

    const projectWidth = projectItems[0].offsetWidth;
    const projectGap = parseFloat(getComputedStyle(projectsContainer).gap);
    const scrollAmount = projectWidth + projectGap;

    // Function to update button visibility
    const updateButtonVisibility = () => {
        const currentScrollLeft = projectsContainer.scrollLeft;
        const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth;

        // Use a small threshold for comparison
        const threshold = 1;

        // Hide/show prev button
        prevBtn.style.display = currentScrollLeft <= threshold ? 'none' : 'block';

        // Hide/show next button
        nextBtn.style.display = currentScrollLeft >= maxScrollLeft - threshold ? 'none' : 'block';
    };

    const scrollTo = (direction) => {
        let newScrollLeft = projectsContainer.scrollLeft;

        if (direction === 'next') {
            newScrollLeft += scrollAmount;
            const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth;
            newScrollLeft = Math.min(newScrollLeft, maxScrollLeft);
        } else if (direction === 'prev') {
            newScrollLeft -= scrollAmount;
            newScrollLeft = Math.max(newScrollLeft, 0);
        }

        // Update button visibility immediately based on the target scroll position
        const tempScrollLeft = projectsContainer.scrollLeft;
        projectsContainer.scrollLeft = newScrollLeft;
        updateButtonVisibility();
        projectsContainer.scrollLeft = tempScrollLeft; // Restore original position

        gsap.to(projectsContainer, {
            scrollLeft: newScrollLeft,
            duration: 0.1,
            ease: "power2.out",
            onUpdate: updateButtonVisibility, // Update during animation
            onComplete: updateButtonVisibility // Final update after animation
        });
    };

    // Event listeners
    nextBtn.addEventListener('click', () => scrollTo('next'));
    prevBtn.addEventListener('click', () => scrollTo('prev'));

    // Listen for scroll events (in case of manual scrolling)
    projectsContainer.addEventListener('scroll', updateButtonVisibility);

    // Initial check when page loads
    updateButtonVisibility();
});