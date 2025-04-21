/*const adminUserId = "admin123"; // This is the admin ID
let currentUserId = localStorage.getItem("currentUserId") || ""; // Load stored user

// Login Function
function login() {
    let enteredUsername = document.getElementById("username").value.trim();

    if (enteredUsername === adminUserId) {
        alert("Login Successful! You are now the Admin.");
        currentUserId = enteredUsername;
        localStorage.setItem("currentUserId", currentUserId); // Store login
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("toggleAdminBtn").style.display = "block";
    } else {
        alert("Unauthorized User! Only the admin can log in.");
    }
}

// Toggle Admin Mode
function toggleAdminMode() {
    if (currentUserId !== adminUserId) {
        alert("You are not authorized to enter Admin Mode.");
        return;
    }

    let isAdmin = document.querySelector(".admin-only").style.display === "block";

    document.querySelectorAll(".admin-only").forEach(el => {
        el.style.display = isAdmin ? "none" : "block";
    });

    document.getElementById("toggleAdminBtn").textContent = isAdmin ? "Enter Admin Mode" : "Exit Admin Mode";
}

// Add Advertisement
function addAdvertMessage() {
    if (currentUserId !== adminUserId) {
        alert("Only the admin can add advertisements.");
        return;
    }

    const inputField = document.getElementById("newAdvertMessage");
    const newMessage = inputField.value.trim();

    if (newMessage === "") {
        alert("Please enter a valid advertisement message.");
        return;
    }

    let advertMessages = JSON.parse(localStorage.getItem("advertMessages")) || [];
    advertMessages.push(newMessage);
    localStorage.setItem("advertMessages", JSON.stringify(advertMessages));

    inputField.value = "";
    updateAdvertSlideshow();
}

// Add Notice
function addNoticeMessage() {
    if (currentUserId !== adminUserId) {
        alert("Only the admin can add notices.");
        return;
    }

    const inputField = document.getElementById("newNoticeMessage");
    const newMessage = inputField.value.trim();

    if (newMessage === "") {
        alert("Please enter a valid notice message.");
        return;
    }

    let noticeMessages = JSON.parse(localStorage.getItem("noticeMessages")) || [];
    noticeMessages.push(newMessage);
    localStorage.setItem("noticeMessages", JSON.stringify(noticeMessages));

    inputField.value = "";
    updateNoticeSlideshow();
}

// Update Advertisements
function updateAdvertSlideshow() {
    const advertAdDiv = document.getElementById("AdvertAd");
    let advertMessages = JSON.parse(localStorage.getItem("advertMessages")) || [];

    if (advertMessages.length === 0) {
        advertAdDiv.innerHTML = "Advertisements";
        return;
    }

    advertAdDiv.innerHTML = advertMessages[advertMessages.length - 1]; // Show latest message
}

// Update Notices
function updateNoticeSlideshow() {
    const noticeAdDiv = document.getElementById("noticeAd");
    let noticeMessages = JSON.parse(localStorage.getItem("noticeMessages")) || [];

    if (noticeMessages.length === 0) {
        noticeAdDiv.innerHTML = "Notices";
        return;
    }

    noticeAdDiv.innerHTML = noticeMessages[noticeMessages.length - 1]; // Show latest message
}

// Load stored messages on page load
document.addEventListener("DOMContentLoaded", function () {
    updateAdvertSlideshow();
    updateNoticeSlideshow();

    // If the user was logged in before, hide login and show admin button
    if (currentUserId === adminUserId) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("toggleAdminBtn").style.display = "block";
    }
}); */
