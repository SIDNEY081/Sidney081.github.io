// ---------- Dark/Light Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "Sidney081";

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");

    themeIcon.textContent = isLight ? "☀️" : "🌙";
    themeText.textContent = isLight ? "Light Mode" : "Dark Mode";

    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}`;
    document.getElementById("contribGraph").src = `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${theme}&hide_border=true`;
});

// ---------- Current Work ----------
const currentWorkData = {
    learning: ["Embedded C", "Real-Time Systems", "Advanced Java"],
    workingOn: ["Chatbot (School Project)", "VCU Prototype Project (MATLAB + Embedded C)", "SafeShell Android App"],
    exploring: ["IoT projects with Arduino & Raspberry Pi"]
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

let completedProjects = [
    { name: "Blog Website", screenshot: "assets/screenshots/blog_home.png", description: "A blog-style website to teach Python basics.", link: "https://github.com/SIDNEY081/BlogWebsite" },
    { name: "MICT SETA Recruitment System", screenshot: "assets/screenshots/mictseta_home.png", description: "Recruitment system project developed for VUT learning program.", link: "https://github.com/SIDNEY081/MICT_SETA_Project" }
];

let inProgressProjects = [
    { name: "SafeShell", screenshot: "assets/screenshots/safeshell_home.png", description: "Android app to hide banking apps.", link: "#" },
    { name: "VCU_Prototype", screenshot: "assets/screenshots/vcu_dashboard.png", description: "Vehicle Control Unit prototype in MATLAB.", link: "#" },
    { name: "Chatbot", screenshot: "assets/screenshots/chatbot_ui.png", description: "School project chatbot.", link: "#" }
];

// Function to create project cards
function createProjectCard(proj, isInProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${proj.name}</h3>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${proj.screenshot}" alt="${proj.name} Screenshot">
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
