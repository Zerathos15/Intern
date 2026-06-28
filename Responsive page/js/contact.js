/*==========================================
            CONTACT FORM
==========================================*/

const contactForm = document.getElementById("contact-form");

if(contactForm){

    const submitButton =
        contactForm.querySelector("button");

    contactForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const name =
            contactForm.querySelector(
                'input[type="text"]'
            );

        const email =
            contactForm.querySelector(
                'input[type="email"]'
            );

        const subject =
            contactForm.querySelectorAll(
                'input[type="text"]'
            )[1];

        const message =
            contactForm.querySelector("textarea");

        if(

            name.value.trim()==="" ||

            email.value.trim()==="" ||

            subject.value.trim()==="" ||

            message.value.trim()===""

        ){

            showNotification(

                "Please fill all fields.",

                "error"

            );

            return;

        }

        if(

            !validateEmail(email.value)

        ){

            showNotification(

                "Enter a valid email address.",

                "error"

            );

            return;

        }

        submitButton.disabled = true;

        submitButton.innerHTML =

        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(()=>{

            showNotification(

                "Message sent successfully!",

                "success"

            );

            contactForm.reset();

            submitButton.disabled = false;

            submitButton.innerHTML =

            "Send Message";

        },2000);

    });

}

/*==========================================
        EMAIL VALIDATION
==========================================*/

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/*==========================================
        NOTIFICATION
==========================================*/

function showNotification(message,type){

    const notification =

    document.createElement("div");

    notification.className =

    `notification ${type}`;

    notification.innerText =

    message;

    document.body.appendChild(

        notification

    );

    setTimeout(()=>{

        notification.classList.add("show");

    },100);

    setTimeout(()=>{

        notification.classList.remove("show");

        setTimeout(()=>{

            notification.remove();

        },400);

    },3000);

}