
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("mobile__menu");
    const navLinks = menuToggle.nextElementSibling; // the <ul> after toggle

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  });
//
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

// ==========================
// Global Data Structures
// ==========================
let advertMessages = [];
let noticeMessages = [];
let storedDatas = { advert: [], notice: [] };
let currentAdvertIndex = 0;
let currentNoticeIndex = 0;
const intervals = { advert: null, notice: null }; // track intervals centrally

// ==========================
// Utilities
// ==========================
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatMessage(entry) {
    return `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;
}

function shortenText(text) {
    if (!text) return "N/A";
    const words = text.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
}

// ==========================
// Detailed Popup
// ==========================
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
            const type = "${type}";
            const index = ${index};
            const isOwner = ${isOwner};

            function goTo(t, i) {
                window.opener.openDetailedEntryInNewWindow(t, i);
                window.close();
            }
            function deleteThis(t, i) {
                window.opener.deleteEntryFromPopup(t, i);
                window.close();
            }
            window.addEventListener('keydown', function (e) {
                const total = window.opener.storedDatas[type].length;
                if (e.key === 'ArrowRight') goTo(type, (index + 1) % total);
                else if (e.key === 'ArrowLeft') goTo(type, (index - 1 + total) % total);
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

    const win = window.open('', `entry-${type}-${index}`, 'width=600,height=500');
    if (win) {
        win.document.write(htmlContent);
        win.document.close();
    } else {
        alert("Popup blocked. Please allow popups for this site.");
    }
}

// ==========================
// CRUD Operations
// ==========================
function deleteStoredData(type, index) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const entry = storedDatas[type][index];
        const message = `Name of Organization: ${entry.name}\nDetails: ${entry.details}`;
        storedDatas[type].splice(index, 1);

        const messages = type === 'advert' ? advertMessages : noticeMessages;
        const messageIndex = messages.findIndex(msg => msg === message);
        if (messageIndex !== -1) messages.splice(messageIndex, 1);

        saveSlideshowData();
        showStoredDatas(type);
        updateSlideshow(type);
    }
}


function addEntry(type, text, details) {
    const entry = { id: Date.now(), name: text, details };
    storedDatas[type].push(entry);
    const messageArray = type === 'advert' ? advertMessages : noticeMessages;
    messageArray.push(formatMessage(entry));
    saveSlideshowData();
}
function addAdvert(text, details) { addEntry('advert', text, details); }
function addNotice(text, details) { addEntry('notice', text, details); }

function deleteStoredDatas(type, index) {
    if (confirm("Are you sure you want to delete this entry?")) {
        const entry = storedDatas[type][index];
        storedDatas[type].splice(index, 1);

        const messages = type === 'advert' ? advertMessages : noticeMessages;
        const messageIndex = messages.findIndex(msg => msg === formatMessage(entry));
        if (messageIndex !== -1) messages.splice(messageIndex, 1);

        saveSlideshowData();
        showStoredDatas(type);
        updateSlideshow(type);
    }
}

// ==========================
// Slideshow Logic
// ==========================
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

        const entryIndex = storedDatas[type].findIndex(entry => formatMessage(entry) === msg);

        // Build message element safely
        const span = document.createElement("span");
        span.classList.add("clickable-message");
        span.innerText = safeMessage;
        if (entryIndex !== -1) {
            span.addEventListener("click", () => openDetailedEntryInNewWindow(type, entryIndex));
        } else {
            span.addEventListener("click", () => alert('Entry not found or outdated.'));
        }

        box.innerHTML = "";
        box.appendChild(span);
        box.style.textAlign = 'justify';
        adjustFontSizeToFit(box);

        // Update dots
        dotContainer.innerHTML = "";
        messages.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = `dot ${i === index ? 'active' : ''}`;
            dot.setAttribute("aria-label", `Go to ${type} slide ${i + 1}`);
            dot.addEventListener("click", () => goToSlide(type, i));
            dotContainer.appendChild(dot);
        });
    }

    showMessage(getIndex());

    // Clear existing interval before setting new
    clearInterval(intervals[type]);
    if (messages.length > 0) {
        intervals[type] = setInterval(() => {
            const newIndex = (getIndex() + 1) % messages.length;
            setIndex(newIndex);
            showMessage(newIndex);
        }, 5000);
    }
}

function goToSlide(type, index) {
    if (type === 'advert') currentAdvertIndex = index;
    else currentNoticeIndex = index;
    updateSlideshow(type);
}

// ==========================
// Stored Data Modal
// ==========================
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

function toggleDetailsStored(type, index) {
    const detailsSpan = document.getElementById(`details-${type}-${index}`);
    const toggleBtn = document.getElementById(`toggle-${type}-${index}`);
    const entry = storedDatas[type][index];

    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    detailsSpan.innerText = isExpanded ? shortenText(entry.details) : entry.details;
    toggleBtn.innerText = isExpanded ? "more..." : "less...";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
}

// ==========================
// Save/Load
// ==========================
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
        alert("Failed to load slideshow data.");
    }
}

function saveSlideshowData() {
    fetch('/save-slideshow-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertMessages, noticeMessages, storedDatas })
    }).catch(err => {
        console.error('Error saving slideshow data:', err);
        alert("Error saving data.");
    });
}

function sendStoredData(type, index) {
    const entry = storedDatas[type][index];
    const messageContent = formatMessage(entry);
    const messages = type === 'advert' ? advertMessages : noticeMessages;

    if (!messages.includes(messageContent)) {
        messages.push(messageContent);
        saveSlideshowData();
        updateSlideshow(type);
        alert(`${entry.name || "This entry"} has been sent to the slideshow.`);
    } else {
        alert("Already sent to slideshow.");
    }
}

// ==========================
// Form Handling
// ==========================
function handleFormSubmit(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    formObject.id = Date.now();
    storedDatas[type].push(formObject);
    saveSlideshowData();
    alert(`Form submitted under: ${type === "advert" ? "Advertises" : "Notices"}`);
    event.target.reset();
    showStoredDatas(type);
}

// ==========================
// Expandable Input (form)
// ==========================
function setupExpandableDetails(fieldId, toggleId) {
    const toggle = document.getElementById(toggleId);
    if (!toggle) return;

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

// ==========================
// Init
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("advertForm")?.addEventListener("submit", e => handleFormSubmit(e, "advert"));
    document.getElementById("noticeForm")?.addEventListener("submit", e => handleFormSubmit(e, "notice"));

    document.querySelector(".select-advert-notice")?.addEventListener("change", function () {
        showStoredDatas(this.value);
    });

    document.querySelector(".modal-close")?.addEventListener("click", () => {
        document.getElementById("dataModal").style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("dataModal")) {
            document.getElementById("dataModal").style.display = "none";
        }
    });

    // Expandable details for both forms
    ["Advert", "Notice"].forEach(type => {
        setupExpandableDetails(`details${type}`, `moreDetails${type}`);
    });

    loadSlideshowData();
}); 



/*About section and Policy section */
document.addEventListener("DOMContentLoaded", function () {
  const aboutLink = document.getElementById("aboutsite");
  const policyLink = document.getElementById("policytitle");
  const showcaseLink = document.getElementById("showcases");

  // About/Policy modal
  const aboutPolicyModal = document.getElementById("aboutPolicyModal");
  const aboutPolicyText = document.getElementById("about-policy-text");
  const aboutPolicyClose = document.querySelector(".about-policy-close-btn");

  // Showcase modal
  const showcaseModal = document.getElementById("showcaseModal");
  const showcaseContent = document.getElementById("showcase-content");
  const showcaseClose = document.getElementById("closeShowcase");

  // Content blocks
  const aboutContent = `
    <h2>About This Site</h2>
    <p>This site is designed to connect communities with reliable 
    businesses and medical services. You can register organizations, 
    explore providers, and stay updated through news and announcements.</p>
    <ul>
      <li>Register your business or service</li>
      <li>Search by category or city</li>
      <li>Stay informed with updates</li>
      <li>Explore featured providers</li>
    </ul>
  `;

  const policyContent = `
    <h2>Policies</h2>
    <p>By using this platform, you agree to the following policies:</p>
    <h3>Data Use & Privacy</h3>
    <p>Your registration info will be shown publicly but never sold or misused.</p>
    <h3>User Responsibilities</h3>
    <p>Provide accurate information, avoid offensive content, and respect others.</p>
    <h3>Content Moderation</h3>
    <p>Admins may remove false or harmful entries.</p>
    <h3>Security</h3>
    <p>We protect your data, but exercise caution when contacting providers.</p>
  `;

  // Fallback sample showcase items
  /*const sampleShowcases = [
    { name: "🌟 Sheraton Addis", description: "International hotel providing world-class hospitality in Addis Ababa." },
    { name: "🏥 Washington Medical Center", description: "Trusted general healthcare services serving the community." },
    { name: "🐟 Fishery Development Project", description: "Innovative project supporting food security and local livelihoods." }
  ];

  // Build showcase grid (dynamic + fallback)
  async function buildShowcases() {
    let showcasesHTML = `
      <h2>ShowCases</h2>
      <p>Discover highlights from our community — businesses, medical providers, and organizations that make a difference.</p>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-top:15px;">
    `;

    try {
      const res = await fetch("/get-stored-data");
      if (!res.ok) throw new Error("Failed to fetch showcases");
      const data = await res.json();

      const combined = [...(data.business || []), ...(data.medical || [])];

      combined.slice(0, 6).forEach(item => {
        showcasesHTML += `
          <div style="background:#f9f9f9; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <h3>${item.name}</h3>
            <p>${item.service || "No description provided"}</p>
            <p><small>📍 ${item.city || "Location not specified"}</small></p>
          </div>
        `;
      });

      if (combined.length === 0) {
        sampleShowcases.forEach(sample => {
          showcasesHTML += `
            <div style="background:#f9f9f9; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
              <h3>${sample.name}</h3>
              <p>${sample.description}</p>
            </div>
          `;
        });
      }
    } catch (err) {
      console.error("Showcases fetch failed:", err);
      sampleShowcases.forEach(sample => {
        showcasesHTML += `
          <div style="background:#f9f9f9; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <h3>${sample.name}</h3>
            <p>${sample.description}</p>
          </div>
        `;
      });
    }

    showcasesHTML += "</div>";
    return showcasesHTML;
  } */

  // Event bindings
  aboutLink.addEventListener("click", function (e) {
    e.preventDefault();
    aboutPolicyText.innerHTML = aboutContent;
    aboutPolicyModal.style.display = "block";
  });

  policyLink.addEventListener("click", function (e) {
    e.preventDefault();
    aboutPolicyText.innerHTML = policyContent;
    aboutPolicyModal.style.display = "block";
  });

  showcaseLink.addEventListener("click", async function (e) {
    e.preventDefault();
    const showcaseHTML = await buildShowcases();
    showcaseContent.innerHTML = showcaseHTML;
    showcaseModal.style.display = "block";
  });

  // Close modals
  aboutPolicyClose.addEventListener("click", function () {
    aboutPolicyModal.style.display = "none";
  });
  showcaseClose.addEventListener("click", function () {
    showcaseModal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === aboutPolicyModal) {
      aboutPolicyModal.style.display = "none";
    }
    if (e.target === showcaseModal) {
      showcaseModal.style.display = "none";
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
    const showcaseModal = document.getElementById("showcaseModal");
    const uploadBtn = showcaseModal.querySelector("#uploadShowcaseBtn");
    const uploadForm = showcaseModal.querySelector("#uploadShowcaseForm");
    const showcaseContent = document.getElementById("showcase-content");
    const showcaseLink = document.getElementById("showcases");
    const showcaseClose = document.getElementById("closeShowcase");
    const imageInput = document.getElementById("imageInput"); // file input
    const previewContainer = document.getElementById("previewContainer"); // live preview container

    const defaultShowcases = [
        { title: "🌟 Sheraton Addis", description: "International hotel providing world-class hospitality in Addis Ababa.", image: "/images/default-hotel.jpg" },
        { title: "🏥 Washington Medical Center", description: "Trusted general healthcare services serving the community.", image: "/images/default-hospital.jpg" },
        { title: "🐟 Fishery Development Project", description: "Innovative project supporting food security and local livelihoods.", image: "/images/default-fishery.jpg" },
    ];

    // Live preview function
    function updatePreview() {
        previewContainer.innerHTML = "";

        const previewCard = document.createElement("div");
        previewCard.classList.add("showcase-card");

        const file = imageInput.files[0];
        const imageUrl = file ? URL.createObjectURL(file) : "/images/placeholder.png";
        previewCard.style.backgroundImage = `url('${imageUrl}')`;

        const overlay = document.createElement("div");
        overlay.classList.add("showcase-overlay");
        previewCard.appendChild(overlay);

        const textContainer = document.createElement("div");
        textContainer.classList.add("showcase-text");

        const title = document.getElementById("title").value || "Preview Title";
        const description = document.getElementById("description").value || "Preview description";
        const authorName = document.getElementById("authorName").value || "Your Name";
        const authorContact = document.getElementById("authorContact").value || "Contact Info";

        textContainer.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <small>By: ${authorName} | Contact: ${authorContact}</small>
        `;

        previewCard.appendChild(textContainer);
        previewContainer.appendChild(previewCard);
    }

    // Render showcases
    function renderShowcases(showcases) {
        showcaseContent.innerHTML = "";

        if (!showcases || showcases.length === 0) {
            showcaseContent.innerHTML = "<p>No showcases available yet.</p>";
            return;
        }

        showcases.forEach((sc) => {
            const card = document.createElement("div");
            card.classList.add("showcase-card");
            card.style.backgroundImage = `url('${sc.image && sc.image.trim() !== "" ? sc.image : "/images/placeholder.png"}')`;

            const overlay = document.createElement("div");
            overlay.classList.add("showcase-overlay");
            card.appendChild(overlay);

            const textContainer = document.createElement("div");
            textContainer.classList.add("showcase-text");
            textContainer.innerHTML = `
                <h3>${sc.title || "Untitled"}</h3>
                <p>${sc.description || ""}</p>
                <small>By: ${sc.authorName || "Unknown"} | Contact: ${sc.authorContact || "N/A"}</small>
            `;
            card.appendChild(textContainer);

            // Delete button only visible for owner
            if (sc.id && window.isOwner) {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = async () => {
                    if (!confirm("Are you sure you want to delete this showcase?")) return;
                    try {
                        const res = await fetch(`/delete-showcase/${sc.id}`, { method: "DELETE" });
                        const result = await res.json();
                        if (result.success) loadShowcases();
                        else alert("❌ Failed to delete showcase: " + result.message);
                    } catch (err) {
                        console.error(err);
                        alert("❌ Something went wrong while deleting.");
                    }
                };
                card.appendChild(deleteBtn);
            }

            showcaseContent.appendChild(card);
        });
    }

    async function loadShowcases() {
        try {
            const res = await fetch("/get-showcases");
            const data = await res.json();
            let showcases = data.storedShowcaseData || [];

            if (showcases.length < 3) {
                const remaining = 3 - showcases.length;
                showcases = showcases.concat(defaultShowcases.slice(0, remaining));
            }

            renderShowcases(showcases);
        } catch (err) {
            console.error("Error loading showcases:", err);
            renderShowcases([]);
        }
    }

    // Open modal
    showcaseLink.addEventListener("click", async function (e) {
        e.preventDefault();
        await loadShowcases();
        showcaseModal.style.display = "block";
    });

    // Close modal
    showcaseClose.addEventListener("click", function () {
        showcaseModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === showcaseModal) {
            showcaseModal.style.display = "none";
        }
    });

    // Toggle upload form
    if (uploadBtn && uploadForm) {
        uploadBtn.addEventListener("click", function () {
            uploadForm.style.display =
                uploadForm.style.display === "none" || uploadForm.style.display === ""
                    ? "block"
                    : "none";
        });
    }

    // Upload and live preview
    if (uploadForm) {
        // Live preview triggers
        ["input", "change"].forEach(event => {
            uploadForm.addEventListener(event, updatePreview);
        });

        uploadForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            try {
                const orgName = document.getElementById("authorName").value.trim();
                const contactInfo = document.getElementById("authorContact").value.trim();

                const regRes = await fetch("/check-registration");
                const regData = await regRes.json();
                const registeredData = regData.registeredData || [];

                const isRegistered = registeredData.some(entry =>
                    entry.name.trim().toLowerCase() === orgName.toLowerCase() &&
                    ((entry.email_info && entry.email_info.trim().toLowerCase() === contactInfo.toLowerCase()) ||
                        (entry.phone_info && entry.phone_info.trim() === contactInfo))
                );

                if (!isRegistered) {
                    alert("⚠️ You are not registered!!");
                    return;
                }

                const formData = new FormData(uploadForm);
                const uploadRes = await fetch("/upload-showcase", {
                    method: "POST",
                    body: formData
                });
                const result = await uploadRes.json();

                if (result.success) {
                    alert("✅ Successfully submitted!!");
                    uploadForm.reset();
                    uploadForm.style.display = "none";
                    previewContainer.innerHTML = ""; // clear preview
                    loadShowcases();
                } else {
                    alert("❌ Upload failed: " + result.message);
                }
            } catch (err) {
                console.error("Error:", err);
                alert("❌ Something went wrong during submission.");
            }
        });
    }

    showcaseContent.classList.add("scrollable-content");
});



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
    // --- Default slides ---
    const defaultSlides = [
        { id: "d1", category: "Business", name: "Sheraton Addis", service: "International Hotel", location: "Ex. Taitu St.", phone_info: "09...", city: "Addis Ababa", type: "business" },
        { id: "d2", category: "Medical", name: "Washington Medical center", service: "General Health", location: "Ex. Bole Rwanda Embassi", phone_info: "09...", city: "Addis Ababa", type: "medical" },
        { id: "d3", category: "Business", name: "Ethiopian Consultancy", service: "Consulting", location: "Ex. ...", phone_info: "09...", city: "Adama", type: "business" },
        { id: "d4", category: "Medical", name: "Smile Dental", service: "Dental Care", location: "Ex.Bole Rwanda Embassi ", phone_info: "0904222324", city: "Hawassa", type: "medical" },
        { id: "d5", category: "Business", name: "Luxury Hotel", service: "International Hotel", location: "Ex. ...", phone_info: "09...", city: "Bahir Dar", type: "business" },
        { id: "d6", category: "Medical", name: "Seven Dental", service: "Dental Care", location: "Golagul/22", phone_info: "09...", city: "Addis Ababa", type: "medical" },
        { id: "d7", category: "Medical", name: "Ozon Medium Clinc", service: "General Health", location: "Assosa", phone_info: "09...", city: "Assosa", type: "medical" }
    ];

    let storedMedicalData = [];
    let storedBusinessData = [];
    let slideIndex = 0;

    // --- Utility: Generate unique ID ---
    function generateId() {
        return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    }

    // --- City filter persistence + dynamic adding ---
    const cityFilter = document.getElementById("cityFilter");
    const savedCities = JSON.parse(localStorage.getItem("customCities") || "[]");
    let selectedCity = localStorage.getItem("selectedCity") || "All Cities";

    function addCityOption(city) {
        if ([...cityFilter.options].some(opt => opt.value === city)) return;
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        const otherOption = cityFilter.querySelector("option[value='otherCities']");
        cityFilter.insertBefore(option, otherOption);
    }

    savedCities.forEach(c => addCityOption(c));
    cityFilter.value = selectedCity;

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

    // --- Fetch stored data ---
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

    function saveStoredData() {
        fetch('/save-stored-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storedMedicalData, storedBusinessData })
        }).catch(err => console.error("Failed to save stored data:", err));
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


    // --- Show slideshow ---
    function showSlides(data) {
        const slideshow = document.getElementById("slideshow");
        const dotContainer = document.getElementById("dotContainer");
        const slideInfo = document.getElementById("slideInfo");

        slideshow.innerHTML = "";
        dotContainer.innerHTML = "";

        if (slideInfo) slideInfo.textContent = data[0]?.default ? "Showing default slides" : "";

        data.forEach((entry, i) => {
            const slide = document.createElement("div");
            slide.className = "slide" + (i === slideIndex ? " active" : "");
            slide.innerHTML = `
                <h3>${entry.type === "medical" ? "Medical Service" : "Business Organization"}</h3>
                <p><strong>Name:</strong> ${entry.name}</p>
                <p><strong>Service:</strong> ${entry.service || entry.industryOrService || "N/A"}</p>
                <p><strong>Location:</strong> ${entry.location}</p>
                <p><strong>City:</strong> ${entry.city}</p>
                <p><strong>Email:</strong> ${entry.email_info || entry.contact || "N/A"}</p>
                <p><strong>Phone:</strong> ${entry.phone_info}</p>
            `;
            slideshow.appendChild(slide);

            const dot = document.createElement("span");
            dot.className = "dot" + (i === slideIndex ? " active" : "");
            dot.onclick = () => { slideIndex = i; showSlides(data); };
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

    // --- Render stored data in modal ---
function renderStoredData(type) {
    const normalizedType = (type || "").toLowerCase();
    const isMedical = normalizedType === "medical";

    const modalDetails = document.getElementById("categoryModalDetails");
    const dataArr = isMedical ? storedMedicalData : storedBusinessData;
    const filterDropdown = document.getElementById(isMedical ? "medicalCategoryFilter" : "businessCategoryFilter");
    const selectedCat = filterDropdown.value;

    // Filter entries based on selected category
    const filtered = !selectedCat || selectedCat === "All"
        ? dataArr
        : dataArr.filter(entry =>
            (entry.category || "").trim().toLowerCase() === selectedCat.trim().toLowerCase()
        );

    let content = "";

    if (filtered.length === 0) {
        content = "<p>No data available.</p>";
    } else {
        filtered.forEach((entry, realIndex) => {
            const heading = `<h3>${entry.type === "medical" ? "Medical Service" : "Business Organization"}</h3>`;
            const timeDisplay = entry.createdAt
                ? `<p><strong>Posted:</strong> ${formatRelativeTime(entry.createdAt)}</p>`
                : "";

            content += `
                <div class="user-entry" data-id="${entry.id}">
                    ${heading}
                    <p><strong>Name:</strong> ${entry.name}</p>
                    <p><strong>Industry/Service:</strong> ${entry.industryOrService || entry.service || "N/A"}</p>
                    <p><strong>Location:</strong> ${entry.location}</p>
                    <p><strong>City:</strong> ${entry.city}</p>
                    <p><strong>Email:</strong> ${entry.email_info || "N/A"}</p>
                    <p><strong>Phone:</strong> ${entry.phone_info}</p>
                    ${timeDisplay}
                    ${isOwner
                        ? `<button class="delBtn" data-type="${normalizedType}" data-index="${realIndex}" data-name="${entry.name}">Delete</button>`
                        : ""}
                    <hr>
                </div>
            `;
        });
    }

    modalDetails.innerHTML = content;

    // Open modal
    const modal = document.getElementById("categoryDataModal");
    if (modal) modal.style.display = "block";
}


    // Event Listeners
    document.querySelector(".category-close").onclick = () => {
        document.getElementById("categoryDataModal").style.display = "none";
    };

    // --- updated city filter logic ---
    cityFilter.onchange = function () {
        if (this.value === "otherCities") {
            const newCity = prompt("Enter the name of the city:");
            if (newCity && newCity.trim() !== "") {
                const formattedCity = newCity.trim();
                addCityOption(formattedCity);
                savedCities.push(formattedCity);
                localStorage.setItem("customCities", JSON.stringify(savedCities));
                this.value = formattedCity;
                selectedCity = formattedCity;
            } else {
                this.value = selectedCity; // reset
                return;
            }
        } else {
            selectedCity = this.value;
        }
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

                saveStoredData();
                cycleSlides();
                renderStoredData(type);
            }
        }
    });

    // Registration form submission
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const type = document.getElementById("type").value;
        let category = type === "medical"
            ? document.getElementById("medicalCategory").value
            : document.getElementById("businessCategory").value;

        const industryOrService = document.getElementById("industryOrService").value;
        const licenseNumber = document.getElementById("licenseNumber").value;
        const location = document.getElementById("location").value;
        const email_info = document.getElementById("email_info").value;
        const phone_info = document.getElementById("phone_info").value;
        let city = document.getElementById("regionFilter").value;

        if (type === "medical" && category === "other") {
            const custom = document.getElementById("medicalOther").value;
            if (custom) category = custom;
        }
        if (type === "business" && category === "other") {
            const custom = document.getElementById("businessOther").value;
            if (custom) category = custom;
        }
        if (city === "addOther") {
            const customCity = document.getElementById("cityOther").value;
            if (customCity) city = customCity;
        }

        if (!name || !industryOrService || !location || !email_info || !phone_info || !city) {
            alert("Please fill in all required fields.");
            return;
        }

        const newEntry = {
            name, category, industryOrService, licenseNumber, location, email_info, phone_info, city, type,
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
        saveStoredData();

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

// ------------------------------
// Extra "Other" input fields
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const typeSelect = document.getElementById("type");
    const medicalCategory = document.getElementById("medicalCategory");
    const businessCategory = document.getElementById("businessCategory");
    const regionFilter = document.getElementById("regionFilter");

    const medicalOtherInput = document.createElement("input");
    medicalOtherInput.type = "text";
    medicalOtherInput.id = "medicalOther";
    medicalOtherInput.placeholder = "Specify Medical Category";
    medicalOtherInput.style.display = "none";

    const businessOtherInput = document.createElement("input");
    businessOtherInput.type = "text";
    businessOtherInput.id = "businessOther";
    businessOtherInput.placeholder = "Specify Business Category";
    businessOtherInput.style.display = "none";

    const cityOtherInput = document.createElement("input");
    cityOtherInput.type = "text";
    cityOtherInput.id = "cityOther";
    cityOtherInput.placeholder = "Enter City Name";
    cityOtherInput.style.display = "none";

    medicalCategory.parentNode.insertBefore(medicalOtherInput, medicalCategory.nextSibling);
    businessCategory.parentNode.insertBefore(businessOtherInput, businessCategory.nextSibling);
    regionFilter.parentNode.insertBefore(cityOtherInput, regionFilter.nextSibling);

    typeSelect.addEventListener("change", function () {
        if (typeSelect.value === "medical") {
            medicalCategory.disabled = false;
            businessCategory.disabled = true;
            businessCategory.value = "";
            businessOtherInput.style.display = "none";
            businessOtherInput.required = false;
        } else if (typeSelect.value === "business") {
            medicalCategory.disabled = true;
            businessCategory.disabled = false;
            medicalCategory.value = "";
            medicalOtherInput.style.display = "none";
            medicalOtherInput.required = false;
        } else {
            medicalCategory.disabled = true;
            businessCategory.disabled = true;
            medicalOtherInput.style.display = "none";
            businessOtherInput.style.display = "none";
        }
    });

    medicalCategory.addEventListener("change", function () {
        if (medicalCategory.value === "other") {
            medicalOtherInput.style.display = "block";
            medicalOtherInput.required = true;
        } else {
            medicalOtherInput.style.display = "none";
            medicalOtherInput.required = false;
            medicalOtherInput.value = "";
        }
    });

    businessCategory.addEventListener("change", function () {
        if (businessCategory.value === "other") {
            businessOtherInput.style.display = "block";
            businessOtherInput.required = true;
        } else {
            businessOtherInput.style.display = "none";
            businessOtherInput.required = false;
            businessOtherInput.value = "";
        }
    });

    regionFilter.addEventListener("change", function () {
        if (regionFilter.value === "addOther") {
            cityOtherInput.style.display = "block";
            cityOtherInput.required = true;
        } else {
            cityOtherInput.style.display = "none";
            cityOtherInput.required = false;
            cityOtherInput.value = "";
        }
    });
});

// ------------------------------
// Registration link toggle
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const registerLink = document.getElementById("registeruser");
    const registrationContainer = document.getElementById("registrationContainer");
    const registrationForm = document.getElementById("registrationForm");
    const closeBtn = document.getElementById("closeRegistration");

    registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (registrationContainer.style.display === "none" || registrationContainer.style.display === "") {
            registrationContainer.style.display = "block";
        } else {
            registrationContainer.style.display = "none";
        }
    });

    closeBtn.addEventListener("click", function () {
        registrationContainer.style.display = "none";
        registrationForm.reset();
    });

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        registrationContainer.style.display = "none";
        registrationForm.reset();
    });
});



/* ===========================
   OWNER / AUTH STATE
   =========================== */
window.isOwner = false; // single source of truth

// On first paint, check owner state and update UI
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/check-owner");
    const data = await res.json();
    window.isOwner = !!data.isOwner;
    toggleOwnerUI(window.isOwner);
  } catch (err) {
    console.error("Error checking owner status:", err);
    // Don't block UI; just show non-owner state
    toggleOwnerUI(false);
  }
});

// Login (kept compatible with your HTML IDs)
async function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginButton");

  const username = usernameInput?.value.trim();
  const password = passwordInput?.value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  if (loginBtn) loginBtn.disabled = true;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";

    if (data.success) {
      window.isOwner = true;
      toggleOwnerUI(true);
      alert("Logged in Successfully");
    } else {
      alert("Login failed: Invalid username or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred during login.");
  } finally {
    if (loginBtn) loginBtn.disabled = false;
  }
}

// Logout
async function logout() {
  try {
    const res = await fetch("/logout", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      window.isOwner = false;
      toggleOwnerUI(false);

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      if (usernameInput) usernameInput.value = "";
      if (passwordInput) passwordInput.value = "";

      alert("Logged out");
      // optional hard reset:
      window.location.reload();
    } else {
      alert("Logout failed.");
    }
  } catch (err) {
    console.error("Logout error:", err);
    alert("An error occurred during logout.");
  }
}

// Show/hide owner-only controls everywhere (including chat)
function toggleOwnerUI(isOwner) {
  // Your existing controls
  const advertContainer = document.getElementById("advertInputContainer");
  const deleteAdvert = document.getElementById("deleteAdvertBtn");
  const noticeContainer = document.getElementById("noticeInputContainer");
  const deleteNotice = document.getElementById("deleteNoticeBtn");

  if (advertContainer) advertContainer.style.display = isOwner ? "inline-block" : "none";
  if (deleteAdvert) deleteAdvert.style.display = isOwner ? "inline-block" : "none";
  if (noticeContainer) noticeContainer.style.display = isOwner ? "inline-block" : "none";
  if (deleteNotice) deleteNotice.style.display = isOwner ? "inline-block" : "none";

  // Global buttons that you already use elsewhere
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const sendBtns = document.querySelectorAll(".send-btn");
  deleteBtns.forEach(btn => (btn.style.display = isOwner ? "inline-block" : "none"));
  sendBtns.forEach(btn => (btn.style.display = isOwner ? "inline-block" : "none"));

  // Chat-specific buttons (edit/delete in message threads)
  document.querySelectorAll(".message-thread, .comment").forEach(msg => {
    const del = msg.querySelector(".delete-button");
    const edit = msg.querySelector(".edit-button");
    if (del) del.style.display = isOwner ? "inline-block" : "none";
    if (edit) edit.style.display = isOwner ? "inline-block" : "none";
  });
}

/* ===========================
   SOCKET.IO + REALTIME UI
   =========================== */

// Initialize Socket.IO once
const socket = io({ transports: ["polling", "websocket"] });

// Persist a friendly username for continuity
function getOrCreateUsername() {
  const key = "mbd_username";
  let name = localStorage.getItem(key);
  if (!name) {
    name = "Guest" + Math.floor(Math.random() * 10000);
    localStorage.setItem(key, name);
  }
  return name;
}
const username = getOrCreateUsername();

// Minimal UA detection (kept as-is)
function detectDevice(userAgent) {
  const ua = userAgent.toLowerCase();
  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("android")) return "Android Phone";
  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("windows")) return "Windows PC";
  if (ua.includes("mac")) return "Mac";
  if (ua.includes("linux")) return "Linux PC";
  return "Unknown Device";
}
const deviceInfo = detectDevice(navigator.userAgent);

// Join chat when Socket is ready
socket.emit("joinChat", { username, deviceInfo });

// Leave cleanly on unload
window.addEventListener("beforeunload", () => {
  socket.emit("leaveChat", username);
});

// Viewer count
socket.on("viewerCountUpdate", count => {
  const el = document.getElementById("viewerCount");
  if (el) el.textContent = `Viewers: ${count}`;
});

// Followers
function followButtonHandler() {
  const followButton = document.getElementById("followBtn");
  if (!followButton) return;
  const isFollowing = followButton.textContent.trim().toLowerCase() === "follow";
  socket.emit(isFollowing ? "follow" : "unfollow");
  followButton.textContent = isFollowing ? "Unfollow" : "Follow";
  alert(isFollowing ? "You followed the website!" : "You unfollowed the website!");
}
function attachFollowButtonListener() {
  const followButton = document.getElementById("followBtn");
  if (followButton) {
    followButton.removeEventListener("click", followButtonHandler);
    followButton.addEventListener("click", followButtonHandler);
  }
}
attachFollowButtonListener();

socket.on("followerCountUpdate", count => {
  const el = document.getElementById("followerCount");
  if (el) el.textContent = `Followers: ${count}`;
});

// Active chatters
socket.on("activeChattersUpdate", chatters => {
  const chattersList = document.getElementById("chattersList");
  if (!chattersList) return;
  chattersList.textContent =
    chatters && chatters.length
      ? chatters.map(c => `${c.username} (${c.deviceInfo})`).join(", ")
      : "None";
});

/* ===========================
   CHAT UI + MESSAGES
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const messageIcon = document.getElementById("messageIcon");
  const closeButton = document.querySelector(".message-button-close");
  const messageInput = document.getElementById("messageInput");
  const sendMessageBtn = document.getElementById("sendMessage");
  const messageContent = document.getElementById("messageContent");

  // Safeguard if chat UI not present
  if (!messageContent) return;

  messageIcon?.addEventListener("click", () => (messageBox.style.display = "flex"));
  closeButton?.addEventListener("click", () => (messageBox.style.display = "none"));

  sendMessageBtn?.addEventListener("click", sendMainMessage);
  messageInput?.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMainMessage();
    }
  });

  function sendMainMessage() {
    const text = messageInput?.value.trim();
    if (!text) return;

    socket.emit("sendMessage", {
      text,
      messageId: generateUniqueId(),
      sender: username,
      timestamp: Date.now()
    });

    if (messageInput) messageInput.value = "";
  }

  function generateUniqueId() {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  // Time formatting
  function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const s = Math.floor(diff / 1000);
    const m = Math.floor(diff / (1000 * 60));
    const h = Math.floor(diff / (1000 * 60 * 60));
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < 1000) return "just now";
    if (diff < 60000) return `${s} second${s !== 1 ? "s" : ""} ago`;
    if (diff < 3600000) return `${m} minute${m !== 1 ? "s" : ""} ago`;
    if (diff < oneDay) return `${h} hour${h !== 1 ? "s" : ""} ago`;

    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  // Build a message (thread or reply)
  function createMessageElement(text, isReply = false, sender = "Someone", messageId = "", timestamp = Date.now()) {
    const container = document.createElement("div");
    container.classList.add(isReply ? "comment" : "message-thread");
    container.dataset.messageId = messageId;
    container.dataset.timestamp = `${timestamp}`;

    // Text line
    const p = document.createElement("p");
    p.classList.add("message-text");
    const senderLabel = sender === username ? "You" : sender;
    p.textContent = isReply ? `${senderLabel}: ${text}` : `${senderLabel}: ${text}`;


    // Time chip
    const timeSpan = document.createElement("span");
    timeSpan.classList.add("message-time");
    timeSpan.textContent = ` (${formatTimeAgo(timestamp)})`;
    p.appendChild(timeSpan);

    container.appendChild(p);

    // Buttons
    const buttons = document.createElement("div");
    buttons.classList.add("message-buttons");
    buttons.style.cssText = "display:flex;justify-content:flex-end;gap:5px;";

    const replyBtn = createButton("Reply...", "reply-button");
    const editBtn = createButton("Edit", "edit-button");
    const deleteBtn = createButton("Delete", "delete-button");

    // Owner-only visibility (syncs with toggleOwnerUI)
    if (window.isOwner) {
      buttons.appendChild(deleteBtn);
      buttons.appendChild(editBtn);
    } else {
      editBtn.style.display = "none";
      deleteBtn.style.display = "none";
    }

    buttons.appendChild(replyBtn);
    container.appendChild(buttons);

    // Reply box
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
    const replies = document.createElement("div");
    replies.classList.add("replies-container");
    container.appendChild(replies);

    // Events
    replyBtn.addEventListener("click", () => {
      replyBox.style.display = replyBox.style.display === "none" ? "block" : "none";
      replyInput.focus();
    });

    replyInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendReply();
      }
    });
    replySend.addEventListener("click", sendReply);

    function sendReply() {
      const replyText = replyInput.value.trim();
      if (!replyText) return;
      socket.emit("sendReply", { replyText, messageId, timestamp: Date.now() });
      replyInput.value = "";
      replyBox.style.display = "none";
    }

    deleteBtn.addEventListener("click", () => {
      if (!window.isOwner) return;
      if (confirm("Are you sure you want to delete this message?")) {
        socket.emit("deleteMessage", { messageId });
        container.remove();
      }
    });

    editBtn.addEventListener("click", () => {
      if (!window.isOwner) return;

      // Preserve identifiers
      const oldText = text;
      const oldTimestamp = timestamp;

      // Inline editor (minimal DOM churn)
      const editor = document.createElement("textarea");
      editor.classList.add("edit-textarea");
      editor.value = isReply ? oldText : oldText; // same text; prefix is rendered by UI, not stored
      const saveBtn = createButton("Save", "save-button");
      const cancelBtn = createButton("Cancel", "cancel-button");

      // Clear only content children (keep dataset attributes)
      while (container.firstChild) container.removeChild(container.firstChild);
      container.append(editor, saveBtn, cancelBtn);

      saveBtn.addEventListener("click", () => {
        const newText = editor.value.trim();
        if (!newText) return;
        socket.emit("updateMessage", { newText, messageId });

        // Rebuild node with updated text (keep same IDs)
        const updated = createMessageElement(newText, isReply, sender, messageId, Date.now());
        container.replaceWith(updated);
      });

      cancelBtn.addEventListener("click", () => {
        const restored = createMessageElement(oldText, isReply, sender, messageId, oldTimestamp);
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

  // Socket handlers for messages
  socket.on("loadMessages", msgs => {
    messageContent.innerHTML = "";
    (msgs || []).forEach(({ text, sender, messageId, timestamp, replies }) => {
      const thread = createMessageElement(text, false, sender, messageId, timestamp);
      messageContent.appendChild(thread);

      const repliesContainer = thread.querySelector(".replies-container");
      (replies || []).forEach(({ replyText, sender: replySender, timestamp: replyTime }) => {
        const replyEl = createMessageElement(replyText, true, replySender, messageId, replyTime);
        repliesContainer?.appendChild(replyEl);
      });
    });

    // Re-apply owner visibility after bulk render
    toggleOwnerUI(window.isOwner);
  });

  socket.on("newMessage", ({ text, sender, messageId, timestamp }) => {
    const thread = createMessageElement(text, false, sender, messageId, timestamp);
    messageContent.appendChild(thread);
    toggleOwnerUI(window.isOwner);
  });

  socket.on("newReply", ({ replyText, sender, messageId, timestamp }) => {
    const parentReplies = document.querySelector(
      `[data-message-id='${messageId}'] .replies-container`
    );
    if (!parentReplies) return;
    const reply = createMessageElement(replyText, true, sender, messageId, timestamp);
    parentReplies.appendChild(reply);
    toggleOwnerUI(window.isOwner);
  });

  socket.on("updateMessage", ({ newText, messageId }) => {
    const el = document.querySelector(`[data-message-id='${messageId}']`);
    if (!el) return;
    const textNode = el.querySelector(".message-text");
    if (!textNode) return;

    // If it's a reply, keep the "sender: " prefix visually (we don’t know it here; simplest is rebuild)
    const isReply = el.classList.contains("comment");
    const senderPrefix = isReply ? (textNode.textContent.split(":")[0] || "Someone") : null;

    // Rebuild content text safely
    textNode.textContent = isReply && senderPrefix ? `${senderPrefix}: ${newText}` : newText;

    // Re-attach time chip
    const ts = parseInt(el.dataset.timestamp || `${Date.now()}`, 10);
    const timeSpan = document.createElement("span");
    timeSpan.classList.add("message-time");
    timeSpan.textContent = ` (${formatTimeAgo(ts)})`;
    textNode.appendChild(timeSpan);
  });

  // Periodic time updates (lightweight)
  setInterval(() => {
    document.querySelectorAll(".message-thread, .comment").forEach(msg => {
      const ts = parseInt(msg.dataset.timestamp || "0", 10);
      const timeSpan = msg.querySelector(".message-time");
      if (ts && timeSpan) timeSpan.textContent = ` (${formatTimeAgo(ts)})`;
    });
  }, 60000);
});
