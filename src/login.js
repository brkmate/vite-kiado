document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "admin") {
            window.location.href = "admin.html";
        } else {
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.style.display = "block";
        }
    });
});
