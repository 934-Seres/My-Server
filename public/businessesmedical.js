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


let advertMessages = [];
let noticeMessages = [];
let storedDatas = { advert: [], notice: [] };
let currentAdvertIndex = 0;
let currentNoticeIndex = 0;
let advertInterval;
let noticeInterval;

// Simulated isOwner flag (replace with real session check)


function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function openDetailedEntryInNewWindow(type, index) {
    const entry = storedDatas[type][index];
    if (!entry) return;

    const safeTitle = escapeHtml(entry.name || "Entry Detail");
    const safeDetails = escapeHtml(entry.details || "N/A").replace(/\n/g, "<br>");
    const safeName = escapeHtml(entry.name || "N/A");

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${safeTitle}</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: justify; }
            h2 { margin-top: 0; }
            p { margin: 8px 0; }
            .nav-buttons { display: flex; justify-content: space-between; margin-top: 30px; }
            button { padding: 8px 12px; }
        </style>
        <script>
            const isOwner = ${isOwner};

            function goTo(type, index) {
                window.opener.openDetailedEntryInNewWindow(type, index);
                window.close();
            }
            function deleteThis(type, index) {
                window.opener.deleteEntryFromPopup(type, index);
                window.close();
            }

            window.addEventListener('keydown', function (e) {
                const total = window.opener.storedDatas[type].length;
                if (e.key === 'ArrowRight') {
                    goTo(type, (index + 1) % total);
                } else if (e.key === 'ArrowLeft') {
                    goTo(type, (index - 1 + total) % total);
                }
            });
        </script>
    </head>
    <body>
        <h2>${safeName}</h2>
        <p><strong>Details:</strong> ${safeDetails}</p>
        <div class="nav-buttons">
            <button onclick="goTo('${type}', ${(index - 1 + storedDatas[type].length) % storedDatas[type].length})">← Previous</button>
            <button onclick="goTo('${type}', ${(index + 1) % storedDatas[type].length})">Next →</button>
        </div>
        ${isOwner ? `<button onclick="deleteThis('${type}', ${index})">Delete This Entry</button>` : ""}
    </body>
    </html>`;

    const win = window.open('', '_blank', 'width=600,height=500');
    if (win) {
        win.document.write(htmlContent);
        win.document.close();
    } else {
        alert("Popup blocked. Please allow popups for this site.");
    }
}

function deleteEntryFromPopup(type, index) {
    const entry = storedDatas[type][index];
    if (!entry) return;

    const messageArray = type === 'advert' ? advertMessages : noticeMessages;

    // Match message by full content
    const messageToDelete = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;
    const messageIndex = messageArray.findIndex(msg => msg === messageToDelete);

    if (messageIndex !== -1) messageArray.splice(messageIndex, 1); // ✅ Only remove from slideshow

    // ❌ Do NOT delete from storedDatas[type]
    // storedDatas[type].splice(index, 1); <-- This is removed intentionally

    if (type === 'advert') {
        currentAdvertIndex = Math.max(0, currentAdvertIndex - 1);
    } else {
        currentNoticeIndex = Math.max(0, currentNoticeIndex - 1);
    }

    updateSlideshow(type);
    saveSlideshowData();
}


function addAdvert(text, details) {
    const entry = { id: Date.now(), name: text, details };
    advertMessages.push(`Name of Organization: ${text}\nDetails: ${details}`);
    storedDatas.advert.push(entry);
    saveSlideshowData();
}

function addNotice(text, details) {
    const entry = { id: Date.now(), name: text, details };
    noticeMessages.push(`Name of Organization: ${text}\nDetails: ${details}`);
    storedDatas.notice.push(entry);
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

function goToSlide(type, index) {
    if (type === 'advert') currentAdvertIndex = index;
    else currentNoticeIndex = index;
    updateSlideshow(type);
}
function adjustFontSizeToFit(box) {
    const maxWidth = box.offsetWidth;
    const maxHeight = box.offsetHeight;
    const message = box.querySelector(".clickable-message");
    if (!message) return;
    
    let fontSize = 50;
    message.style.fontSize = `${fontSize}px`;

    while (message.scrollWidth > maxWidth || message.scrollHeight > maxHeight) {
        fontSize -= 2;
        if (fontSize < 10) break;
        message.style.fontSize = `${fontSize}px`;
    }
}

function updateSlideshow(type) {
    let messages = type === 'advert' ? advertMessages : noticeMessages;
    let getIndex = () => (type === 'advert' ? currentAdvertIndex : currentNoticeIndex);
    let setIndex = val => type === 'advert' ? currentAdvertIndex = val : currentNoticeIndex = val;
    let boxId = type === 'advert' ? "AdvertAd" : "noticeAd";
    let dotsId = type === 'advert' ? "advertDots" : "noticeDots";

    const box = document.getElementById(boxId);
    const dotContainer = document.getElementById(dotsId);

    

    function showMessage(index) {
        const msg = messages[index] || `No ${type === 'advert' ? 'Advertisements' : 'Notices'}`;
        
        const safeMessage = escapeHtml(msg);      


        const entryIndex = storedDatas[type].findIndex(entry =>
            `Name of Organization: ${entry.name}\nDetails: ${entry.details}` === msg
        ); 
       

        box.innerHTML = `<span class="clickable-message" onclick="${
            entryIndex !== -1
                ? `openDetailedEntryInNewWindow('${type}', ${entryIndex})`
                : `alert('Entry not found or outdated.')`
        }">${safeMessage}</span>`;

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

    const messages = type === 'advert' ? advertMessages : noticeMessages;
    if (!messages.includes(messageContent)) {
        messages.push(messageContent);
    }

    updateSlideshow(type);
    saveSlideshowData();
    alert(`${entry.name || "This entry"} has been sent to the slideshow.`);
}

function saveSlideshowData() {
    fetch('/save-slideshow-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertMessages, noticeMessages, storedDatas })
    }).catch(err => console.error('Error saving slideshow data:', err));
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
                <p><strong>Details:</strong> 
                    <span id="details-${type}-${index}">${shortenText(entry.details)}</span> 
                    <button 
                        id="toggle-${type}-${index}" 
                        onclick="toggleDetailsStored('${type}', ${index})"
                        aria-expanded="false"
                        style="background:none;border:none;color:blue;cursor:pointer;text-decoration:underline;"
                    >more...</button>
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
    const detailsSpan = document.getElementById(`details-${type}-${index}`);
    const toggleBtn = document.getElementById(`toggle-${type}-${index}`);
    const entry = storedDatas[type][index];

    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    detailsSpan.innerText = isExpanded ? shortenText(entry.details) : entry.details;
    toggleBtn.innerText = isExpanded ? "more..." : "less...";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
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

function setupExpandableDetails(fieldId, toggleId) {
    const toggle = document.getElementById(toggleId);
    const container = toggle.closest(".details-container");

    toggle.addEventListener("click", toggleHandler);
    toggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleHandler();
        }
    });

    function toggleHandler() {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        if (!expanded) {
            // Expand to textarea
            const input = container.querySelector("input[name='details']");
            const textarea = document.createElement("textarea");
            textarea.name = "details";
            textarea.id = input.id;
            textarea.required = true;
            textarea.ariaLabel = input.ariaLabel;
            textarea.value = input.value;
            textarea.rows = 5;

            container.replaceChild(textarea, input);
            toggle.innerText = "less...";
            toggle.setAttribute("aria-expanded", "true");
        } else {
            // Collapse back to input
            const textarea = container.querySelector("textarea[name='details']");
            const input = document.createElement("input");
            input.type = "text";
            input.name = "details";
            input.id = textarea.id;
            input.required = true;
            input.placeholder = "Details:";
            input.ariaLabel = textarea.ariaLabel;
            input.value = textarea.value;

            container.replaceChild(input, textarea);
            toggle.innerText = "more...";
            toggle.setAttribute("aria-expanded", "false");
        }
    }
}

setupExpandableDetails("detailsAdvert", "moreDetailsAdvert");
setupExpandableDetails("detailsNotice", "moreDetailsNotice");



 // Array to hold previously selected or searched cities
let searchedCities = [];

function searchLocation() {
    const userInput = searchQuery.value.trim();
    const selectedOption = document.querySelector(`#cityList option[value='${userInput}']`);

    if (selectedOption) {
        const lat = selectedOption.dataset.lat;
        const lon = selectedOption.dataset.lon;
        updateMap(lat, lon, userInput);
        addToSearchedCities(userInput);  // Add to the searched list
    } else {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(userInput)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon, display_name } = data[0];
                    updateMap(lat, lon, display_name);
                    addToSearchedCities(display_name);  // Add to the searched list
                } else {
                    alert("Location not found. Please enter a valid city or organization.");
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                alert("Failed to fetch location. Please check your internet connection or try again later.");
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
        { category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", contact_info: "09...", city: "Addis Ababa", type: "business" },
        { category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", contact_info: "09...", city: "Addis Ababa", type: "medical" },
        { category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", contact_info: "09...", city: "Adama", type: "business" },
        { category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", contact_info: "0904222324", city: "Hawassa", type: "medical" },
        { category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", contact_info: "09...", city: "Bahir Dar", type: "business" },
        { category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", contact_info: "09...", city: "Addis Ababa", type: "medical" },
        { category: "Medical", name: "Ozon Medium Clinc", service: "General Health", location: "Assosa", contact_info: "09...", city: "Assosa", type: "medical" }
    ];

    let storedMedicalData = [];
    let storedBusinessData = [];
    let slideIndex = 0;
    let selectedCity = localStorage.getItem("selectedCity") || "All Cities";

    function formatRelativeTime(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 1) return "just now";
        if (diffInSeconds < 60) return `before ${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`;
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `before ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `before ${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;

        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = '<option value="">Select a category</option>';
        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt.toLowerCase();
            option.textContent = opt;
            dropdown.appendChild(option);
        });
    }

    async function fetchStoredData() {
        try {
            const res = await fetch('/get-stored-data');
            const data = await res.json();
            storedMedicalData = Array.isArray(data.storedMedicalData) ? data.storedMedicalData : [];
            storedBusinessData = Array.isArray(data.storedBusinessData) ? data.storedBusinessData : [];
            cycleSlides();
        } catch (err) {
            console.error("Error fetching stored data:", err);
        }
    }

    async function initializeCategoryDropdowns() {
        try {
            const res = await fetch('/get-categories');
            const data = await res.json();
            populateDropdown(document.getElementById("medicalCategory"), data.medical);
            populateDropdown(document.getElementById("businessCategory"), data.business);
        } catch (err) {
            console.error("Error loading categories:", err);
        }
    }

    function showSlides(data) {
        const slideshow = document.getElementById("slideshow");
        const dotContainer = document.getElementById("dotContainer");
        const slideInfo = document.getElementById("slideInfo");

        slideshow.innerHTML = "";
        dotContainer.innerHTML = "";

        if (slideInfo) {
            slideInfo.textContent = data[0]?.default ? "Showing default slides" : "";
        }

        data.forEach((entry, i) => {
            const slide = document.createElement("div");
            slide.className = "slide" + (i === slideIndex ? " active" : "");
            slide.innerHTML = `
                <h3>${entry.type === "medical" ? "Medical Service" : "Business Organization"}</h3>
                <p><strong>Name:</strong> ${entry.name}</p>
                <p><strong>Service:</strong> ${entry.service || entry.industryOrService || "N/A"}</p>
                <p><strong>Location:</strong> ${entry.location}</p>
                <p><strong>City:</strong> ${entry.city}</p>
                <p><strong>Contact:</strong> ${entry.contact_info || entry.contact}</p>
            `;
            slideshow.appendChild(slide);

            const dot = document.createElement("span");
            dot.className = "dot" + (i === slideIndex ? " active" : "");
            dot.onclick = () => {
                slideIndex = i;
                showSlides(data);
            };
            dotContainer.appendChild(dot);
        });
    }

    function cycleSlides() {
        let slides = [...storedMedicalData, ...storedBusinessData].filter(slide =>
            selectedCity === "All Cities" || slide.city === selectedCity
        );

        if (slides.length === 0) {
            slides = defaultSlides.filter(slide =>
                selectedCity === "All Cities" || slide.city === selectedCity
            ).map(slide => ({ ...slide, default: true }));
        }

        if (slides.length === 0) return;

        slideIndex = slideIndex % slides.length;

        showSlides(slides);
        slideIndex = (slideIndex + 1) % slides.length;
    }

    function renderStoredData(type) {
        const normalizedType = (type || "").toLowerCase();
        const isMedical = normalizedType === "medical";

        const modalDetails = document.getElementById("categoryModalDetails");
        const dataArr = isMedical ? storedMedicalData : storedBusinessData;
        const selectedCat = document.getElementById(isMedical ? "medicalCategoryFilter" : "businessCategoryFilter").value;

        const filtered = !selectedCat || selectedCat === "All"
            ? dataArr
            : dataArr.filter(e => e.category?.toLowerCase() === selectedCat.toLowerCase());

        let content = "";

        if (filtered.length === 0) {
            content += "<p>No data available.</p>";
        } else {
            filtered.forEach(entry => {
                const realIndex = dataArr.indexOf(entry);
                const heading = `<h3>${entry.type === "medical" ? "Medical Service" : "Business Organization"}</h3>`;
                const timeDisplay = entry.createdAt ? `<p><strong>Posted:</strong> ${formatRelativeTime(entry.createdAt)}</p>` : "";

                content += `
                    <div class="user-entry" data-index="${realIndex}">
                        ${heading}
                        <p><strong>Name:</strong> ${entry.name}</p>
                        <p><strong>Industry/Service:</strong> ${entry.industryOrService}</p>
                        <p><strong>Location:</strong> ${entry.location}</p>
                        <p><strong>City:</strong> ${entry.city}</p>
                        <p><strong>Contact:</strong> ${entry.contact_info}</p>
                        ${timeDisplay}
                        ${isOwner ? `<button class="delBtn" data-type="${normalizedType}" data-index="${realIndex}">Delete</button>` : ""}
                        <hr>
                    </div>
                `;
            });
        }

        modalDetails.innerHTML = content;
        document.getElementById("categoryDataModal").style.display = "block";
    }

    // Event Listeners
    document.querySelector(".category-close").onclick = () => {
        document.getElementById("categoryDataModal").style.display = "none";
    };

    document.getElementById("cityFilter").onchange = function () {
        selectedCity = this.value;
        localStorage.setItem("selectedCity", selectedCity);
        cycleSlides();
    };

    document.getElementById("medicalCategoryFilter").onchange = () => renderStoredData("medical");
    document.getElementById("businessCategoryFilter").onchange = () => renderStoredData("business");

    document.getElementById("categoryModalDetails").addEventListener("click", function (e) {
        if (e.target.classList.contains("delBtn")) {
            const type = e.target.dataset.type;
            const index = parseInt(e.target.dataset.index);
            const name = e.target.dataset.name || "this entry";

            if (confirm(`Are you sure to delete '${name}' ?`)) {
                if (type === "medical") storedMedicalData.splice(index, 1);
                else storedBusinessData.splice(index, 1);

                // Optional: Send delete to backend
                // await fetch(`/delete-${type}`, { method: 'POST', body: JSON.stringify({ id: ... }) });

                cycleSlides();
                renderStoredData(type);
            }
        }
    });

    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const type = document.getElementById("type").value;
        const category = type === "medical"
            ? document.getElementById("medicalCategory").value
            : document.getElementById("businessCategory").value;
        const industryOrService = document.getElementById("industryOrService").value;
        const licenseNumber = document.getElementById("licenseNumber").value;
        const location = document.getElementById("location").value;
        const contact_info = document.getElementById("contact_info").value;
        const city = document.getElementById("regionFilter").value;

        if (!name || !industryOrService || !location || !contact_info || !city) {
            alert("Please fill in all required fields.");
            return;
        }

        const newEntry = {
            name, category, industryOrService, licenseNumber, location, contact_info, city, type,
            createdAt: new Date().toISOString()
        };

        const endpoint = type === "medical" ? "/register-medical" : "/register-business";
        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry)
        }).catch(err => console.error("Could not reach server:", err));

        const targetArray = type === "medical" ? storedMedicalData : storedBusinessData;
        const exists = targetArray.some(entry =>
            entry.name.toLowerCase() === name.toLowerCase() &&
            entry.city.toLowerCase() === city.toLowerCase() &&
            entry.type === type
        );
        if (exists) {
            alert("This organization is already registered.");
            return;
        }

        targetArray.push(newEntry);

        const filterDropdown = type === "medical"
            ? document.getElementById("medicalCategoryFilter")
            : document.getElementById("businessCategoryFilter");

        if (!Array.from(filterDropdown.options).some(opt => opt.value.toLowerCase() === category.toLowerCase())) {
            const newOption = document.createElement("option");
            newOption.value = category;
            newOption.textContent = category;
            filterDropdown.appendChild(newOption);
        }

        alert("Registration successful!");
        this.reset();
        initializeCategoryDropdowns();
        cycleSlides();
    });

    initializeCategoryDropdowns();
    fetchStoredData();
    setInterval(cycleSlides, 3000);
});





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



let isOwner = false;

// Check session status on DOM load
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const res = await fetch('/check-owner');
        const data = await res.json();
        isOwner = data.isOwner;
        toggleOwnerUI(isOwner);
    } catch (err) {
        console.error("Error checking owner status:", err);
        alert("Failed to check login status. Please try again.");
    }
});

// Login Function
function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginButton");

    const username = usernameInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    loginBtn.disabled = true;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Login response:", data);
            usernameInput.value = "";
            passwordInput.value = "";

            if (data.success) {
                isOwner = true;
                toggleOwnerUI(true);
                alert("Logged in Successfully");
            } else {
                alert("Login failed: Invalid username or password.");
            }
        })
        .catch(err => {
            console.error("Login error:", err);
            alert("An error occurred during login.");
        })
        .finally(() => {
            loginBtn.disabled = false;
        });
}

// Logout Function
function logout() {
    fetch('/logout', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            console.log("Logout response:", data);
            if (data.success) {
                isOwner = false;
                toggleOwnerUI(false);

                const usernameInput = document.getElementById("username");
                const passwordInput = document.getElementById("password");

                if (usernameInput) usernameInput.value = "";
                if (passwordInput) passwordInput.value = "";

                alert("Logged out");
                window.location.reload(); // Optional for reset
            } else {
                alert("Logout failed.");
            }
        })
        .catch(err => {
            console.error('Logout error:', err);
            alert("An error occurred during logout.");
        });
}

// Toggle UI based on Owner status
function toggleOwnerUI(isOwner) {
    const advertContainer = document.getElementById("advertInputContainer");
    const deleteAdvert = document.getElementById("deleteAdvertBtn");
    const noticeContainer = document.getElementById("noticeInputContainer");
    const deleteNotice = document.getElementById("deleteNoticeBtn");

    if (advertContainer) advertContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteAdvert) deleteAdvert.style.display = isOwner ? "inline-block" : "none";
    if (noticeContainer) noticeContainer.style.display = isOwner ? "inline-block" : "none";
    if (deleteNotice) deleteNotice.style.display = isOwner ? "inline-block" : "none";

    const deleteBtns = document.querySelectorAll('.delete-btn');
    const sendBtns = document.querySelectorAll('.send-btn');

    deleteBtns.forEach(btn => btn.style.display = isOwner ? "inline-block" : "none");
    sendBtns.forEach(btn => btn.style.display = isOwner ? "inline-block" : "none");
}


// --- Initialize Socket.IO connection ---
const socket = io();

// --- Viewer Count ---
socket.on('viewerCountUpdate', (count) => {
    const viewerElement = document.getElementById('viewerCount');
    if (viewerElement) viewerElement.textContent = `Viewers: ${count}`;
});

// --- Follower Count and Follow Button ---
const followButtonHandler = function () {
    const followButton = document.getElementById('followBtn');
    if (followButton) {
        const isFollowing = followButton.textContent === 'Follow';
        socket.emit(isFollowing ? 'follow' : 'unfollow');
        followButton.textContent = isFollowing ? 'Unfollow' : 'Follow';
        alert(isFollowing ? 'You followed the website!' : 'You unfollowed the website!');
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

// --- Device & User Tracking ---
const username = 'Guest' + Math.floor(Math.random() * 10000);
const deviceInfo = detectDevice(navigator.userAgent);
socket.emit('joinChat', { username, deviceInfo });

window.addEventListener('beforeunload', () => {
    socket.emit('leaveChat', username);
});

function detectDevice(userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('android')) return 'Android Phone';
    if (ua.includes('ipad')) return 'iPad';
    if (ua.includes('windows')) return 'Windows PC';
    if (ua.includes('mac')) return 'Mac';
    if (ua.includes('linux')) return 'Linux PC';
    return 'Unknown Device';
}

// --- Active Chatters ---
socket.on('activeChattersUpdate', (chatters) => {
    const chattersList = document.getElementById('chattersList');
    if (chattersList) {
        chattersList.textContent = chatters.length > 0
            ? chatters.map(c => `${c.username} (${c.deviceInfo})`).join(', ')
            : 'None';
    }
});

// --- Messaging UI Setup ---
document.addEventListener("DOMContentLoaded", () => {
    const messageBox = document.getElementById("messageBox");
    const messageIcon = document.getElementById("messageIcon");
    const closeButton = document.querySelector(".message-button-close");
    const messageInput = document.getElementById("messageInput");
    const sendMessage = document.getElementById("sendMessage");
    const messageContent = document.getElementById("messageContent");

    messageIcon?.addEventListener("click", () => messageBox.style.display = "flex");
    closeButton?.addEventListener("click", () => messageBox.style.display = "none");

    sendMessage?.addEventListener("click", sendMainMessage);

    messageInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMainMessage();
        }
    });

    function sendMainMessage() {
        const text = messageInput?.value.trim();
        if (text) {
            socket.emit("sendMessage", {
                text,
                messageId: generateUniqueId(),
                sender: username
            });
            messageInput.value = "";
        }
    }

    function generateUniqueId() {
        return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // --- Render Messages & Replies ---
    function createMessageElement(text, isReply = false, sender = 'Someone', messageId = '', timestamp = Date.now()) {
        const container = document.createElement('div');
        container.classList.add(isReply ? "comment" : "message-thread");
        container.dataset.messageId = messageId;
        container.dataset.timestamp = timestamp;

        const messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.textContent = isReply ? `${sender}: ${text}` : text;

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("message-time");
        timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;
        messageText.appendChild(timeSpan);
        container.appendChild(messageText);

        // Buttons
        const buttonsWrapper = document.createElement("div");
        buttonsWrapper.classList.add("message-buttons");
        buttonsWrapper.style.cssText = "display: flex; justify-content: flex-end; gap: 5px;";

        const replyBtn = createButton("Reply...", "reply-button");
        const editBtn = createButton("Edit", "edit-button");
        const deleteBtn = createButton("Delete", "delete-button");

        if (isOwner) buttonsWrapper.appendChild(deleteBtn);
        buttonsWrapper.appendChild(replyBtn);
        buttonsWrapper.appendChild(editBtn);
        container.appendChild(buttonsWrapper);

        // Reply Box
        const replyBox = document.createElement("div");
        replyBox.classList.add("reply-box");
        replyBox.style.display = "none";

        const replyInput = document.createElement("textarea");
        replyInput.classList.add("reply-input");
        replyInput.placeholder = "Write a reply...";
        replyBox.appendChild(replyInput);

        const replySend = createButton("Send Reply", "reply-send");
        replyBox.appendChild(replySend);
        container.appendChild(replyBox);

        // Replies container
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("replies-container");
        container.appendChild(repliesContainer);

        // Event Handlers
        replyBtn.addEventListener("click", () => {
            replyBox.style.display = replyBox.style.display === "none" ? "block" : "none";
            replyInput.focus();
        });

        replyInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const replyText = replyInput.value.trim();
                if (replyText) {
                    socket.emit('sendReply', { replyText, messageId });
                    replyInput.value = "";
                    replyBox.style.display = "none";
                }
            }
        });

        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this message?")) {
                socket.emit('deleteMessage', { messageId });
                container.remove();
            }
        });

        editBtn.addEventListener("click", () => {
            const editTextarea = document.createElement("textarea");
            editTextarea.value = text;
            editTextarea.classList.add("edit-textarea");

            const saveBtn = createButton("Save", "save-button");
            const cancelBtn = createButton("Cancel", "cancel-button");

            container.innerHTML = "";
            container.append(editTextarea, saveBtn, cancelBtn);

            saveBtn.addEventListener("click", () => {
                const newText = editTextarea.value.trim();
                if (newText) {
                    socket.emit('updateMessage', { newText, messageId });
                    const updated = createMessageElement(newText, true, sender, messageId, Date.now());
                    container.replaceWith(updated);
                }
            });

            cancelBtn.addEventListener("click", () => {
                const restored = createMessageElement(text, isReply, sender, messageId, timestamp);
                container.replaceWith(restored);
            });
        });

        return container;
    }

    function createButton(text, className) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add(className);
        return btn;
    }

    // --- Message Socket Events ---
    socket.on('loadMessages', (messages) => {
        messageContent.innerHTML = '';
        messages.forEach(({ text, sender, messageId, timestamp, replies }) => {
            const messageEl = createMessageElement(text, false, sender, messageId, timestamp);
            messageContent.appendChild(messageEl);

            const replyContainer = messageEl.querySelector(".replies-container");
            replies?.forEach(({ replyText, sender: replySender, timestamp: replyTime }) => {
                const replyEl = createMessageElement(replyText, true, replySender, messageId, replyTime);
                replyContainer?.appendChild(replyEl);
            });
        });
    });

    socket.on('newMessage', ({ text, sender, messageId, timestamp }) => {
        const newMessage = createMessageElement(text, false, sender, messageId, timestamp);
        messageContent.appendChild(newMessage);
    });

    socket.on('newReply', ({ replyText, sender, messageId, timestamp }) => {
        const reply = createMessageElement(replyText, true, sender, messageId, timestamp);
        const parent = document.querySelector(`[data-message-id='${messageId}'] .replies-container`);
        parent?.appendChild(reply);
    });

    socket.on('updateMessage', ({ newText, messageId }) => {
        const msg = document.querySelector(`[data-message-id="${messageId}"]`);
        const textNode = msg?.querySelector(".message-text")?.childNodes[0];
        if (msg?.classList.contains("comment") && textNode) {
            textNode.nodeValue = newText;
        }
    });
});

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < 1000) return 'just now';
    if (diff < 60000) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (diff < 3600000) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (diff < oneDay) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

    // If 24+ hours, show exact date
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
// --- Update Times Periodically ---
setInterval(() => {
    document.querySelectorAll(".message-thread, .comment").forEach(msg => {
        const timestamp = parseInt(msg.dataset.timestamp, 10);
        const timeSpan = msg.querySelector(".message-time");
        if (timestamp && timeSpan) {
            timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;
        }
    });
}, 60000);
