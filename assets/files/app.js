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

        // Use a small threshold (e.g., 5 pixels) for comparison
        const threshold = 5;

        // Hide/show prev button
        if (currentScrollLeft <= threshold) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Hide/show next button
        // Check if we are very close to the maximum scrollable position
        if (currentScrollLeft >= maxScrollLeft - threshold) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
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

        gsap.to(projectsContainer, {
            scrollLeft: newScrollLeft,
            duration: 0.6,
            ease: "power2.out",
            onComplete: updateButtonVisibility // Update buttons after animation finishes
        });
    };

    // Event listeners
    nextBtn.addEventListener('click', () => scrollTo('next'));
    prevBtn.addEventListener('click', () => scrollTo('prev'));

    // Initial check when page loads
    updateButtonVisibility();
});