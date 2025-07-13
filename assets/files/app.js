document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const projectItems = document.querySelectorAll('.proj');

    if (!projectsContainer || !prevBtn || !nextBtn || projectItems.length === 0) {
        console.error("Missing elements for carousel functionality.");
        return;
    }

    // Determine how much to scroll: width of one project + its gap
    const projectWidth = projectItems[0].offsetWidth;
    const projectGap = parseFloat(getComputedStyle(projectsContainer).gap); // Get gap from CSS

    // Calculate scroll amount per click
    const scrollAmount = projectWidth + projectGap;

    // Function to handle scrolling with GSAP
    const scrollTo = (direction) => {
        let newScrollLeft = projectsContainer.scrollLeft;

        if (direction === 'next') {
            newScrollLeft += scrollAmount;
            // Prevent scrolling past the end (adjust if you want partial views at end)
            const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth;
            newScrollLeft = Math.min(newScrollLeft, maxScrollLeft);
        } else if (direction === 'prev') {
            newScrollLeft -= scrollAmount;
            // Prevent scrolling before the beginning
            newScrollLeft = Math.max(newScrollLeft, 0);
        }

        gsap.to(projectsContainer, {
            scrollLeft: newScrollLeft,
            duration: .1, // Animation duration in seconds
            ease: "power2.out" // Easing for smoother animation
        });
    };

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => scrollTo('next'));
    prevBtn.addEventListener('click', () => scrollTo('prev'));

    // Optional: Make sure the container is at the start initially
    projectsContainer.scrollLeft = 0;
});











































