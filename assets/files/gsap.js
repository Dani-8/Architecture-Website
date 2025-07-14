gsap.from('.main-content', {
    opacity: 0,
    duration: 50,


})

gsap.fromTo(".svg-cont", 
    {
        y: -400,
        duration: 1.5,
        opacity: 0,
        scale: .2,
    },

    {
        scale: 1,
        delay: 1.5,
        duration: 1.5,
        opacity: 1,

    }


)
gsap.to(".svg-cont", {
    y: -440,
    duration: 1.5,
    delay: 3,
    ease: "power2.inOut",
})

gsap.to(".svg-cont", {
    y: 0,
    duration: 1.5,
    delay: 4,
    ease: "power3.inOut",
})



















































