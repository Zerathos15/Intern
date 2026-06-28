/*==========================================
            DOM ELEMENTS
==========================================*/

const scrollTopButton =
    document.getElementById("scroll-top");

const header =
    document.querySelector("header");

const navAnchors =
    document.querySelectorAll('.nav-links a[href^="#"]');

/*==========================================
        SCROLL TO TOP BUTTON
==========================================*/

function toggleScrollButton(){

    if(window.scrollY > 500){

        scrollTopButton.classList.add("show");

    }

    else{

        scrollTopButton.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    toggleScrollButton
);

toggleScrollButton();

/*==========================================
        SCROLL TO TOP
==========================================*/

if(scrollTopButton){

    scrollTopButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==========================================
        STICKY HEADER
==========================================*/

function updateHeader(){

    if(window.scrollY > 60){

        header.style.background =
            "rgba(8,17,31,.92)";

        header.style.boxShadow =
            "0 12px 30px rgba(0,0,0,.18)";

    }

    else{

        header.style.background =
            "";

        header.style.boxShadow =
            "none";

    }

}

window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();

/*==========================================
        SMOOTH NAVIGATION
==========================================*/

navAnchors.forEach(link=>{

    link.addEventListener("click",(event)=>{

        event.preventDefault();

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if(!target) return;

        const offset = 80;

        const position =
            target.offsetTop - offset;

        window.scrollTo({

            top:position,

            behavior:"smooth"

        });

    });

});

/*==========================================
        ACTIVE NAV LINK
==========================================*/

const pageSections =
    document.querySelectorAll("section[id]");

function highlightNavigation(){

    let currentSection = "";

    pageSections.forEach(section=>{

        const top =
            section.offsetTop - 150;

        const height =
            section.offsetHeight;

        if(window.scrollY >= top &&
           window.scrollY < top + height){

            currentSection =
                section.id;

        }

    });

    navAnchors.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") ===
           "#" + currentSection){

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    highlightNavigation
);

highlightNavigation();

/*==========================================
        SHRINK HEADER
==========================================*/

function shrinkHeader(){

    if(window.scrollY > 120){

        header.style.height = "70px";

    }

    else{

        header.style.height = "80px";

    }

}

window.addEventListener(
    "scroll",
    shrinkHeader
);

shrinkHeader();