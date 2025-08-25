// Admin credentials
const admins = [
  { username: "admin", password: "1234" },
  { username: "alfiza", password: "5678" },
  { username: "superuser", password: "admin123" },
  { username: "developer", password: "dev456" },
  { username: "manager01", password: "pass789" },
  { username: "mod2025", password: "secure1" },
  { username: "teamlead", password: "lead321" },
];

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const timestamp = new Date().toLocaleString();

  if (name && email && message) {
    const newResponse = { name, email, message, timestamp };
    const stored = JSON.parse(localStorage.getItem("responses")) || [];
    stored.push(newResponse);
    localStorage.setItem("responses", JSON.stringify(stored));

    alert("Message sent!");
    document.getElementById("contactForm").reset();
  } else {
    alert("Please fill out all fields.");
  }
});

document.getElementById("adminLoginBtn").addEventListener("click", function () {
  const user = document.getElementById("adminUsername").value;
  const pass = document.getElementById("adminPassword").value;

  const match = admins.find(
    (admin) => admin.username === user && admin.password === pass
  );

  if (match) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("responseViewer").classList.remove("hidden");
    loadResponses();
  } else {
    alert("Incorrect username or password.");
  }
});

function loadResponses() {
  const container = document.getElementById("responseList");
  container.innerHTML = "";
  let responses = JSON.parse(localStorage.getItem("responses")) || [];

  if (responses.length === 0) {
    container.innerHTML = "<p>No messages yet.</p>";
    return;
  }

  // Show newest first
  responses
    .slice()
    .reverse()
    .forEach(({ name, email, message, timestamp }, index) => {
      const safeName = name?.trim() || "Anonymous";
      const safeEmail = email?.trim() || "No Email";
      const safeMessage = message?.trim() || "No message provided";
      const safeTimestamp = timestamp || "Time not recorded";

      const div = document.createElement("div");
      div.className = "response-card";
      div.innerHTML = `
        <p><strong>${safeName}</strong> (${safeEmail})</p>
        <p>${safeMessage}</p>
        <p><em>${safeTimestamp}</em></p>
        <button class="delete-btn">Delete</button>
      `;

      // Delete button functionality
      div.querySelector(".delete-btn").addEventListener("click", () => {
        // Calculate original index before reverse
        const originalIndex = responses.length - 1 - index;
        if (confirm("Are you sure you want to delete this message?")) {
          responses.splice(originalIndex, 1);
        }

        localStorage.setItem("responses", JSON.stringify(responses));
        loadResponses(); // Reload list
      });

      container.appendChild(div);
    });
}

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const heroImage = document.getElementById("heroImage");
  const isDark = document.body.classList.contains("dark");
  this.textContent = isDark ? "Light Mode" : "Dark Mode";

  heroImage.src = isDark ? "assets/bg1dark.jpg" : "assets/bg1wal.avif";
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passInput = document.getElementById("adminPassword");
    const type = passInput.type === "password" ? "text" : "password";
    passInput.type = type;
    this.textContent = type === "password" ? "Show" : "Hide";
  });

document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("active");
});
