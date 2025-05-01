const myHeader = document.querySelector('h1');
if (myHeader) {
    const originalText = myHeader.textContent;
    const updatedText = "Medical & Business Directory";
    myHeader.addEventListener('mouseover', function() {
        myHeader.textContent = updatedText;
    });
    myHeader.addEventListener('mouseout', function() {
        myHeader.textContent = originalText;
    });
}


//
document.addEventListener("DOMContentLoaded", function () {
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
            console.log("Changing language to:", selectedLanguage);

            document.getElementById("pageTitle").textContent = translations[selectedLanguage].title;
            document.getElementById("searchQuery").placeholder = translations[selectedLanguage].searchPlaceholder;
            document.getElementById("registerTitle").textContent = translations[selectedLanguage].registerTitle;
            document.getElementById("name").placeholder = translations[selectedLanguage].namePlaceholder;
            document.getElementById("industryOrService").placeholder = translations[selectedLanguage].industryPlaceholder;
            document.getElementById("location").placeholder = translations[selectedLanguage].locationPlaceholder;
            document.getElementById("contact_info").placeholder = translations[selectedLanguage].contactPlaceholder;
            document.getElementById("register").textContent = translations[selectedLanguage].registerButton;
            
            // Optionally save the language choice in localStorage
            localStorage.setItem('selectedLanguage', selectedLanguage);
        } else {
            console.error("Translation for language not found:", selectedLanguage);
        }
    }

    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
    }

    // Initialize language on page load
    changeLanguage();

    // Add event listener to dropdown
    languageSelect.addEventListener("change", changeLanguage);
});
       
//This below is the Adverte or Notice elements window display, and window close functionality in Advertisement Link

document.addEventListener("DOMContentLoaded", function() {
    var adverteModal = document.getElementById("adverteModal");
    var noticeModal = document.getElementById("noticeModal");

    // Get the links that open the modals
    var adverteLink = document.querySelector(".adverte-link");
    var noticeLink = document.querySelector(".notice-link");

    // Get the close buttons
    var closeAdverte = document.getElementById("close-adverte");
    var closeNotice = document.getElementById("close-notice");

    // When the user clicks on the "Adverte" link, open the adverte modal
    if (adverteLink) {
        adverteLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            adverteModal.style.display = "block";
        });
    }

    // When the user clicks on the "Notice" link, open the notice modal
    if (noticeLink) {
        noticeLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            noticeModal.style.display = "block";
        });
    }

    // When the user clicks on the close button for adverte modal, close it
    if (closeAdverte) {
        closeAdverte.addEventListener("click", function() {
            adverteModal.style.display = "none";
        });
    }

    // When the user clicks on the close button for notice modal, close it
    if (closeNotice) {
        closeNotice.addEventListener("click", function() {
            noticeModal.style.display = "none";
        });
    }

    // Optionally close modals when clicking outside the modal
    window.addEventListener("click", function(event) {
        if (event.target === adverteModal) {
            adverteModal.style.display = "none";
        } else if (event.target === noticeModal) {
            noticeModal.style.display = "none";
        }
    });
});



function openDetailedEntryInNewWindow(type, index) {
    const entry = storedDatas[type][index];
    if (!entry) return;

    const win = window.open('', '_blank', 'width=600,height=500');
    win.document.write(`
        <html>
        <head>
            <title>${entry.name || "Entry Detail"}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    text-align: justify;
                }
                h2 { margin-top: 0; }
                p { margin: 8px 0; }
            </style>
        </head>
        <body>
            <h2>${entry.name || "N/A"}</h2>
            <p><strong>Details:</strong> ${entry.details || "N/A"}</p>
            
        </body>
        </html>
    `);
    win.document.close();
}

    
// Load storedDatas and messages from localStorage
let storedDatas = JSON.parse(localStorage.getItem("storedDatas")) || {
    advert: [],
    notice: []
};

let advertMessages = JSON.parse(localStorage.getItem("advertMessages")) || [];
let noticeMessages = JSON.parse(localStorage.getItem("noticeMessages")) || [];

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
    const safeMessage = escapeHtml(message);
    const newWindow = window.open("", "_blank", "width=400,height=300");

    if (newWindow) {
        newWindow.document.write(`<p style="font-family:sans-serif; padding:20px;">${safeMessage}</p>`);
        newWindow.document.close(); // Ensures the content is rendered
    } else {
        alert("Popup blocked. Please allow popups for this site.");
    }
}



function addAdvertMessage() {
    const input = document.getElementById("newAdvertMessage");
    const message = input.value.trim();
    if (message) {
        advertMessages.push(message);
        input.value = "";
        localStorage.setItem("advertMessages", JSON.stringify(advertMessages));
        updateSlideshow('advert');
    }
}

function removeAdvert() {
    advertMessages.splice(currentAdvertIndex, 1);
    if (currentAdvertIndex >= advertMessages.length) {
        currentAdvertIndex = 0;
    }
    localStorage.setItem("advertMessages", JSON.stringify(advertMessages));
    updateSlideshow('advert');
}

function addNoticeMessage() {
    const input = document.getElementById("newNoticeMessage");
    const message = input.value.trim();
    if (message) {
        noticeMessages.push(message);
        input.value = "";
        localStorage.setItem("noticeMessages", JSON.stringify(noticeMessages));
        updateSlideshow('notice');
    }
}

function removeNotice() {
    noticeMessages.splice(currentNoticeIndex, 1);
    if (currentNoticeIndex >= noticeMessages.length) {
        currentNoticeIndex = 0;
    }
    localStorage.setItem("noticeMessages", JSON.stringify(noticeMessages));
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
    
        // Match against storedDatas
        const entryIndex = storedDatas[type].findIndex(entry => {
            const fullContent = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;
            return fullContent === msg;
        });
    
        if (entryIndex !== -1) {
            box.innerHTML = `<span class="clickable-message" onclick="openDetailedEntryInNewWindow('${type}', ${entryIndex})">${safeMessage}</span>`;
        } else {
            box.innerHTML = `<span class="clickable-message" onclick="openInNewWindow('${safeMessage}')">${safeMessage}</span>`;
        }
    
        box.style.textAlign = 'justify';
        adjustFontSizeToFit(box);
    }
    

    showMessage(getIndex());

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
        localStorage.setItem("advertMessages", JSON.stringify(advertMessages));
    } else {
        noticeMessages.splice(index, 1);
        if (currentNoticeIndex >= noticeMessages.length) currentNoticeIndex = 0;
        localStorage.setItem("noticeMessages", JSON.stringify(noticeMessages));
    }
    updateSlideshow(type);

    storedDatas[type].splice(index, 1);
    localStorage.setItem("storedDatas", JSON.stringify(storedDatas));
}

// Handle form submission
function handleFormSubmit(event, type) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let formObject = Object.fromEntries(formData);

    storedDatas[type].push(formObject);
    localStorage.setItem("storedDatas", JSON.stringify(storedDatas));

    alert(`Form submitted under: ${type === "advert" ? "Advertises" : "Notices"}`);
    event.target.reset();
}

// Attach event listeners to forms after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    let advertForm = document.getElementById("adverteForm");
    let noticeForm = document.getElementById("noticeForm");

    if (advertForm) {
        advertForm.addEventListener("submit", function (event) {
            handleFormSubmit(event, "advert");
        });
    }

    if (noticeForm) {
        noticeForm.addEventListener("submit", function (event) {
            handleFormSubmit(event, "notice");
        });
    }

    document.querySelector(".select-advert-notice").addEventListener("change", function () {
        let selectedOption = this.value;
        showStoredDatas(selectedOption);
    });

    updateSlideshow('advert');
    updateSlideshow('notice');
});

function sendStoredData(type, index) {
    const entry = storedDatas[type][index];
    const messageContent = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;

    // Add to slideshow messages
    if (type === 'advert') {
        advertMessages.push(messageContent);
        localStorage.setItem("advertMessages", JSON.stringify(advertMessages));
        updateSlideshow('advert');
    } else if (type === 'notice') {
        noticeMessages.push(messageContent);
        localStorage.setItem("noticeMessages", JSON.stringify(noticeMessages));
        updateSlideshow('notice');
    }

    // Don't remove from stored data. The entry will remain there unless explicitly deleted.
    alert(`${entry.name || "This entry"} has been sent to the slideshow.`);

    // Refresh stored data view
    showStoredDatas(type);
}

function showStoredDatas(type) {
    let modals = document.getElementById("dataModal");
    let modalsContent = document.getElementById("modalContent");

    modalsContent.innerHTML = "";

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

    modals.style.display = "flex";
}

function shortenText(text) {
    if (!text) return "N/A";
    let words = text.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
}

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

function deleteStoredData(type, index) {
    let confirmation = confirm("Are you sure you want to delete this entry?");
    if (confirmation) {
        storedDatas[type].splice(index, 1);
        localStorage.setItem("storedDatas", JSON.stringify(storedDatas));
        showStoredDatas(type);
        updateSlideshow(type);
    }
}

document.querySelector(".modal-close").addEventListener("click", function () {
    document.getElementById("dataModal").style.display = "none";
});

window.addEventListener("click", function (event) {
    let modal = document.getElementById("dataModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});




 // Array to hold previously selected or searched cities
let searchedCities = [];

// Function to handle location search
function searchLocation() {
    const userInput = searchQuery.value.trim();
    const selectedOption = document.querySelector(`#cityList option[value='${userInput}']`);

    if (selectedOption) {
        const lat = selectedOption.dataset.lat;
        const lon = selectedOption.dataset.lon;
        updateMap(lat, lon, userInput);
        addToSearchedCities(userInput);  // Add to the searched list
    } else {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${userInput}`)
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
                    addToSearchedCities(display_name);  // Add to the searched list
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

// Add the searched city to the list
function addToSearchedCities(cityName) {
    if (!searchedCities.includes(cityName)) {
        searchedCities.push(cityName);
    }
    console.log('Searched Cities:', searchedCities);  // For debugging
}

// Map update function
function updateMap(lat, lon, locationName) {
    locationInfo.textContent = `Latitude: ${lat} | Longitude: ${lon}`;
    map.setView([lat, lon], 12);
    L.marker([lat, lon]).addTo(map).bindPopup(`<b>${locationName}</b>`).openPopup();
}

// Initialize map with default coordinates
const map = L.map("map").setView([9.0331, 38.7501], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Search button with debounce functionality
document.getElementById("searchButton").addEventListener("click", function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(searchLocation, 500); // Adjust debounce delay as needed
});





document.addEventListener("DOMContentLoaded", function () {
    const defaultSlides = [
        { category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", contact: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", contact: "09...", city: "Addis Ababa" },
        { category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", contact: "09...", city: "Adama" },
        { category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", contact: "0904222324", city: "Hawassa" },
        { category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", contact: "09...", city: "Bahir Dar" },
        { category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", contact: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Ozon Medium Clinc", service: "General Health", location: "Assosa", contact: "09...", city: "Assosa" }
    ];

    let slideIndex = 0;
    let selectedCity = localStorage.getItem("selectedCity") || "All Cities";
    let storedData = { medical: {}, business: {} };

    const socket = io();

    // Fetch the stored data from the server when the page loads
    function fetchStoredData() {
        fetch('/get-stored-data')
            .then(response => response.json())
            .then(data => {
                storedData = data || { medical: {}, business: {} };
                cycleSlides();
            });
    }

    function saveStoredData() {
        fetch('/save-stored-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storedData)
        })
        .then(response => response.json())
        .then(data => console.log('Data saved successfully:', data))
        .catch(error => console.error('Error saving data:', error));
    }

    function showSlides(data) {
        const slideshow = document.getElementById("slideshow");
        const dotContainer = document.getElementById("dotContainer");
        const slideInfo = document.getElementById("slideInfo");

        if (!slideshow) {
            console.error("Slideshow container not found!");
            return;
        }

        slideshow.innerHTML = "";
        dotContainer.innerHTML = "";

        if (slideInfo) {
            slideInfo.textContent = data[0]?.default ? "Showing default slides (no stored data found)" : "";
        }

        data.forEach((slideData, index) => {
            const slide = document.createElement("div");
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

            const dot = document.createElement("span");
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
        let hasStoredContent = false;

        for (let category in storedData) {
            for (let subCategory in storedData[category]) {
                if (storedData[category][subCategory].length > 0) {
                    hasStoredContent = true;
                    storedData[category][subCategory].forEach(entity => {
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
        }

        if (!hasStoredContent || newSlides.length === 0) {
            newSlides = defaultSlides.filter(slide => slide.city === selectedCity || selectedCity === "All Cities")
                .map(slide => ({ ...slide, default: true })); // tag for info message
        }

        showSlides(newSlides);
        slideIndex = (slideIndex + 1) % (newSlides.length || 1);
    }

    setInterval(cycleSlides, 3000);

    // Show category modal
    function showCategoryModal(detailsHtml) {
        const modal = document.getElementById("categoryDataModal");
        const modalDetails = document.getElementById("categoryModalDetails");
        modalDetails.innerHTML = detailsHtml;
        modal.style.display = "block";
    }

    // Render data for a selected category
    function renderStoredData(type, selectedCategory) {
        let details = `<h3>${selectedCategory}</h3>`;

        if (storedData[type][selectedCategory] && storedData[type][selectedCategory].length > 0) {
            storedData[type][selectedCategory].forEach((user, index) => {
                details += `
                    <div class="user-entry" data-index="${index}">
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Industry/Service:</strong> ${user.industryOrService}</p>
                        <p><strong>Location:</strong> ${user.location}</p>
                        <p><strong>City:</strong> ${user.city}</p>
                        <p><strong>Contact:</strong> ${user.contact_info}</p>
                        <button class="delBtn" data-index="${index}" data-type="${type}" data-category="${selectedCategory}">Delete</button>
                        <hr>
                    </div>
                `;
            });
        } else {
            details += "<p>No data available.</p>";
        }

        showCategoryModal(details);

        document.querySelectorAll(".delBtn").forEach(button => {
            button.addEventListener("click", function () {
                const type = this.dataset.type;
                const category = this.dataset.category;
                const index = parseInt(this.dataset.index);

                if (confirm("Are you sure you want to delete this entry?")) {
                    storedData[type][category].splice(index, 1);

                    if (storedData[type][category].length === 0) {
                        delete storedData[type][category];
                    }

                    saveStoredData();
                    cycleSlides();
                    renderStoredData(type, category);
                }
            });
        });
    }

    function setupFilterEvent(filterId, type) {
        document.getElementById(filterId).addEventListener("change", function () {
            const selectedCategory = this.value;
            renderStoredData(type, selectedCategory);
        });
    }

    document.querySelector(".category-close").addEventListener("click", function () {
        document.getElementById("categoryDataModal").style.display = "none";
    });

    document.getElementById("cityFilter").addEventListener("change", function () {
        selectedCity = this.value;
        localStorage.setItem("selectedCity", selectedCity);
        cycleSlides();
    });

    setupFilterEvent("medicalCategoryFilter", "medical");
    setupFilterEvent("businessCategoryFilter", "business");

    // Registration form submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const type = document.getElementById("type").value;
        const category = (type === "medical") ? document.getElementById("medicalCategory").value : document.getElementById("businessCategory").value;
        const industryOrService = document.getElementById("industryOrService").value;
        const licenseNumber = document.getElementById("licenseNumber").value;
        const location = document.getElementById("location").value;
        const contact_info = document.getElementById("contact_info").value;
        const city = document.getElementById("regionFilter").value;

        if (category === "Select Medical Category" || category === "Select Business Category") {
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

        saveStoredData();

        const filterDropdown = (type === "medical") ? document.getElementById("medicalCategoryFilter") : document.getElementById("businessCategoryFilter");
        if (!filterDropdown.querySelector(`option[value="${category}"]`)) {
            const newOption = document.createElement("option");
            newOption.value = category;
            newOption.textContent = category;
            filterDropdown.appendChild(newOption);
        }

        alert("Registration successful!");
        this.reset();
        cycleSlides();
    });

    fetchStoredData();
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





// Security Code for owner check
let isOwner = false;

// Check session status on load
window.onload = async function () {
    const res = await fetch('/check-owner');
    const data = await res.json();
    isOwner = data.isOwner;
    toggleOwnerUI(isOwner);
};

// Login Function
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
                alert("Login failed: " + data.message + " (for Owner only!)");
            }
        });
}

// Logout Function
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

// Toggle UI based on Owner status
function toggleOwnerUI(isOwner) {
    const advertContainer = document.getElementById("advertInputContainer");
    const deleteAdvert = document.getElementById("deleteAdvertBtn");
    const noticeContainer = document.getElementById("noticeInputContainer");
    const deleteNotice = document.getElementById("deleteNoticeBtn");

    // Show elements for advert and notice manipulation
    if (advertContainer) advertContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteAdvert) deleteAdvert.style.display = isOwner ? "inline-block" : "none";
    if (noticeContainer) noticeContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteNotice) deleteNotice.style.display = isOwner ? "inline-block" : "none";

    // New elements for stored data management
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
            // Create textarea and buttons inside the message box
            const editTextarea = document.createElement("textarea");
            editTextarea.value = text; // Pre-fill with old text
            editTextarea.classList.add("edit-textarea");
        
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.classList.add("save-button");
        
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.classList.add("cancel-button");
        
            // Clear current messageText and buttons
            container.innerHTML = "";
            container.appendChild(editTextarea);
            container.appendChild(saveBtn);
            container.appendChild(cancelBtn);
        
            saveBtn.addEventListener("click", () => {
                const newText = editTextarea.value.trim();
                if (newText !== "") {
                    socket.emit('updateMessage', { newText, messageId });
        
                    // Update only the reply message on the UI (not the original message)
                    const updatedReply = createMessageElement(newText, true, sender, messageId, Date.now());
                    container.replaceWith(updatedReply); // Replace only the reply, not the original message
                }
            });
        
            cancelBtn.addEventListener("click", () => {
                // If cancel, recreate the original message element
                const restored = createMessageElement(text, isReply, sender, messageId, timestamp);
                container.replaceWith(restored);
            });
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

    // Receive all previous messages when joining
    socket.on('loadPreviousMessages', (messages) => {
        messages.forEach(({ text, sender, messageId, timestamp }) => {
            const oldMessage = createMessageElement(text, false, sender, messageId, timestamp);
            messageContent.appendChild(oldMessage);
        });
    });

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
        // Find the message element corresponding to the message ID
        const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    
        if (messageElement) {
            const messageText = messageElement.querySelector(".message-text");
    
            // Check if the element is a reply or a main message
            if (messageText) {
                // Check if the message is a reply
                const isReply = messageElement.classList.contains("comment");
    
                // If it is a reply, update the reply text only
                if (isReply) {
                    messageText.childNodes[0].nodeValue = newText; // Update the reply text only
                } else {
                    // If it's not a reply, we should not modify the original message
                    console.log("Cannot update the original message text, only replies.");
                }
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
}, 60000);
