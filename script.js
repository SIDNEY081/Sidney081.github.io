// ---------- Dark/Light Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "SIDNEY081";

// Load theme from localStorage or default
let isLight = localStorage.getItem("theme") === "light" ? true : false;
document.body.classList.toggle("light", isLight);
updateToggleText();

// Function to update toggle button text and GitHub stats
function updateToggleText() {
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
    updateToggleText();
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

// You can add more repos here manually if needed
let completedProjects = [
    { name: "MICT SETA Recruitment System", description: "Recruitment system project developed for VUT learning program.", link: "https://github.com/SIDNEY081/mictseta_recruitment_system-1" },
    { name: "Python Learning", description: "A project to teach Python basics.", link: "https://github.com/SIDNEY081/Python_Learning" }
];

let inProgressProjects = [
    { name: "SafeShell", description: "Android app to hide banking apps.", link: "https://github.com/SIDNEY081/SafeShell" },
    { name: "AI Stroke Detector", description: "AI project for stroke detection.", link: "https://github.com/SIDNEY081/AI-Stroke-Shield" }
];

// Placeholder screenshot if missing
const placeholderScreenshot = "assets/screenshots/placeholder.png";

// Function to create project cards
function createProjectCard(proj, isInProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${proj.name}</h3>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${proj.screenshot || placeholderScreenshot}" alt="${proj.name} Screenshot">
            <a class="overlay-link" href="${proj.link}" target="_blank">View Project</a>
        </div>
        <p>${proj.description}</p>
    `;
    return card;
}

// Render Completed Projects
completedProjects.forEach(proj => {
    const card = createProjectCard(proj, false);
    completedContainer.appendChild(card);
    setTimeout(() => card.classList.add("show"), 100);
});

// Render In-Progress Projects
inProgressProjects.forEach(proj => {
    const card = createProjectCard(proj, true);
    inProgressContainer.appendChild(card);
    setTimeout(() => card.classList.add("show"), 100);
});
