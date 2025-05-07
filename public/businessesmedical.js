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
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${escapeHtml(entry.name || "Entry Detail")}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: justify; }
                h2 { margin-top: 0; }
                p { margin: 8px 0; }
                .nav-buttons { display: flex; justify-content: space-between; margin-top: 30px; }
                button { padding: 8px 12px; }
            </style>
            <script>
                function goTo(type, index) {
                    window.opener.openDetailedEntryInNewWindow(type, index);
                    window.close();
                }
                function deleteThis(type, index) {
                    window.opener.deleteEntryFromPopup(type, index);
                    window.close();
                }
            </script>
        </head>
        <body>
            <h2>${escapeHtml(entry.name || "N/A")}</h2>
            <p><strong>Details:</strong> ${escapeHtml(entry.details || "N/A")}</p>
            <div class="nav-buttons">
                <button onclick="goTo('${type}', ${(index - 1 + storedDatas[type].length) % storedDatas[type].length})">← Previous</button>
                <button onclick="goTo('${type}', ${(index + 1) % storedDatas[type].length})">Next →</button>
            </div>
            ${isOwner ? `<button onclick="deleteThis('${type}', ${index})">Delete This Entry</button>` : ""}
        </body>
        </html>
    `;
    win.document.write(htmlContent);
    win.document.close();

    // Add arrow key navigation in the new window
    win.addEventListener('keydown', function (e) {
        const totalEntries = storedDatas[type].length;
        let newIndex = index;

        if (e.key === "ArrowRight") {
            newIndex = (index + 1) % totalEntries;
        } else if (e.key === "ArrowLeft") {
            newIndex = (index - 1 + totalEntries) % totalEntries;
        }

        if (newIndex !== index) {
            win.close();
            openDetailedEntryInNewWindow(type, newIndex);
        }
    });
}

    


    

let advertMessages = [];
let noticeMessages = [];
let storedDatas = { advert: [], notice: [] };

function saveSlideshowData() {
    fetch('/save-slideshow-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            advertMessages,
            noticeMessages,
            storedDatas
        })
    }).catch(err => console.error('Error saving slideshow data:', err));
}

function addAdvert(text, details) {
    advertMessages.push(`Name of Organization: ${text}\nDetails: ${details}`);
    storedDatas.advert.push({ name: text, details });
    /*updateSlideshow('advert');*/
    saveSlideshowData();
}



async function loadSlideshowData() {
    try {
        const res = await fetch('/get-slideshow-data');
        const data = await res.json();
        advertMessages = data.advertMessages || [];
        noticeMessages = data.noticeMessages || [];
        storedDatas = data.storedDatas || { advert: [], notice: [] };
        updateSlideshow('advert');
        updateSlideshow('notice');
    } catch (err) {
        console.error('Error loading slideshow data:', err);
    }
}

let currentAdvertIndex = 0;
let currentNoticeIndex = 0;
let advertInterval;
let noticeInterval;

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function deleteEntryFromPopup(type, index) {
    const messageArray = type === 'advert' ? advertMessages : noticeMessages;

    // Construct the message to remove using the storedDatas entry
    const entry = storedDatas[type][index];
    const messageToDelete = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;

    // Find and remove the exact message from the slideshow array
    const messageIndex = messageArray.indexOf(messageToDelete);
    if (messageIndex !== -1) {
        messageArray.splice(messageIndex, 1);
    }

    // Adjust current index if needed
    if (type === 'advert') {
        currentAdvertIndex = Math.min(currentAdvertIndex, messageArray.length - 1);
    } else {
        currentNoticeIndex = Math.min(currentNoticeIndex, messageArray.length - 1);
    }

    // If the slideshow array is now empty
    if (messageArray.length === 0) {
        alert(type === 'advert' ? "No Advertisement data Available" : "No Notice data Available");

        const slideshowContent = document.getElementById(type === 'advert' ? 'advertSlideshowContent' : 'noticeSlideshowContent');
        if (slideshowContent) slideshowContent.innerHTML = '';

        const dotsContainer = document.getElementById(type === 'advert' ? 'advertDotsContainer' : 'noticeDotsContainer');
        if (dotsContainer) dotsContainer.innerHTML = '';
    } else {
        updateSlideshow(type);
    }

    saveSlideshowData();
}


function goToSlide(type, index) {
    if (type === 'advert') currentAdvertIndex = index;
    else currentNoticeIndex = index;
    updateSlideshow(type);
}

function updateSlideshow(type) {
    let messages = type === 'advert' ? advertMessages : noticeMessages;
    let getIndex = () => (type === 'advert' ? currentAdvertIndex : currentNoticeIndex);
    let setIndex = val => type === 'advert' ? currentAdvertIndex = val : currentNoticeIndex = val;
    let boxId = type === 'advert' ? "AdvertAd" : "noticeAd";
    let dotsId = type === 'advert' ? "advertDots" : "noticeDots";

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

        const entryIndex = storedDatas[type].findIndex(entry => {
            const fullContent = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;
            return fullContent === msg;
        });

        box.innerHTML = `<span class="clickable-message" onclick="${entryIndex !== -1
            ? `openDetailedEntryInNewWindow('${type}', ${entryIndex})`
            : `openInNewWindow('${safeMessage}')`}">${safeMessage}</span>`;
        box.style.textAlign = 'justify';
        adjustFontSizeToFit(box);
    }

    showMessage(getIndex());
    clearInterval(type === 'advert' ? advertInterval : noticeInterval);

    if (messages.length > 0) {
        const intervalId = setInterval(() => {
            const newIndex = (getIndex() + 1) % messages.length;
            setIndex(newIndex);
            showMessage(newIndex);

            dotContainer.innerHTML = messages.map((_, i) =>
                `<span class="dot ${i === newIndex ? 'active' : ''}" onclick="goToSlide('${type}', ${i})"></span>`
            ).join("");
        }, 5000);

        if (type === 'advert') advertInterval = intervalId;
        else noticeInterval = intervalId;
    }
}

function sendStoredData(type, index) {
    const entry = storedDatas[type][index];
    const messageContent = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;

    if (type === 'advert' && !advertMessages.includes(messageContent)) {
        advertMessages.push(messageContent);
    } else if (type === 'notice' && !noticeMessages.includes(messageContent)) {
        noticeMessages.push(messageContent);
    }

    updateSlideshow(type);
    saveSlideshowData();
    alert(`${entry.name || "This entry"} has been sent to the slideshow.`);
    showStoredDatas(type);
}

function showStoredDatas(type) {
    const modals = document.getElementById("dataModal");
    const modalsContent = document.getElementById("modalContent");
    modalsContent.innerHTML = "";

    if (storedDatas[type].length > 0) {
        storedDatas[type].forEach((entry, index) => {
            modalsContent.innerHTML += `
                <h4>Entry ${index + 1}</h4>
                <p><strong>Name:</strong> ${entry.name || "N/A"}</p>
                <p><strong>Details:</strong> <span id="details-${type}-${index}">${shortenText(entry.details)}</span> 
                    <a href="#" onclick="toggleDetailsStored('${type}', ${index}); return false;" id="toggle-${type}-${index}">more...</a>
                </p>
                ${isOwner ? `
                    <button class="delete-btn" onclick="deleteStoredData('${type}', ${index})">Delete</button>
                    <button class="send-btn" onclick="sendStoredData('${type}', ${index})">Send</button>
                ` : ""}
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
    const words = text.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
}

function toggleDetailsStored(type, index) {
    const detailsElement = document.getElementById(`details-${type}-${index}`);
    const toggleElement = document.getElementById(`toggle-${type}-${index}`);
    const fullText = storedDatas[type][index].details || "N/A";

    if (detailsElement.innerText.includes("...")) {
        detailsElement.innerText = fullText;
        toggleElement.innerText = "less...";
    } else {
        detailsElement.innerText = shortenText(fullText);
        toggleElement.innerText = "more...";
    }
}

function deleteStoredData(type, index) {
    if (confirm("Are you sure you want to delete this entry?")) {
        storedDatas[type].splice(index, 1);
        saveSlideshowData();
        showStoredDatas(type);
        updateSlideshow(type);
    }
}

function handleFormSubmit(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    storedDatas[type].push(formObject);

    saveSlideshowData();
    alert(`Form submitted under: ${type === "advert" ? "Advertises" : "Notices"}`);
    event.target.reset();
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("advertForm")?.addEventListener("submit", e => handleFormSubmit(e, "advert"));
    document.getElementById("noticeForm")?.addEventListener("submit", e => handleFormSubmit(e, "notice"));
    document.querySelector(".select-advert-notice")?.addEventListener("change", function () {
        showStoredDatas(this.value);
    });

    document.querySelector(".modal-close").addEventListener("click", () => {
        document.getElementById("dataModal").style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("dataModal")) {
            document.getElementById("dataModal").style.display = "none";
        }
    });

    loadSlideshowData();
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
        { category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", contact_info: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", contact_info: "09...", city: "Addis Ababa" },
        { category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", contact_info: "09...", city: "Adama" },
        { category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", contact_info: "0904222324", city: "Hawassa" },
        { category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", contact_info: "09...", city: "Bahir Dar" },
        { category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", contact_info: "09...", city: "Addis Ababa" },
        { category: "Medical", name: "Ozon Medium Clinc", service: "General Health", location: "Assosa", contact_info: "09...", city: "Assosa" }
    ];

    let storedMedicalData = [];
    let storedBusinessData = [];

    let slideIndex = 0;
    let selectedCity = localStorage.getItem("selectedCity") || "All Cities";

    const socket = io();

    const medicalCategorySelect = document.getElementById("medicalCategory");
    const businessCategorySelect = document.getElementById("businessCategory");

    // Restore original options for the category dropdowns
    function initializeCategoryDropdowns() {
        medicalCategorySelect.innerHTML = `
            <option value="" disabled selected>Select Medical Category</option>
            <option value="general">General Health Service</option>
            <option value="dental">Dental Health Service</option>
            <option value="eye">Eye Medication</option>
            <option value="heart">Heart Health service</option>
            <option value="kidney">Kidney Health Service</option>
            <option value="other">Other(Specify)</option>
        `;
        
        businessCategorySelect.innerHTML = `
            <option value="" disabled selected>Select business Category</option>
            <option value="consulting">Consulting Service</option>
            <option value="internationalHotel">International Hotel Services</option>
            <option value="noninternationalHotel">Non-International Hotel Service</option>
            <option value="factoryproduct">Factory Products</option>
            <option value="importer">Importers</option>
            <option value="others">Other(Specify)</option>
        `;
    }

    // Call this function at the start to restore options
    initializeCategoryDropdowns();

    function fetchStoredData() {
        fetch('/get-stored-data')
            .then(response => response.json())
            .then(data => {
                storedMedicalData = data.medical || [];
                storedBusinessData = data.business || [];
                cycleSlides();  // Run slideshow with real data
            })
            .catch(error => {
                console.error("Failed to fetch stored data:", error);
                cycleSlides();  // Fallback to default if fetch fails
            });
    }
    
    

    function saveStoredData() {
        fetch('/save-stored-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                medical: storedMedicalData,
                business: storedBusinessData
            })
        })
        .then(res => res.json())
        .then(data => console.log("Data saved successfully:", data))
        .catch(error => console.error("Error saving data:", error));
    }
    

    function showSlides(data) {
        const slideshow = document.getElementById("slideshow");
        const dotContainer = document.getElementById("dotContainer");
        const slideInfo = document.getElementById("slideInfo");

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
                <p><strong>Service:</strong> ${slideData.industryOrService || slideData.service}</p>
                <p><strong>Location:</strong> ${slideData.location}</p>
                <p><strong>City:</strong> ${slideData.city}</p>
                <p><strong>Contact:</strong> ${slideData.contact_info || slideData.contact}</p>
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
        let slides = [...storedMedicalData, ...storedBusinessData].filter(slide =>
            slide.city === selectedCity || selectedCity === "All Cities"
        );

        if (slides.length === 0) {
            slides = defaultSlides.filter(slide =>
                slide.city === selectedCity || selectedCity === "All Cities"
            ).map(slide => ({ ...slide, default: true }));
        }

        showSlides(slides);
        slideIndex = (slideIndex + 1) % (slides.length || 1);
    }

    setInterval(cycleSlides, 3000);

    document.querySelector(".category-close").addEventListener("click", () => {
        document.getElementById("categoryDataModal").style.display = "none";
    });

    document.getElementById("cityFilter").addEventListener("change", function () {
        selectedCity = this.value;
        localStorage.setItem("selectedCity", selectedCity);
        cycleSlides();
    });

    function renderStoredData(type) {
        const isMedical = type === "medical";
        const dataArray = isMedical ? storedMedicalData : storedBusinessData;

        const subcategorySelect = isMedical
            ? document.getElementById("medicalCategoryFilter")
            : document.getElementById("businessCategoryFilter");

        const selectedSubcategory = subcategorySelect.value;

        const filteredData = selectedSubcategory === "All" || selectedSubcategory.includes("Select")
            ? dataArray
            : dataArray.filter(entry => entry.category === selectedSubcategory);

        let details = `<h3>${isMedical ? "Medical Services" : "Business Organizations"}</h3>`;

        if (filteredData.length > 0) {
            filteredData.forEach((entry, index) => {
                details += `
                    <div class="user-entry" data-index="${index}">
                        <p><strong>Name:</strong> ${entry.name}</p>
                        <p><strong>Industry/Service:</strong> ${entry.industryOrService}</p>
                        <p><strong>Location:</strong> ${entry.location}</p>
                        <p><strong>City:</strong> ${entry.city}</p>
                        <p><strong>Contact:</strong> ${entry.contact_info}</p>
                     
                        ${isOwner ? `
                            <button class="delBtn" data-type="${type}" data-index="${index}">Delete</button>
                            
                        ` : ""}
                        <hr>
                    
                        <hr>
                    </div>
                `;
            });
        } else {
            details += "<p>No data available.</p>";
        }

        document.getElementById("categoryModalDetails").innerHTML = details;
        document.getElementById("categoryDataModal").style.display = "block";

        document.querySelectorAll(".delBtn").forEach(button => {
            button.addEventListener("click", function () {
                const entryType = this.dataset.type;
                const index = parseInt(this.dataset.index);
        
                if (confirm("Are you sure you want to delete this entry?")) {
                    if (entryType === "medical") {
                        storedMedicalData.splice(index, 1);
                    } else {
                        storedBusinessData.splice(index, 1);
                    }
        
                    saveStoredData();
                    cycleSlides();
                    renderStoredData(entryType);
                }
            });
        
           
        });
        
    }

    document.getElementById("medicalCategoryFilter").addEventListener("change", () => renderStoredData("medical"));
    document.getElementById("businessCategoryFilter").addEventListener("change", () => renderStoredData("business"));

    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const type = document.getElementById("type").value;
        const category = (type === "medical")
            ? document.getElementById("medicalCategory").value
            : document.getElementById("businessCategory").value;
        const industryOrService = document.getElementById("industryOrService").value;
        const licenseNumber = document.getElementById("licenseNumber").value;
        const location = document.getElementById("location").value;
        const contact_info = document.getElementById("contact_info").value;
        const city = document.getElementById("regionFilter").value;

        if (category.includes("Select")) {
            alert("Please select a valid category.");
            return;
        }

        const newEntry = {
            name,
            category,
            industryOrService,
            licenseNumber,
            location,
            contact_info,
            city
        };

        if (type === "medical") {
            storedMedicalData.push(newEntry);
        } else {
            storedBusinessData.push(newEntry);
        }

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
        initializeCategoryDropdowns();  // Reinitialize dropdown options after form reset
        cycleSlides();
    });

    fetchStoredData(); // Load stored data on startup
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
