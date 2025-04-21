// This under code will be used during deploying

document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let type = document.getElementById("type").value;
    let category = (type === "medical") ? document.getElementById("medicalCategory").value : document.getElementById("businessCategory").value;
    let licenseNumber = document.getElementById("licenseNumber").value;
    let location = document.getElementById("location").value;
    let contact_info = document.getElementById("contact_info").value;
    let city = document.getElementById("regionFilter").value;

    if (category === "Select Medical Category" || category === "Select business Category") {
        alert("Please select a valid category.");
        return;
    }

    // License Verification
    let isValidLicense = false;
    if (type === "medical") {
        isValidLicense = await verifyMedicalLicense(licenseNumber);
    } else if (type === "business") {
        isValidLicense = await verifyBusinessLicense(licenseNumber);
    }

    if (!isValidLicense) {
        alert("Your registration/license number is invalid. Please insert the correct number.");
        return;
    }

    // Store data if valid
    if (!storedData[type][category]) {
        storedData[type][category] = [];
    }

    storedData[type][category].push({
        name,
        licenseNumber,
        location,
        contact_info,
        city,
    });

    let filterDropdown = (type === "medical") ? document.getElementById("medicalCategoryFilter") : document.getElementById("businessCategoryFilter");
    let existingOption = filterDropdown.querySelector(`option[value="${category}"]`);

    if (!existingOption) {
        let newOption = document.createElement("option");
        newOption.value = category;
        newOption.textContent = document.querySelector(`#${type}Category option[value="${category}"]`).textContent;
        filterDropdown.appendChild(newOption);
    }

    alert("Registration successful!");
    this.reset();
    cycleSlides();
});

// Medical License Validation
async function verifyMedicalLicense(licenseNumber) {
    let sources = [
        `https://license.aafda.gov.et/api/verify?license=${licenseNumber}`,
        `https://moh.gov.et/api/license-check?license=${licenseNumber}`
    ];

    for (let url of sources) {
        try {
            let response = await fetch(url);
            let result = await response.json();
            if (result.valid === true || result.status === "active") {
                return true;
            }
        } catch (error) {
            console.warn("Medical license check failed for:", url, error);
        }
    }
    return false;
}

// Business License Validation
async function verifyBusinessLicense(licenseNumber) {
    let sources = [
        `https://www.new.business.gov.et/api/verify?license=${licenseNumber}`,
        `https://etrade.mot.gov.et/api/license-check?license=${licenseNumber}`
    ];

    for (let url of sources) {
        try {
            let response = await fetch(url);
            let result = await response.json();
            if (result.valid === true || result.status === "active") {
                return true;
            }
        } catch (error) {
            console.warn("Business license check failed for:", url, error);
        }
    }
    return false;
}



document.addEventListener("DOMContentLoaded", function () {
    // Sample default slides (for testing purposes)
    let defaultSlides = [
        { category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", contact: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", contact: "09...", city: "Addis Ababa" },
        { category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", contact: "09...", city: "Adama" },
        { category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", contact: "0904222324", city: "Hawassa" },
        { category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", contact: "09...", city: "Bahir Dar" },
        { category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", contact: "09...", city: "Addis Ababa" }
    ];

    // Initialize stored data structure for medical and business
    let storedData = {
        medical: {},
        business: {}
    };

    let slideIndex = 0;
    let selectedCity = localStorage.getItem("selectedCity") || "All Cities";  // Default to "All Cities" if not set
   

    function showSlides(data) {
        console.log("Updating slideshow...");
        let slideshow = document.getElementById("slideshow");
        let dotContainer = document.getElementById("dotContainer");

        if (!slideshow) {
            console.error("Slideshow container not found!");
            return;
        }

        slideshow.innerHTML = "";
        dotContainer.innerHTML = "";

        data.forEach((slideData, index) => {
            let slide = document.createElement("div");
            slide.classList.add("slide");
            if (index === slideIndex) slide.classList.add("active");

            slide.innerHTML = `
                <h3>${slideData.category === "Medical" ? "Medical Service" : "Business Organization"}</h3>
                <p><strong>Name:</strong> ${slideData.name}</p>
                <p><strong>Service:</strong> ${slideData.service}</p>
                <p><strong>Location:</strong> ${slideData.location}</p>
                <p><strong>City:</strong> ${slideData.city}</p>
                <p><strong>Contact:</strong> ${slideData.contact}</p>
            `;

            slideshow.appendChild(slide);

            let dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === slideIndex) dot.classList.add("active");
            dot.addEventListener("click", () => {
                slideIndex = index;
                cycleSlides();
            });

            dotContainer.appendChild(dot);
        });
    }

    function cycleSlides() {
        let newSlides = [];
        for (let category in storedData) {
            for (let subCategory in storedData[category]) {
                storedData[category][subCategory].forEach(entity => {
                    // Include the item if it matches the selected city or if "All Cities" is selected
                    if (entity.city === selectedCity || selectedCity === "All Cities") {
                        newSlides.push({
                            category: category === 'medical' ? "Medical" : "Business",
                            name: entity.name,
                            service: entity.industryOrService,
                            location: entity.location,
                            city: entity.city,
                            contact: entity.contact_info
                        });
                        
                    }
                });
            }
            
            
        }

        // If no stored data, use the default slides and filter by the selected city
        if (newSlides.length === 0) {
            newSlides = defaultSlides.filter(slide => slide.city === selectedCity || selectedCity === "All Cities");
        }

        showSlides(newSlides);
        slideIndex = (slideIndex + 1) % newSlides.length;
    }

    // Cycle slides at regular intervals
    setInterval(cycleSlides, 3000);

    //

    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let type = document.getElementById("type").value;
        let category = (type === "medical") ? document.getElementById("medicalCategory").value : document.getElementById("businessCategory").value;
        let industryOrService = document.getElementById("industryOrService").value;
        let licenseNumber = document.getElementById("licenseNumber").value;
        let location = document.getElementById("location").value;
        let contact_info = document.getElementById("contact_info").value;
        let city = document.getElementById("regionFilter").value;

        if (category === "Select Medical Category" || category === "Select business Category") {
            alert("Please select a valid category.");
            return;
        }

        if (!storedData[type][category]) {
            storedData[type][category] = [];
        }

        storedData[type][category].push({
            name,
            industryOrService,
            licenseNumber,
            location,
            contact_info,
            city,
           
        });

        let filterDropdown = (type === "medical") ? document.getElementById("medicalCategoryFilter") : document.getElementById("businessCategoryFilter");
        let existingOption = filterDropdown.querySelector(`option[value="${category}"]`);

        if (!existingOption) {
            let newOption = document.createElement("option");
            newOption.value = category;
            newOption.textContent = document.querySelector(`#${type}Category option[value="${category}"]`).textContent;
            filterDropdown.appendChild(newOption);
        }

        alert("Registration successful!");
        this.reset();
        cycleSlides();
    });

    
    // Filter category modal setup for Stored data during registration
    function showCategoryModal(details) {
        let modal = document.getElementById("categoryDataModal");
        document.getElementById("categoryModalDetails").innerHTML = details;
        modal.style.display = "block";       
    } 

    // Event for filtering by medical or business categories
    function setupFilterEvent(filterId, type) {
        document.getElementById(filterId).addEventListener("change", function () {
            let selectedCategory = this.value;
            let details = `<h3>${this.options[this.selectedIndex].textContent}</h3>`;

            if (storedData[type][selectedCategory] && storedData[type][selectedCategory].length > 0) {
                storedData[type][selectedCategory].forEach(user => {
                    details += `
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Industry/Service:</strong> ${user.industryOrService}</p>
                        <p><strong>Location:</strong> ${user.location}</p>
                        <p><strong>City:</strong> ${user.city}</p>
                        <p><strong>Contact:</strong> ${user.contact_info}</p>
                        <hr>
                    `;
                });
            } else {
                details += "<p>No data available.</p>";
            }

            showCategoryModal(details);
        });
    }

    // Setup event listeners for category filters
    setupFilterEvent("medicalCategoryFilter", "medical");
    setupFilterEvent("businessCategoryFilter", "business");

    document.querySelector(".category-close").addEventListener("click", function () {
        document.getElementById("categoryDataModal").style.display = "none";        
    });     

    // Handle city selection from the filter
    document.getElementById("cityFilter").addEventListener("change", function () {
        selectedCity = this.value;
        localStorage.setItem("selectedCity", selectedCity);
        cycleSlides(); // Update slideshow based on selected city
    });

    // Initial call to load the slideshow
    cycleSlides();
}); 
