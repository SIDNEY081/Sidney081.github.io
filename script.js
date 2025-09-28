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

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "assets/screenshots/placeholder.png";

// Correct project categorization
const inProgressRepos = [
    "AI-Stroke-Shield",
    "ckc_project",
    "School-Database-System",
    "ChatTTS",
    "SafeShell"
];

const completedRepos = [
    "Python_Learning",
    "mictseta_recruitment_system"
];

async function fetchAllRepos(username) {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json());
    const orgs = await fetch(`https://api.github.com/users/${username}/orgs`).then(r => r.json());

    let orgRepos = [];
    for (let org of orgs) {
        const repos = await fetch(`https://api.github.com/orgs/${org.login}/repos?per_page=100`).then(r => r.json());
        orgRepos = orgRepos.concat(repos);
    }

    return userRepos.concat(orgRepos);
}

function createProjectCard(repo, inProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
        ${inProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${repo.name}</h3>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${placeholderScreenshot}" alt="${repo.name} Screenshot">
            <a class="overlay-link" href="${repo.html_url}" target="_blank">View Project</a>
        </div>
        <p>${repo.description || "No description provided."}</p>
    `;
    return card;
}

async function loadProjects() {
    try {
        const repos = await fetchAllRepos(githubUsername);

        repos.forEach(repo => {
            const repoNameNormalized = repo.name.toLowerCase().replace(/\s+/g, '-');

            const inProgress = inProgressRepos.some(name =>
                name.toLowerCase().replace(/\s+/g, '-') === repoNameNormalized
            );

            const completed = completedRepos.some(name =>
                name.toLowerCase().replace(/\s+/g, '-') === repoNameNormalized
            );

            const card = createProjectCard(repo, inProgress);

            if (inProgress) inProgressContainer.appendChild(card);
            else if (completed) completedContainer.appendChild(card);
            // skip any repo not in either array if desired

            setTimeout(() => card.classList.add("show"), 100);
        });
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}

loadProjects();
