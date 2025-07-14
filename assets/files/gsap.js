var navBarTL = gsap.timeline()

navBarTL.from('.main-content', {
    opacity: 0,
    duration: 5,


})


var svgImgTL = gsap.timeline()
svgImgTL.fromTo(".svg-cont", 
    {
        y: -400,
        duration: .2,
        opacity: 0,
        scale: .6,
    },

    {
        scale: 1,
        delay: .5,
        duration: 1.5,
        opacity: 1,

    }


)
svgImgTL.to(".svg-cont", {
    y: -440,
    duration: 1.5,
    // delay: 3,
    ease: "power2.inOut",
})

svgImgTL.to(".svg-cont", {
    y: 0,
    duration: 1.3,
    // delay: 4,
    ease: CustomEase.create("custom", "M0,0 C0.164,-0.017 0.181,0 0.265,0.094 0.336,0.174 0.44,0.379 0.472,0.519 0.492,0.609 0.567,0.813 0.63,0.907 0.705,1.018 0.704,1 1,1 "),
    ease: "power3.inOut",


})



















































