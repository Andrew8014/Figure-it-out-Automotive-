// Script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized successfully.');
    
    const appContainer = document.getElementById('app');
    
    // Send email
    const form = document.getElementById("contact-form");

    (function() {
        emailjs.init({
            publicKey: emailjsPublicKey
        });
    })();

    if(form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

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

    var i = 0;

    setInterval(() => {
        if(i == imgList.length - 1)
            i=0;
        else {
            i++;
        }
        // This is in the html File, it is what shows the actual image on the page.
        // <img id="image" src="./images/car-repair.jpg">
        // you chage src to chnage what image shows, so you set the attribute 'src' to the next image in the list
        img.setAttribute('src', imgList[i]);
    }, 3000);

    const servicesList = document.getElementById('services');

    // Loops through the services constant in data.js
    // Create list element for each on with the html set below.
    // Adds the classes it needs and puts the title/desctription/image 
    // from data.js into it
    services.forEach(service => {
        servicesList.innerHTML += `
            <li class="unexpanded-service">
                <div class="service-title">
                    <strong>${service.title}</strong>
                    <span class="expand-arrow">▼</span>
                </div>

                <p>${service.description}</p>

                ${service.image ? `<img src="${service.image}" alt="">` : ""}
            </li>
        `;
    });

    // Listen for one of the services being clicked
    servicesList.addEventListener('click', (event) => {
        element = event.target.closest('li');

        if(element != null) {
            // Toggle the class 'unexpanded-service', it controls whether the 
            // service shows just a title or the whole thing. 
            // See style.css for mobile view of .unexpanded-service
            element.classList.toggle('unexpanded-service');
            // Get the arrow on that service
            const arrow = element.querySelector(".expand-arrow");
            // If the service has this class it is not explanded
            // Make the arrow point down
            if (element.classList.contains("unexpanded-service")) {
                arrow.textContent = "▼";
            } else {
                // If it is explanded make it point up
                arrow.textContent = "▲";
            }
        }
    });

    const makeSelectElement = document.getElementById('make');
    const modelSelectElement = document.getElementById('model');

    // This create the list of makes in the dropdown from the 
    // constant in data.js

    // Loops through all of them, does this for each one
    Object.keys(makeModel).forEach(make => {
        // Disable model selection until a make is selected
        modelSelectElement.disabled = true;
        // Create a new html <option> element
        const option = document.createElement('option');
        // Set the text and value
        option.text = formatName(make);
        option.value = make;
        // Append (add) it to the dropdown
        makeSelectElement.appendChild(option);
    });

    // Listens for a selection of a make
    makeSelectElement.addEventListener('change', event => {
        // This is the selected value
        const make = event.target.value;
        // This clear the models in case they select a new make
        modelSelectElement.replaceChildren();
        // Adds the placeholder again since it was cleared above
        let tempModel = document.createElement('option');
        tempModel.text = 'Model';
        tempModel.id = 'modelPlaceholder';
        modelSelectElement.appendChild(tempModel);
        // Loop through the models for the selected make in data.js
        makeModel[make].forEach(model => {
            // Create a new option element, set name/value and add
            const option = document.createElement('option');

            option.text = formatName(model);
            option.value = model;

            modelSelectElement.appendChild(option);
        });
        // Make model enabled now that a make is selected
        modelSelectElement.disabled = false;
        // Remove the make placeholder, Only really need it before they
        // select make for the first time
        let placeholder = document.getElementById('makePlaceholder')
        if(placeholder)
            placeholder.remove();
    });

    // Listen for a model being selected and remove the placeholder
    modelSelectElement.addEventListener('change', event => {
        let placeholder = document.getElementById('modelPlaceholder')
        if(placeholder)
            placeholder.remove();
    });

    // Formats the names in make/model in script.js
    // Need the makes to me lower case, because they are keys in the data structure
    function formatName(name) {
        // Check if it is an accronym, if it is, return the value from specialNames in data.js
        return specialNames[name] 
            // || means 'OR', so if the make/model is not on that list it does the following
            // First splits the make/model at the space chatacters
            // and looks at each separated word
            || name.split(" ").map(word => {
                // Check if one of the words is an accronym ('bmw car 1)
                if(specialNames[word] != undefined)
                    // If one word is set it to the correct version
                    word = specialNames[word];
                // Return each word capitalizing the first letter
                // Slice(1) cuts off the first letter (index 0)
                // + joins (concatenates) the uppercase first letter and the rest
                return word.charAt(0).toUpperCase() + word.slice(1);
            // Rejoin at the spaces
            }).join(" ");
    }

    const yearSelectElement = document.getElementById('year');
    const years = range(1950,2026);

    // Create year options for the year called in the range function
    years.forEach(year => {
        const option = document.createElement('option');

        option.text = year;
        option.value = year;

        yearSelectElement.appendChild(option);
    });

    // Creates an array of numbers from the start to end year
    function range(start, end) {
        // Set length of array by end year - start year
        // Set each value as start + the current index
        // index = 0 at fist element (1950 + 0)
        // index = 1 at second element (1950 + 1)...
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }
});
