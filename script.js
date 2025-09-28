// ---------- Dark/Light Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "SIDNEY081";

// Load theme from localStorage
let isLight = localStorage.getItem("theme") === "light" ? true : false;
document.body.classList.toggle("light", isLight);
updateTheme();

// Function to update toggle button text and GitHub stats
function updateTheme() {
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    themeText.textContent = isLight ? "Light Mode" : "Dark Mode";

    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}`;
    document.getElementById("contribGraph").src = `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${theme}&hide_border=true`;
}

// Toggle theme on button click
toggleBtn.addEventListener("click", () => {
    isLight = !isLight;
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateTheme();
});

// ---------- Current Work ----------
const currentWorkData = {
    learning: ["C++", "Embedded C", "Real-Time Systems", "Advanced Java"],
    workingOn: ["Chatbot (School Project)", "VCU Prototype Project (MATLAB + Embedded C)", "SafeShell Android App"],
    exploring: ["AI projects with Python", "IoT projects with Arduino & Raspberry Pi"]
};
const currentWorkContainer = document.getElementById("current-work");
currentWorkContainer.innerHTML = `
    <p><strong>Learning:</strong> ${currentWorkData.learning.join(", ")}</p>
    <p><strong>Working On:</strong> ${currentWorkData.workingOn.join(", ")}</p>
    <p><strong>Exploring:</strong> ${currentWorkData.exploring.join(", ")}</p>
`;

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "assets/screenshots/placeholder.png";

// Keywords to classify projects
const inProgressKeywords = ["SafeShell", "AI", "Chatbot"];
const completedKeywords = ["Python", "MICT", "School"];

// Fetch repos from GitHub
fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`)
    .then(res => res.json())
    .then(repos => {
        repos.forEach(repo => {
            // Decide project category
            let isInProgress = inProgressKeywords.some(kw => repo.name.toLowerCase().includes(kw.toLowerCase()));
            let isCompleted = completedKeywords.some(kw => repo.name.toLowerCase().includes(kw.toLowerCase()));

            if (!isInProgress && !isCompleted) return; // skip unrelated repos

            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
                <h3>${repo.name}</h3>
                <div class="screenshot-container">
                    <img class="project-screenshot" src="${placeholderScreenshot}" alt="${repo.name} Screenshot">
                    <a class="overlay-link" href="${repo.html_url}" target="_blank">View Project</a>
                </div>
                <p>${repo.description || "No description provided."}</p>
            `;

            if (isInProgress) inProgressContainer.appendChild(card);
            if (isCompleted) completedContainer.appendChild(card);

            setTimeout(() => card.classList.add("show"), 100);
        });
    })
    .catch(err => console.error("Failed to fetch GitHub repos:", err));
