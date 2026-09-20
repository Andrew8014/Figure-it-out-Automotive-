// Script.js

document.addEventListener('DOMContentLoaded', () => {

    console.log('Application initialized successfully.');

    

    const appContainer = document.getElementById('app');

    

    // Send email

    const form = document.getElementById("contact-form");


    (function() {

        emailjs.init({

            publicKey: "FhXWaxMOEt8T9k6at"

        });

    })();


    if(form) {

        form.addEventListener("submit", function(event) {

            event.preventDefault();

            console.log('Save free requests');

            emailjs.sendForm('contact_service', 'contact_form', this)

                .then(() => {

                    console.log('sent');

                }, (error) => {

                    console.log('failed: ', error);

                });

        });

    }


    // Image switcher

    var img = document.getElementById("image");

    var imgList = ["images/car-repair.jpg", "images/checking-the.jpg", "images/Tire-services.jpg"];

    

    var i = 0;

    setInterval(() => {
       i++;


        if(i >= imgList.length) {

            i=0;

        }

        img.setAttribute('src', imgList[i]);
 
        
    }, 3000);

    var prev = function() {

        i--;


        if(i < 0) {

            i = imgList.length - 1;

        }

        img.setAttribute('src', imgList[i]);   

    }
    


    var next = function() {

        i++;


        if(i >= imgList.length) {

            i=0;

        }

        img.setAttribute('src', imgList[i]);

    }


    if (img) {

        img.onclick = next;

        document.getElementById("last-img").onclick = prev;

        document.getElementById("next-img").onclick = next;

    }


});