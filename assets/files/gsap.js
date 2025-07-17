var navbarTL = gsap.timeline()

// Navbar
// Navbar
// Navbar
// Navbar


navbarTL.fromTo(".logo img", 
    {
        opacity:  0,
        // scale: 0,
        x: -150,
    },
    {
        delay: 2.7,
        // scale: 1,
        x: 0,
        opacity: 1,
        duration: .5,
        // ease: "power4.inOut",

    }
)

navbarTL.fromTo(".nav-links ul li",
    {
        y: 40,
        opacity:  0,
        
    },
    {
        y: 0,
        opacity:  1,
        duration: .5,
        stagger: .2, 
        ease: "power1.inOut"

    }, "-=.5"
)









var mainContentText = gsap.timeline()


// HEROSECTION-HEADING
// HEROSECTION-HEADING
// HEROSECTION-HEADING
// HEROSECTION-HEADING
// HEROSECTION-HEADING



mainContentText.fromTo(".headingLineUp", 
    {
        y: -180,
        opacity: 0.5
    },
    {
        y: 0,
        duration: 1,
        opacity: 1,
            
})
mainContentText.fromTo(".headingLineDown", 
    {
        y: 180,
        opacity: 0.5,
    },
    {
        y: 0,
        duration: 1,
        opacity: 1,
        

}, "<")
mainContentText.fromTo(".headingCenterLine", 
    {
        scale: 1.5,
        opacity: 0,
    
    },
    {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "back.out(3)"
}, ".5")




// HEROSECTION-PARA
// HEROSECTION-PARA
// HEROSECTION-PARA
// HEROSECTION-PARA
// HEROSECTION-PARA


// STEP 1: wrap lines
const heroSectionPara = document.querySelector(".para p");
const heroSectionParaLines = heroSectionPara.innerHTML.split("<br>");
heroSectionPara.innerHTML = heroSectionParaLines
  .map(line => `<span class="paraLine">${line}</span>`)
  .join("<br>");

// STEP 2: set initial state
gsap.set(heroSectionPara, { opacity: 1, })

// STEP 3: animate
mainContentText.fromTo(".paraLine",
  {
    y: 100,
    opacity: 0
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1.2,
    ease: "back.out(2.5)"
  }
);








// HEROSECTION-STAR
// HEROSECTION-STAR
// HEROSECTION-STAR
// HEROSECTION-STAR
// HEROSECTION-STAR



mainContentText.fromTo(".star1", 
    {
        opacity: 0,
        scale: 0.5,
        
    },
    {
        opacity: 1,
        scale: 1,
        ease: "back.out(4)",
        duration: .8,
        // delay: 1.5,
    }, "-=1.5"
)




// HEROSECTION-BTN
// HEROSECTION-BTN
// HEROSECTION-BTN
// HEROSECTION-BTN
// HEROSECTION-BTN



mainContentText.fromTo(".btn", 
    {
        opacity: 0,
        x: 150,
        width: 60
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "back.out(3)",
        
        onComplete: () => {
        // ⬅️ when btn reaches x: 0, make parent overflow visible
        gsap.set(".heroSection-btn", { overflow: "visible" });
        }
    }, "-=1.7"
);

mainContentText.to(".btn", {
    width: 230,
    duration: 0.6,
    ease: "back.out(4)"
}, "-=0.8");



mainContentText.fromTo(".btn a", 
    {
        opacity: 0,
        scale: .8,
        

    },
    {
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",

    }, "-=.5"
)
mainContentText.fromTo(".btn i", 
    {
        opacity: 0,
        scale: .8,
        

    },
    {
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",

    }, "<"
)






// SVGIMG
// SVGIMG
// SVGIMG
// SVGIMG
// SVGIMG


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
        duration: 1,
        opacity: 1,
        ease: "circ.inOut",


    }


)
svgImgTL.to(".svg-cont", {
    y: -440,
    duration: 1,
    // delay: 3,
    ease: "power3.inOut",
})

svgImgTL.to(".svg-cont", {
    y: 0,
    duration: 1,
    // delay: 4,
    ease: CustomEase.create("custom", "M0,0 C0.164,-0.017 0.181,0 0.265,0.094 0.336,0.174 0.44,0.379 0.472,0.519 0.492,0.609 0.567,0.813 0.63,0.907 0.705,1.018 0.704,1 1,1 "),
    ease: "power4.inOut",


})





// HEADING2
// HEADING2
// HEADING2
// HEADING2
// HEADING2


gsap.from(".number h1", {
    opacity: 0,
    y: -100,
    duration: 1, // This belongs to the animation, not scrollTrigger
    scrollTrigger: {
        trigger: ".heading2",
        start: "top 70%",
        // markers: true, // For debugging, remove in production
    }
});




// PARA2
// PARA2
// PARA2
// PARA2
// PARA2


const heading2Para = document.querySelector(".heading2para p");
const heading2ParaLines = heading2Para.innerHTML.split("<br>");
heading2Para.innerHTML = heading2ParaLines
    .map(line => `<span class="para2Line">${line}</span>`)
    .join("<br>");



gsap.from(".para2Line", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(2.5)",
        scrollTrigger: {
            trigger: ".heading2para",
            start: "top 75%",
            // markers: true, // For debugging, remove in production
            }
    }
);


gsap.from(".star2", {
        opacity: 0,
        scale: 0.5,
        ease: "back.out(4)",
        duration: .8,
        scrollTrigger: {
            trigger: ".heading2para",
            start: "top 75%",
            // markers: true, // For debugging, remove in production
        }
    }

)










var masterTL = gsap.timeline();
masterTL.add(svgImgTL).add(mainContentText, "-=0.6"); // This order makes svgImgTL first








































