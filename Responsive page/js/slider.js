/*==========================================
        TESTIMONIAL SLIDER
==========================================*/

const track =
document.querySelector(".testimonial-track");

const slides =
document.querySelectorAll(".testimonial-card");

const dots =
document.querySelectorAll(".dot");

const nextBtn =
document.querySelector(".next");

const prevBtn =
document.querySelector(".prev");

let currentSlide = 0;

let autoPlay;

/*==========================================
        UPDATE SLIDER
==========================================*/

function updateSlider(){

    track.style.transform =
    `translateX(-${currentSlide*100}%)`;

    dots.forEach(dot=>
        dot.classList.remove("active")
    );

    dots[currentSlide].classList.add("active");

}

/*==========================================
        NEXT
==========================================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    updateSlider();

}

/*==========================================
        PREVIOUS
==========================================*/

function previousSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=slides.length-1;

    }

    updateSlider();

}

/*==========================================
        BUTTONS
==========================================*/

nextBtn.addEventListener(
"click",
nextSlide
);

prevBtn.addEventListener(
"click",
previousSlide
);

/*==========================================
        DOTS
==========================================*/

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        updateSlider();

    });

});

/*==========================================
        AUTOPLAY
==========================================*/

function startSlider(){

    autoPlay=setInterval(

        nextSlide,

        5000

    );

}

function stopSlider(){

    clearInterval(autoPlay);

}

startSlider();

/*==========================================
        PAUSE ON HOVER
==========================================*/

track.addEventListener(

"mouseenter",

stopSlider

);

track.addEventListener(

"mouseleave",

startSlider

);

/*==========================================
        TOUCH SUPPORT
==========================================*/

let startX=0;

track.addEventListener(

"touchstart",

e=>{

    startX=e.touches[0].clientX;

}

);

track.addEventListener(

"touchend",

e=>{

    let endX=e.changedTouches[0].clientX;

    let distance=startX-endX;

    if(distance>50){

        nextSlide();

    }

    if(distance<-50){

        previousSlide();

    }

});