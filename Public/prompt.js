// Simulate login as the admin
function loginAsOwner() {
    const enteredPassword = prompt("Enter the admin password:");

    const correctPassword = "admin123"; // The correct password for the admin (use a real password here)
    // If the entered password matches the correct password
    if (enteredPassword === correctPassword) {
        // Set the flag in localStorage if the login is successful
        localStorage.setItem("isOwner", "true");
        alert("You are logged in as the admin!");
        updateAdminControls(); // Make admin controls visible
    } else {
        alert("Incorrect password. You are not authorized.");
    }
}
// Simulate logout as the admin
function logoutAsOwner() {
    localStorage.removeItem("isOwner"); // Remove the "isOwner" flag
    alert("You have logged out.");
    updateAdminControls(); // Hide admin controls
}
