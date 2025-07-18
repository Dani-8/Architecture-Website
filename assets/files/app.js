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











document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const projectItems = document.querySelectorAll('.proj');

    // Basic safety check for elements
    if (!projectsContainer || !prevBtn || !nextBtn || projectItems.length === 0) {
        console.error("Missing elements for carousel functionality. Please check HTML selectors.");
        return;
    }

    const projectWidth = projectItems[0].offsetWidth;
    // Ensure projectGap is a number, handling potential 'px' or 'rem' units
    const projectGapStyle = getComputedStyle(projectsContainer).gap;
    const projectGap = parseFloat(projectGapStyle) || 0; // Default to 0 if gap is not a number

    const scrollAmount = projectWidth + projectGap;

    // --- INITIAL SETUP: Ensure projects are hidden at start ---
    // This is crucial for the stagger animation to work correctly from hidden state.
    gsap.set(".proj", { opacity: 0, scale: 0 });

    // --- Function to animate projects into view with stagger ---
    const animateProjectsInView = () => {
        const containerRect = projectsContainer.getBoundingClientRect();
        const itemsToAnimate = [];

        projectItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            // Check if the project is within the visible bounds of the container
            // We give a small buffer for "visibility" to ensure timely animation.
            const buffer = 10; // Pixels buffer
            const isVisible = itemRect.right >= containerRect.left + buffer && itemRect.left <= containerRect.right - buffer;

            // If an item is visible AND its opacity is still 0 (meaning it hasn't animated in yet)
            if (isVisible && gsap.getProperty(item, "opacity") < 1) { // Changed to < 1 for robustness
                itemsToAnimate.push(item);
            }
        });

        // Only run the animation if there are new items to animate
        if (itemsToAnimate.length > 0) {
            gsap.to(itemsToAnimate, {
                opacity: 1,
                scale: 1,
                duration: 0.8,         // Duration for each item's animation
                ease: "back.out(1.7)",
                stagger: 0.3           // Stagger delay between animating items in the collected group
            });
        }
    };

    // --- Function to update button visibility (for prev/next buttons) ---
    const updateButtonVisibility = () => {
        const currentScrollLeft = projectsContainer.scrollLeft;
        const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth;

        const threshold = 1; // Small threshold for float comparisons

        prevBtn.style.display = currentScrollLeft <= threshold ? 'none' : 'block';
        nextBtn.style.display = currentScrollLeft >= maxScrollLeft - threshold ? 'none' : 'block';
    };

    // --- Function to handle scrolling the container ---
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
            duration: 0.1, // Increased duration for smoother scroll and better stagger visibility
            ease: "power3.out",
            onUpdate: () => {
                updateButtonVisibility();
                animateProjectsInView(); // Animate projects during scroll
            },
            onComplete: () => {
                updateButtonVisibility();
                animateProjectsInView(); // Final check and animate after scroll ends
            }
        });
    };

    // --- Event Listeners ---
    nextBtn.addEventListener('click', () => scrollTo('next'));
    prevBtn.addEventListener('click', () => scrollTo('prev'));

    // Listen for manual scroll events on the container
    projectsContainer.addEventListener('scroll', () => {
        updateButtonVisibility();
        animateProjectsInView();
    });

    // --- Initial calls on page load ---
    updateButtonVisibility();    // Set initial button visibility
    animateProjectsInView();     // Animate projects already visible on page load

});