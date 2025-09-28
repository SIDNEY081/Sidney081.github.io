// ---------- Dark/Light Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "SIDNEY081";

let isLight = localStorage.getItem("theme") === "light";
document.body.classList.toggle("light", isLight);
updateTheme();

toggleBtn.addEventListener("click", () => {
    isLight = !isLight;
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateTheme();
});

function updateTheme() {
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    themeText.textContent = isLight ? "Light Mode" : "Dark Mode";

    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}`;
    document.getElementById("contribGraph").src = `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${theme}&hide_border=true`;
}

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

// ---------- Projects (Manual Arrays) ----------
const inProgressRepos = [
    { name: "AI-Stroke-Shield", url: "#", description: "AI stroke detection project" },
    { name: "ckc_project", url: "#", description: "CKC school project" },
    { name: "School-Database-System", url: "#", description: "School database system" },
    { name: "ChatTTS", url: "#", description: "Text-to-speech chatbot" },
    { name: "SafeShell", url: "#", description: "Android app to hide apps" }
];

const completedRepos = [
    { name: "Python_Learning", url: "#", description: "Python learning exercises" },
    { name: "mictseta_recruitment_system", url: "#", description: "VUT MICT SETA recruitment system" }
];

const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "assets/screenshots/placeholder.png";

function createProjectCard(repo, inProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
        ${inProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${repo.name}</h3>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${placeholderScreenshot}" alt="${repo.name}">
            <a class="overlay-link" href="${repo.url}" target="_blank">View Project</a>
        </div>
        <p>${repo.description}</p>
    `;
    return card;
}

function loadProjects() {
    inProgressRepos.forEach(repo => inProgressContainer.appendChild(createProjectCard(repo, true)));
    completedRepos.forEach(repo => completedContainer.appendChild(createProjectCard(repo, false)));

    // Animate cards
    document.querySelectorAll('.project-card').forEach(card => setTimeout(() => card.classList.add('show'), 100));
}

loadProjects();
