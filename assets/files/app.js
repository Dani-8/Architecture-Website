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
        // Hide/show prev button
        if (projectsContainer.scrollLeft <= 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Hide/show next button
        // projectsContainer.scrollWidth is total scrollable width
        // projectsContainer.clientWidth is the visible width
        // If (scrollLeft + visibleWidth) is approximately totalWidth, then we're at the end
        const atEnd = Math.abs(projectsContainer.scrollLeft + projectsContainer.clientWidth - projectsContainer.scrollWidth) < 1; // Use a small threshold for floating point
        if (atEnd) {
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
            duration: 0.1,
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