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
    const projectGap = parseFloat(getComputedStyle(projectsContainer).gap) || 0;
    const scrollAmount = projectWidth + projectGap;




    // --- Initial Setup: Ensure projects are hidden at start ---
    // This is crucial for the stagger animation to work correctly.
    gsap.set(".proj", { opacity: 0, scale: 0 });

    // --- Function to animate projects into view with stagger ---
    // This function will be called on initial load, manual scroll, and button clicks.
    const animateProjectsInView = () => {
        const containerRect = projectsContainer.getBoundingClientRect();
        const itemsToAnimate = [];

        projectItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            // Check if the project is within the visible bounds of the container
            const buffer = 10; // Pixels buffer for visibility check
            const isVisible = itemRect.right >= containerRect.left + buffer && itemRect.left <= containerRect.right - buffer;

            // If an item is visible AND its opacity is still 0 (meaning it hasn't animated in yet)
            if (isVisible && gsap.getProperty(item, "opacity") < 1) {
                itemsToAnimate.push(item);
            }
        });

        // Only run the animation if there are new items to animate
        if (itemsToAnimate.length > 0) {
            gsap.to(itemsToAnimate, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.5)",
                stagger: 0.3 // Stagger delay between animating items in the collected group
            });
        }
    };

    // --- ScrollTrigger for initial appearance when .projects comes into view ---
    ScrollTrigger.create({
        trigger: ".projects",
        start: "top 70%", // Animation starts when top of .projects is 80% down from viewport top
        onEnter: () => animateProjectsInView(), // Call the function when trigger hits
        // Uncomment the line below for debugging markers
        // markers: true,
        once: true // Ensures the animation only plays once on initial scroll-in
    });





    // --- Function to update button visibility (for prev/next buttons) ---
    const updateButtonVisibility = () => {
        const currentScrollLeft = projectsContainer.scrollLeft;
        const maxScrollLeft = projectsContainer.scrollWidth - projectsContainer.clientWidth;

        const threshold = 1; // Small threshold for float comparisons

        prevBtn.style.display = currentScrollLeft <= threshold ? 'none' : 'block';
        nextBtn.style.display = currentScrollLeft >= maxScrollLeft - threshold ? 'none' : 'block';
    };

    // --- Function to handle scrolling the container via buttons ---
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
            duration: 0.0001, // Increased duration for smoother scroll and better stagger visibility
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

    // Listen for manual scroll events on the container (e.g., mouse wheel, drag)
    projectsContainer.addEventListener('scroll', () => {
        updateButtonVisibility();
        animateProjectsInView();
    });

    // --- Initial calls on page load ---
    updateButtonVisibility();    // Set initial button visibility
    // animateProjectsInView(); // NOT NEEDED HERE. ScrollTrigger's onEnter will handle the first animation.
});