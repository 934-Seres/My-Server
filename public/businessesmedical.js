const myHeader=document.querySelector('h1');
const originalText=myHeader.textContent;
const updatedText="Medical & Business Directory";
myHeader.addEventListener('mouseover', function(){
    myHeader.textContent=updatedText;
   
});
myHeader.addEventListener('mouseout', function(){
    myHeader.textContent=originalText;

});


//
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded"); // Debugging

    const languageSelect = document.getElementById("languageSelect");

    if (!languageSelect) {
        console.error("languageSelect not found");
        return;
    }

    const translations = {
        en: {
            title: "Medical & Business Directory",
            searchPlaceholder: "Search or select a city...",
            registerTitle: "Register Your Business/Medical Entity",
            namePlaceholder: "Name of Organization",
            industryPlaceholder: "Industry/Service",
            locationPlaceholder: "Area/Zone",
            contactPlaceholder: "Phone/email",
            registerButton: "Register/Submit"
        },
        am: {
            title: "የሕክምና እና የንግድ ማውጫ",
            searchPlaceholder: "ከተማ ፈልግ ወይም ይምረጡ...",
            registerTitle: "የንግድ/ሕክምና ድርጅትዎን ይመዝግቡ",
            namePlaceholder: "የድርጅት ስም",
            industryPlaceholder: "ዘርፍ/አገልግሎት",
            locationPlaceholder: "አካባቢ/ዞን",
            contactPlaceholder: "ስልክ/ኢሜል",
            registerButton: "ይመዝገቡ/ያቀርቡ"
        },
        om: {
            title: "Direektaroota Yaalaa fi Daldalaa",
            searchPlaceholder: "Magaalaa fili ykn barbaadi...",
            registerTitle: "Daldala/Teeknooloojii Fayyaa Keessan Galmeessi",
            namePlaceholder: "Maqaa Dhaabbata",
            industryPlaceholder: "Indastirii/Tajaajila",
            locationPlaceholder: "Naannoo/Godina",
            contactPlaceholder: "Bilbila/email",
            registerButton: "Galmeessi/Ergi"
        },
        af: {
            title: "Diiwaanka Ganacsiga iyo Caafimaadka",
            searchPlaceholder: "Magaala dooro ama raadso...",
            registerTitle: "Mee Ganacsigaaga/Goobta Caafimaadka Diiwaangali",
            namePlaceholder: "Magaca Ururka",
            industryPlaceholder: "Warshad/Adeeg",
            locationPlaceholder: "Goob/Qayb",
            contactPlaceholder: "Taleefoon/imeyl",
            registerButton: "Diiwaangali/Dir"
        },
        ti: {
            title: "መዝገብ ንግድን ሕክምናን",
            searchPlaceholder: "ከተማ ምረጥ ወይ ድለይ...",
            registerTitle: "ድርጅትኻ ወይ ሕክምና መዝግብ",
            namePlaceholder: "ስም ድርጅት",
            industryPlaceholder: "ኢንዱስትሪ/አገልግሎት",
            locationPlaceholder: "አካባቢ/ዞባ",
            contactPlaceholder: "ስልክ/ኢሜል",
            registerButton: "መዝግብ/ላእ"
        },
        so: {
            title: "Tusmada Ganacsi & Caafimaad",
            searchPlaceholder: "Raadi ama dooro magaalo...",
            registerTitle: "Diiwaangeli Ganacsigaaga/Agaasimaha Caafimaadka",
            namePlaceholder: "Magaca Hay'adda",
            industryPlaceholder: "Warshad/Adeeg",
            locationPlaceholder: "Aagga/Deegaanka",
            contactPlaceholder: "Telefoon/email",
            registerButton: "Diiwaangeli/Dir"
        },
        ar: {
            title: "الدليل الطبي والتجاري",
            searchPlaceholder: "ابحث عن مدينة أو حددها...",
            registerTitle: "سجل كيانك التجاري/الطبي",
            namePlaceholder: "اسم المنظمة",
            industryPlaceholder: "الصناعة/الخدمة",
            locationPlaceholder: "المنطقة/المنطقة",
            contactPlaceholder: "الهاتف/البريد الإلكتروني",
            registerButton: "تسجيل/إرسال"            
        }
    }

    function changeLanguage() {
        const selectedLanguage = languageSelect.value;
        if (translations[selectedLanguage]) {
            console.log("Changing language to:", selectedLanguage); // Debugging

            document.getElementById("pageTitle").textContent = translations[selectedLanguage].title;
            document.getElementById("searchQuery").placeholder = translations[selectedLanguage].searchPlaceholder;
            document.getElementById("registerTitle").textContent = translations[selectedLanguage].registerTitle;
            document.getElementById("name").placeholder = translations[selectedLanguage].namePlaceholder;
            document.getElementById("industryOrService").placeholder = translations[selectedLanguage].industryPlaceholder;
            document.getElementById("location").placeholder = translations[selectedLanguage].locationPlaceholder;
            document.getElementById("contact_info").placeholder = translations[selectedLanguage].contactPlaceholder;
            document.getElementById("register").textContent = translations[selectedLanguage].registerButton;
        }    
    }

    // Initialize language on page load
    changeLanguage();

    // Add event listener to dropdown
    languageSelect.addEventListener("change", changeLanguage);
});


       
//This below is the Adverte or Notice elements window display, and window close functionality in Advertisement Link
// Get the modal elements
var adverteModal = document.getElementById("adverteModal");
var noticeModal = document.getElementById("noticeModal");

// Get the links that open the modals
var adverteLink = document.querySelector(".adverte-link");
var noticeLink = document.querySelector(".notice-link");

// Get the close buttons
var closeAdverte = document.getElementById("close-adverte");
var closeNotice = document.getElementById("close-notice");

// When the user clicks on the "Adverte" link, open the adverte modal
adverteLink.onclick = function(event) {
    event.preventDefault(); // Prevent the default link behavior
    adverteModal.style.display = "block";
}

// When the user clicks on the "Notice" link, open the notice modal
noticeLink.onclick = function(event) {
    event.preventDefault(); // Prevent the default link behavior
    noticeModal.style.display = "block";
}

// When the user clicks on the close button for adverte modal, close it
closeAdverte.onclick = function() {
    adverteModal.style.display = "none";
}

// When the user clicks on the close button for notice modal, close it
closeNotice.onclick = function() {
    noticeModal.style.display = "none";
}


    
//The below is the display of stored data 
let storedDatas = {
    advert: [],
    notice: []
};

// Function to handle form submission
function handleFormSubmit(event, type) {
    event.preventDefault(); // Prevent default form submission

    // Get form data (assuming inputs have name attributes)
    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData); // Convert to object

    // Store the data in the correct category
    storedDatas[type].push(formObject);

    alert(`Form submitted under: ${type === "advert" ? "Advertises" : "Notices"}`);

    // Reset the form
    event.target.reset();
}

// Attach event listeners to forms after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    let advertForm = document.getElementById("adverteForm");
    let noticeForm = document.getElementById("noticeForm");

    // Ensure forms exist and then attach the submit event listener
    if (advertForm) {
        advertForm.addEventListener("submit", function (event) {
            handleFormSubmit(event, "advert"); // Call submit handler for Advertises
        });
    }

    if (noticeForm) {
        noticeForm.addEventListener("submit", function (event) {
            handleFormSubmit(event, "notice"); // Call submit handler for Notices
        });
    }

    // Handle dropdown selection change to display respective stored data
    document.querySelector(".select-advert-notice").addEventListener("change", function () {
        let selectedOption = this.value; // Get selected value
        showStoredDatas(selectedOption); // Show the data in modal
    });
});



function sendStoredData(type, index) {
    // Get the stored entry based on the type and index
    const entry = storedDatas[type][index];
    
    // Create the message content where the title is on the first line and content on the second line
    const messageContent = `${entry.name}\n${entry.details}`;
    
    // Check if it's for advertisements or notices and update the respective slideshow
    if (type === 'advert') {
        advertMessages.push(messageContent);  // Push the message to the advertMessages array
        updateSlideshow('advert');  // Update the advertisement slideshow
    } else if (type === 'notice') {
        noticeMessages.push(messageContent);  // Push the message to the noticeMessages array
        updateSlideshow('notice');  // Update the notice slideshow
    }

    // Optionally, you can show a success message or confirmation
    alert(`${entry.name || "This entry"} has been sent to the slideshow.`);
}



// Function to show stored data in a modal
function showStoredDatas(type) {
    let modals = document.getElementById("dataModal");
    let modalsContent = document.getElementById("modalContent");

    // Clear previous content
    modalsContent.innerHTML = "";

    // Check if there's any data in the selected category
    if (storedDatas[type].length > 0) {
        storedDatas[type].forEach((entry, index) => {
            modalsContent.innerHTML += `
                <h4>Entry ${index + 1}</h4>
                <p><strong>Name:</strong> ${entry.name || "N/A"}</p>
                <p><strong>Details:</strong> <span id="details-${type}-${index}">${shortenText(entry.details)}</span> 
                    <a href="#" onclick="toggleDetailsStored('${type}', ${index}); return false;" id="toggle-${type}-${index}">more...</a>
                </p>
                <button id="delete-btn-${index}" class="delete-btn" onclick="deleteStoredData('${type}', ${index})">Delete</button>
                <button id="send-btn-${index}" class="send-btn" onclick="sendStoredData('${type}', ${index})">Send</button>
                <hr>
            `;
        });
    } else {
        modalsContent.innerHTML = "<p>No data available.</p>";
    }

    // Show the modal
    modals.style.display = "flex";

    // Update button visibility based on isOwner
    toggleOwnerUI(isOwner);
}


// Function to shorten text and add 'more...' toggle
function shortenText(text) {
    if (!text) return "N/A";
    let words = text.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
}

// Function to toggle stored details visibility
function toggleDetailsStored(type, index) {
    let detailsElement = document.getElementById(`details-${type}-${index}`);
    let toggleElement = document.getElementById(`toggle-${type}-${index}`);
    let fullText = storedDatas[type][index].details || "N/A";

    if (detailsElement.innerText.includes("...")) {
        detailsElement.innerText = fullText;
        toggleElement.innerText = "less...";
    } else {
        detailsElement.innerText = shortenText(fullText);
        toggleElement.innerText = "more...";
    }
} 

// Function to delete stored data (only for the owner)
function deleteStoredData(type, index) {
    let confirmation = confirm("Are you sure you want to delete this entry?");
    if (confirmation) {
        storedDatas[type].splice(index, 1);
        showStoredDatas(type); // Refresh the modal to reflect changes
    }
}



// Close modal when clicking 'X'
document.querySelector(".modal-close").addEventListener("click", function () {
    document.getElementById("dataModal").style.display = "none";
}); 

// Close modal if clicked outside
window.addEventListener("click", function (event) {
    let modal = document.getElementById("dataModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}); 



// Function to toggle the "more..." / "less..." for the Details field
function toggleDetails(formId) {
    const detailsInput = formId === 'adverteForm' ? document.getElementById("detailsAdvert") : document.getElementById("detailsNotice");
    const toggleText = formId === 'adverteForm' ? document.getElementById("moreDetailsAdvert") : document.getElementById("moreDetailsNotice");
    
    // Check if input is expanded or not
    if (detailsInput.classList.contains("expanded")) {
        detailsInput.classList.remove("expanded");
        toggleText.textContent = "more...";  // Show "more..." again
    } else {
        detailsInput.classList.add("expanded");
        toggleText.textContent = "less...";  // Change to "less..." when expanded
    }
}

// Add event listeners for "more..." text
document.getElementById("moreDetailsAdvert").addEventListener("click", function () {
    toggleDetails('adverteForm');
});

document.getElementById("moreDetailsNotice").addEventListener("click", function () {
    toggleDetails('noticeForm');
});




 //HERE BELOW IS LOCATION SEARCH, MAP UPDATE AND CATEGORY SELECTION
 function searchLocation() {
    const userInput = searchQuery.value.trim();
    const selectedOption = document.querySelector(`#cityList option[value='${searchQuery.value}']`);
    if (selectedOption) {
        const lat = selectedOption.dataset.lat;
        const lon = selectedOption.dataset.lon;
        updateMap(lat, lon, searchQuery.value);
    } else {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon, display_name } = data[0];
                    updateMap(lat, lon, display_name);
                } else {
                    alert("Location not found. Please enter a valid city.");
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                alert("Failed to fetch location. Please try again.");
            });
    }
    searchQuery.value = ''; // Reset input after search
}

function updateMap(lat, lon, locationName) {
    locationInfo.textContent = `Latitude: ${lat} | Longitude: ${lon}`;
    map.setView([lat, lon], 12);
    L.marker([lat, lon]).addTo(map).bindPopup(`<b>${locationName}</b>`).openPopup();
}

const map = L.map("map").setView([9.0331, 38.7501], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

document.getElementById("searchButton").addEventListener("click", function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(searchLocation, 500); // Adjust debounce delay as needed
});

//


//BELOW IS A FIRST SLIDE SHOW FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
    // Sample default slides (for testing purposes)
    let defaultSlides = [
        { category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", contact: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", contact: "09...", city: "Addis Ababa" },
        { category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", contact: "09...", city: "Adama" },
        { category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", contact: "0904222324", city: "Hawassa" },
        { category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", contact: "09...", city: "Bahir Dar" },
        { category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", contact: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Ozon Medium Clinc", service: "General Health", location: "Assosa", contact: "09...", city: "Assosa" }
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


// This under code will be used during deploying
/*
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

*/
/*document.addEventListener("DOMContentLoaded", function () {
    const selectCategory = document.getElementById("selectCategory");

    selectCategory.addEventListener("change", function () {
        const selectedCategory = this.value;
        filterSlideshowByCategory(selectedCategory);
    });

    function filterSlideshowByCategory(category) {
        const slides = document.querySelectorAll("#slideshow .slide");

        slides.forEach(slide => {
            const categoryText = slide.querySelector("h3")?.textContent.toLowerCase();

            if (
                (category === "medicalService" && categoryText.includes("medical")) ||
                (category === "businessOrganizations" && categoryText.includes("business"))
            ) {
                slide.style.display = "block";
            } else if (category === "") {
                // Show all slides if "Select Category" is chosen
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }
}); */







document.addEventListener("DOMContentLoaded", function () {
    // Select form elements
    const typeSelect = document.getElementById("type");
    const medicalCategory = document.getElementById("medicalCategory");
    const businessCategory = document.getElementById("businessCategory");

    // Check if elements exist to prevent errors
    if (typeSelect && medicalCategory && businessCategory) {
        // Create input fields dynamically for "Other" selections
        const medicalOtherInput = document.createElement("input");
        medicalOtherInput.type = "text";
        medicalOtherInput.id = "medicalOther";
        medicalOtherInput.placeholder = "Specify Medical Category";
        medicalOtherInput.style.display = "none"; // Hidden by default

        const businessOtherInput = document.createElement("input");
        businessOtherInput.type = "text";
        businessOtherInput.id = "businessOther";
        businessOtherInput.placeholder = "Specify Business Category";
        businessOtherInput.style.display = "none"; // Hidden by default

        // Insert inputs after their respective select elements
        medicalCategory.parentNode.insertBefore(medicalOtherInput, medicalCategory.nextSibling);
        businessCategory.parentNode.insertBefore(businessOtherInput, businessCategory.nextSibling);

        // Event Listener for Type Selection (Enable/Disable categories)
        typeSelect.addEventListener("change", function () {
            if (typeSelect.value === "medical") {
                medicalCategory.disabled = false;
                businessCategory.disabled = true;
                businessCategory.value = ""; // Reset business category selection
                businessOtherInput.style.display = "none"; // Hide "Other" input for business
                businessOtherInput.required = false;
            } else if (typeSelect.value === "business") {
                medicalCategory.disabled = true;
                businessCategory.disabled = false;
                medicalCategory.value = ""; // Reset medical category selection
                medicalOtherInput.style.display = "none"; // Hide "Other" input for medical
                medicalOtherInput.required = false;
            } else {
                // Reset both if no selection
                medicalCategory.disabled = true;
                businessCategory.disabled = true;
                medicalOtherInput.style.display = "none";
                businessOtherInput.style.display = "none";
            }
        });

        // Event Listener for Medical Category Selection
        medicalCategory.addEventListener("change", function () {
            if (medicalCategory.value === "other") {
                medicalOtherInput.style.display = "block";
                medicalOtherInput.required = true;
            } else {
                medicalOtherInput.style.display = "none";
                medicalOtherInput.required = false;
                medicalOtherInput.value = ""; // Clear input when not needed
            }
        });

        // Event Listener for Business Category Selection
        businessCategory.addEventListener("change", function () {
            if (businessCategory.value === "others") {
                businessOtherInput.style.display = "block";
                businessOtherInput.required = true;
            } else {
                businessOtherInput.style.display = "none";
                businessOtherInput.required = false;
                businessOtherInput.value = ""; // Clear input when not needed
            }
        });

        // Event Listener for Form Submission
        const registrationForm = document.getElementById("registrationForm");
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission for now (for demonstration)

            // Get the selected category value
            let medicalSelected = medicalCategory.value;
            let businessSelected = businessCategory.value;

            // Get the custom input values
            const customMedical = medicalOtherInput.value;
            const customBusiness = businessOtherInput.value;

            // Replace "Other" or "Others" with custom input if available
            if (medicalSelected === "other" && customMedical) {
                medicalSelected = customMedical; // Save the user-specified title for medical category
            }

            if (businessSelected === "others" && customBusiness) {
                businessSelected = customBusiness; // Save the user-specified title for business category
            }

            // Prepare the data to display in the model window
            const displayTitle = `Type: ${typeSelect.value === "medical" ? "Medical" : "Business"} | Category: ${medicalSelected || businessSelected}`;

            // Assume there's a modal window or an element where we want to display this data
            const modelWindow = document.getElementById("modelWindow"); // Your model window element
            if (modelWindow) {
                modelWindow.innerHTML = `<p>${displayTitle}</p>`;
            }

            // Log data for testing purposes (you can remove this later)
            console.log(displayTitle);
        });
    }
});



let advertMessages = [];
let noticeMessages = [];

let currentAdvertIndex = 0;
let currentNoticeIndex = 0;

let advertInterval;
let noticeInterval;

function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function openInNewWindow(message) {
    const newWindow = window.open("", "_blank", "width=400,height=300");
    newWindow.document.write(`<p style="font-family:sans-serif; padding:20px;">${message}</p>`);
}

function addAdvertMessage() {
    const input = document.getElementById("newAdvertMessage");
    const message = input.value.trim();
    if (message) {
        advertMessages.push(message);
        input.value = "";
        updateSlideshow('advert');
    }
}

function removeAdvert() {
    advertMessages.splice(currentAdvertIndex, 1);
    if (currentAdvertIndex >= advertMessages.length) {
        currentAdvertIndex = 0;
    }
    updateSlideshow('advert');
}

function addNoticeMessage() {
    const input = document.getElementById("newNoticeMessage");
    const message = input.value.trim();
    if (message) {
        noticeMessages.push(message);
        input.value = "";
        updateSlideshow('notice');
    }
}

function removeNotice() {
    noticeMessages.splice(currentNoticeIndex, 1);
    if (currentNoticeIndex >= noticeMessages.length) {
        currentNoticeIndex = 0;
    }
    updateSlideshow('notice');
}

function goToSlide(type, index) {
    if (type === 'advert') {
        currentAdvertIndex = index;
    } else {
        currentNoticeIndex = index;
    }
    updateSlideshow(type);
}

function updateSlideshow(type) {
    let messages, getIndex, setIndex, boxId, dotsId, intervalVarName;

    if (type === 'advert') {
        messages = advertMessages;
        getIndex = () => currentAdvertIndex;
        setIndex = val => currentAdvertIndex = val;
        boxId = "AdvertAd";
        dotsId = "advertDots";
        intervalVarName = "advertInterval";
    } else {
        messages = noticeMessages;
        getIndex = () => currentNoticeIndex;
        setIndex = val => currentNoticeIndex = val;
        boxId = "noticeAd";
        dotsId = "noticeDots";
        intervalVarName = "noticeInterval";
    }

    const box = document.getElementById(boxId);
    const dotContainer = document.getElementById(dotsId);

    function adjustFontSizeToFit(box) {
        const maxWidth = box.offsetWidth;
        const maxHeight = box.offsetHeight;
        const message = box.querySelector(".clickable-message");
        let fontSize = 50;
        message.style.fontSize = `${fontSize}px`;

        while (message.scrollWidth > maxWidth || message.scrollHeight > maxHeight) {
            fontSize -= 2;
            if (fontSize < 10) break;
            message.style.fontSize = `${fontSize}px`;
        }
    }

    function showMessage(index) {
        const msg = messages[index] || `No ${type === 'advert' ? 'Advertisements' : 'Notices'}`;
        const safeMessage = escapeHtml(msg);
        box.innerHTML = `<span class="clickable-message" onclick="openInNewWindow('${safeMessage}')">${safeMessage}</span>`;
        box.style.textAlign = 'justify';
        adjustFontSizeToFit(box);
    }

    showMessage(getIndex());

    // Reverse the dot order for right-to-left
    dotContainer.innerHTML = messages.map((msg, i) =>
        `<span class="dot ${i === getIndex() ? 'active' : ''}" onclick="goToSlide('${type}', ${i})">
            </span><span style="cursor:pointer; color:red;" onclick="deleteSpecificMessage('${type}', ${i})">❌</span>`
    ).reverse().join("");
    
    clearInterval(window[intervalVarName]);

    if (messages.length > 0) {
        window[intervalVarName] = setInterval(() => {
            const newIndex = (getIndex() + 1) % messages.length;
            setIndex(newIndex);
            showMessage(newIndex);

            dotContainer.innerHTML = messages.map((_, i) =>
                `<span class="dot ${i === newIndex ? 'active' : ''}" onclick="goToSlide('${type}', ${i})"></span>`
            ).reverse().join("");
        }, 3000);
    }
}
function deleteSpecificMessage(type, index) {
    if (type === 'advert') {
        advertMessages.splice(index, 1);
        if (currentAdvertIndex >= advertMessages.length) currentAdvertIndex = 0;
    } else {
        noticeMessages.splice(index, 1);
        if (currentNoticeIndex >= noticeMessages.length) currentNoticeIndex = 0;
    }
    updateSlideshow(type);
}


// Code for security

let isOwner = false;

// Check session status on load
window.onload = async function() {
    const res = await fetch('/check-owner');
    const data = await res.json();
    isOwner = data.isOwner;
    toggleOwnerUI(isOwner);
};

function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        // Clear inputs regardless of success
        usernameInput.value = "";
        passwordInput.value = "";

        if (data.success) {
            isOwner = true;
            toggleOwnerUI(true);
            alert("Logged in as owner");
        } else {
            alert("Login failed: " + data.message+" (for Owner only!)");
        }
    });
}

function logout() {
    fetch('/logout', { method: 'POST' })
    .then(() => {
        isOwner = false;
        toggleOwnerUI(false);

        // Clear input fields
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        alert("Logged out");
    });
}



// Update toggleOwnerUI to handle delete and send buttons
function toggleOwnerUI(isOwner) {
    const advertContainer = document.getElementById("advertInputContainer");
    const deleteAdvert = document.getElementById("deleteAdvertBtn");
    const noticeContainer = document.getElementById("noticeInputContainer");
    const deleteNotice = document.getElementById("deleteNoticeBtn");
    
    // Existing elements for advert and notice manipulation
    if (advertContainer) advertContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteAdvert) deleteAdvert.style.display = isOwner ? "inline-block" : "none";
    if (noticeContainer) noticeContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteNotice) deleteNotice.style.display = isOwner ? "inline-block" : "none";

    // New elements for stored data
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const sendBtns = document.querySelectorAll('.send-btn');
    
    deleteBtns.forEach(btn => btn.style.display = isOwner ? "inline-block" : "none");
    sendBtns.forEach(btn => btn.style.display = isOwner ? "inline-block" : "none");
}


// --- Initialize Socket.IO connection ---
const socket = io();

// --- Update time for small screen (optional) ---
function updateMessageTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const timeSpan = document.querySelector(".message-time");

    if (timeSpan) {
        timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;

        // If the screen is small, adjust the text size dynamically
        if (window.innerWidth <= 768) {
            timeSpan.style.fontSize = '12px';
        } else {
            timeSpan.style.fontSize = '14px';
        }
    }
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return 'just now';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}

// --- Viewer Count ---
socket.on('viewerCountUpdate', (count) => {
    const viewerElement = document.getElementById('viewerCount');
    if (viewerElement) viewerElement.textContent = `Viewers: ${count}`;
});

// --- Follower Count and Follow Button ---
const followButtonHandler = function () {
    const followButton = document.getElementById('followBtn');
    if (followButton) {
        if (followButton.textContent === 'Follow') {
            socket.emit('follow');
            followButton.textContent = 'Unfollow';
            alert('You followed the website!');
        } else {
            socket.emit('unfollow');
            followButton.textContent = 'Follow';
            alert('You unfollowed the website!');
        }
    }
};

function attachFollowButtonListener() {
    const followButton = document.getElementById('followBtn');
    if (followButton) {
        followButton.removeEventListener('click', followButtonHandler);
        followButton.addEventListener('click', followButtonHandler);
    }
}
attachFollowButtonListener();

socket.on('followerCountUpdate', (count) => {
    const followerElement = document.getElementById('followerCount');
    if (followerElement) followerElement.textContent = `Followers: ${count}`;
});

// --- Active Chatters ---
// Generate username
const username = 'Guest' + Math.floor(Math.random() * 10000);

// Detect device info
const userAgent = navigator.userAgent || 'Unknown Device';
const deviceInfo = detectDevice(userAgent);

// Send username + device info to server
socket.emit('joinChat', { username, deviceInfo });

// Function to detect device from userAgent
function detectDevice(userAgent) {
    userAgent = userAgent.toLowerCase();
    if (userAgent.includes('iphone')) return 'iPhone';
    if (userAgent.includes('android')) return 'Android Phone';
    if (userAgent.includes('ipad')) return 'iPad';
    if (userAgent.includes('windows')) return 'Windows PC';
    if (userAgent.includes('mac')) return 'Mac';
    if (userAgent.includes('linux')) return 'Linux PC';
    return 'Unknown Device';
}

window.addEventListener('beforeunload', () => {
    socket.emit('leaveChat', username);
});

socket.on('activeChattersUpdate', (chatters) => {
    const chattersList = document.getElementById('chattersList');
    if (chattersList) {
        if (chatters.length > 0) {
            const formattedChatters = chatters.map(c => `${c.username} (${c.deviceInfo})`);
            chattersList.textContent = formattedChatters.join(', ');
        } else {
            chattersList.textContent = 'None';
        }
    }
});

// --- Chat Messaging System ---
document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("messageBox");
    const messageIcon = document.getElementById("messageIcon");
    const closeButton = document.querySelector(".message-button-close");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");
    const messageContent = document.getElementById("messageContent");

    messageIcon.addEventListener("click", () => {
        messageBox.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        messageBox.style.display = "none";
    });

    sendMessage.addEventListener("click", sendMainMessage);

    messageInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMainMessage();
        }
    });

    function sendMainMessage() {
        const text = messageInput.value.trim();
        if (text !== "") {
            const sender = username;
            const messageId = generateUniqueId();
            socket.emit("sendMessage", { text, messageId, sender });
            messageInput.value = "";
        }
    }

    function generateUniqueId() {
        return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    function createMessageElement(text, isReply = false, sender = 'Someone', messageId = '', timestamp = Date.now()) {
        const container = document.createElement('div');
        container.classList.add(isReply ? "comment" : "message-thread");
        container.setAttribute('data-message-id', messageId);
        container.setAttribute('data-timestamp', timestamp);

        const messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.textContent = isReply ? `${sender}: ${text}` : text;

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("message-time");
        timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;

        messageText.appendChild(timeSpan);
        container.appendChild(messageText);

        const buttonsWrapper = document.createElement("div");
        buttonsWrapper.classList.add("message-buttons");
        buttonsWrapper.style.display = "flex";
        buttonsWrapper.style.justifyContent = "flex-end";
        buttonsWrapper.style.gap = "5px";

        const replyBtn = document.createElement("button");
        replyBtn.textContent = "Reply...";
        replyBtn.classList.add("reply-button");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-button");

        buttonsWrapper.appendChild(replyBtn);
        buttonsWrapper.appendChild(editBtn);
        container.appendChild(buttonsWrapper);

        const replyBox = document.createElement("div");
        replyBox.classList.add("reply-box");
        replyBox.style.display = "none";

        const replyInput = document.createElement("textarea");
        replyInput.classList.add("reply-input");
        replyInput.placeholder = "Write a reply...";
        replyBox.appendChild(replyInput);

        const replySend = document.createElement("button");
        replySend.classList.add("reply-send");
        replySend.textContent = "Send Reply";
        replyBox.appendChild(replySend);

        container.appendChild(replyBox);

        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("replies-container");
        container.appendChild(repliesContainer);

        replyBtn.addEventListener("click", () => {
            replyBox.style.display = replyBox.style.display === "none" ? "block" : "none";
            replyInput.focus();
        });

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit your message:", text);
            if (newText !== null) {
                socket.emit('updateMessage', { newText, messageId });
            }
        });

        replyInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const replyText = replyInput.value.trim();
                if (replyText !== "") {
                    socket.emit('sendReply', { replyText, messageId });
                    replyInput.value = "";
                    replyBox.style.display = "none";
                }
            }
        });

        return container;
    }

    socket.on('newMessage', ({ text, sender, messageId, timestamp }) => {
        const newMessage = createMessageElement(text, false, sender, messageId, timestamp);
        messageContent.appendChild(newMessage);
    });

    socket.on('newReply', ({ replyText, sender, messageId, timestamp }) => {
        const reply = createMessageElement(replyText, true, sender, messageId, timestamp);
        const parentMessage = document.querySelector(`[data-message-id='${messageId}'] .replies-container`);
        if (parentMessage) {
            parentMessage.appendChild(reply);
        }
    });

    socket.on('updateMessage', ({ newText, messageId }) => {
        const messageElement = document.querySelector(`[data-message-id='${messageId}']`);
        if (messageElement) {
            const messageText = messageElement.querySelector('.message-text');
            if (messageText) {
                messageText.textContent = newText;
            }
        }
    });
});

// --- Update message times every 1 minute ---
setInterval(() => {
    const allMessages = document.querySelectorAll(".message-thread, .comment");
    allMessages.forEach(msg => {
        const timestamp = parseInt(msg.getAttribute('data-timestamp'), 10);
        const timeSpan = msg.querySelector(".message-time");
        if (timestamp && timeSpan) {
            timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;
        }
    });
}, 60000); // Every 60 seconds
