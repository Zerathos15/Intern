/*==========================================
            MOBILE MENU
==========================================*/

const menuBtn = document.getElementById("menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if(navLinks.classList.contains("active")){

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

    else{

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});
/*==========================================
            FAQ
==========================================*/

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question=item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach(f=>{

            if(f!==item){

                f.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});
/*==========================================
        PORTFOLIO FILTER
==========================================*/

const filterBtns=document.querySelectorAll(".filter-btn");

const projects=document.querySelectorAll(".project-card");

filterBtns.forEach(button=>{

    button.addEventListener("click",()=>{

        filterBtns.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter=button.dataset.filter;

        projects.forEach(project=>{

            if(filter==="all"){

                project.style.display="block";

            }

            else if(project.classList.contains(filter)){

                project.style.display="block";

            }

            else{

                project.style.display="none";

            }

        });

    });

});
/*==========================================
        COUNTER
==========================================*/

const counters=document.querySelectorAll(".counter");

let counterStarted=false;

function startCounters(){

    if(counterStarted) return;

    counterStarted=true;

    counters.forEach(counter=>{

        const target=+counter.dataset.target;

        let count=0;

        const increment=target/150;

        const update=()=>{

            count+=increment;

            if(count<target){

                counter.innerText=Math.floor(count);

                requestAnimationFrame(update);

            }

            else{

                counter.innerText=target;

            }

        };

        update();

    });

}
/*==========================================
        SCROLL REVEAL
==========================================*/

const reveals=document.querySelectorAll(".reveal");

function revealElements(){

    const trigger=window.innerHeight*0.85;

    reveals.forEach(element=>{

        const top=element.getBoundingClientRect().top;

        if(top<trigger){

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealElements);

revealElements();
/*==========================================
        START COUNTERS
==========================================*/

window.addEventListener("scroll",()=>{

    const stats=document.querySelector(".stats");

    if(!stats) return;

    const top=stats.getBoundingClientRect().top;

    if(top<window.innerHeight-120){

        startCounters();

    }

});
/*==========================================
        ACTIVE NAVIGATION
==========================================*/

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});
