/*==========================================
            PRELOADER
==========================================*/

const loader = document.getElementById("loader");

document.body.style.overflow = "hidden";

window.addEventListener("load", () => {

    setTimeout(() => {

        if(loader){

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

            loader.style.transition =
                "opacity .6s ease, visibility .6s ease";

        }

        document.body.style.overflow = "visible";

    }, 800);

});

/*==========================================
        PAGE SCROLL PROGRESS
==========================================*/

const progressBar =
    document.getElementById("progress-bar");

function updateProgressBar(){

    if(!progressBar) return;

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
        progress + "%";

}

window.addEventListener(
    "scroll",
    updateProgressBar
);

updateProgressBar();

/*==========================================
        SMOOTH PAGE RELOAD
==========================================*/

window.addEventListener("beforeunload", () => {

    window.scrollTo(0, 0);

});

/*==========================================
        IMAGE PRELOAD
==========================================*/

const preloadImages = () => {

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        const img = new Image();

        img.src = image.src;

    });

};

window.addEventListener(
    "DOMContentLoaded",
    preloadImages
);