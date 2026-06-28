/*==========================================
            THEME TOGGLE
==========================================*/

const themeButton = document.getElementById("theme-toggle");

const body = document.body;

const themeIcon = themeButton.querySelector("i");

/*==========================================
        APPLY SAVED THEME
==========================================*/

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

    body.classList.add(savedTheme);

}

else{

    if(window.matchMedia("(prefers-color-scheme: light)").matches){

        body.classList.add("light");

    }

}

/*==========================================
        UPDATE ICON
==========================================*/

function updateThemeIcon(){

    if(body.classList.contains("light")){

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

    }

    else{

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

    }

}

updateThemeIcon();

/*==========================================
        TOGGLE THEME
==========================================*/

themeButton.addEventListener("click",()=>{

    body.classList.toggle("light");

    updateThemeIcon();

    if(body.classList.contains("light")){

        localStorage.setItem("theme","light");

    }

    else{

        localStorage.removeItem("theme");

    }

});

/*==========================================
    SYSTEM THEME CHANGE (FIRST VISIT)
==========================================*/

window.matchMedia("(prefers-color-scheme: light)")
.addEventListener("change",(event)=>{

    if(localStorage.getItem("theme")) return;

    if(event.matches){

        body.classList.add("light");

    }

    else{

        body.classList.remove("light");

    }

    updateThemeIcon();

});