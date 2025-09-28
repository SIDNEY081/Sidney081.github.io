// ---------- Dark/Light Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "SIDNEY081";

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
    learning: ["C++", "Embedded C", "Real-Time Systems", "Advanced Java"],
    workingOn: ["Chatbot (School Project)", "VCU Prototype Project (MATLAB + Embedded C)", "SafeShell Android App", "AI Stroke Detector Project"],
    exploring: ["IoT projects with Arduino & Raspberry Pi"]
};
const currentWorkContainer = document.getElementById("current-work");
currentWorkContainer.innerHTML = `
    <p><strong>Learning:</strong> ${currentWorkData.learning.join(", ")}</p>
    <p><strong>Working On:</strong> ${currentWorkData.workingOn.join(", ")}</p>
    <p><strong>Exploring:</strong> ${currentWorkData.exploring.join(", ")}</p>
`;

// ---------- Helper to create project cards ----------
function createProjectCard(proj, isInProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
        ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${proj.name}</h3>
        <div class="screenshot-container">
            ${proj.screenshot ? `<img class="project-screenshot" src="${proj.screenshot}" alt="${proj.name} Screenshot">` : ''}
            <a class="overlay-link" href="${proj.link || '#'}" target="_blank">View Project</a>
        </div>
        <p>${proj.description || "No description provided."}</p>
    `;
    return card;
}

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");

// Custom projects with exact repo names
const customProjects = {
    "SafeShell": { screenshot: "assets/screenshots/safeshell_home.png", description: "Android app to hide banking apps.", inProgress: true },
    "AI-Stroke-Shield": { screenshot: "assets/screenshots/ai_stroke_detector.png", description: "AI project for stroke detection using C++.", inProgress: true },
    "Chatbot": { screenshot: "assets/screenshots/chatbot_ui.png", description: "School project chatbot.", inProgress: true },
    "mictseta_recruitment_system": { screenshot: "assets/screenshots/mictseta_home.png", description: "Recruitment system project developed for VUT learning program." },
    "Python_Learning": { screenshot: "assets/screenshots/blog_home.png", description: "Python learning blog project" }
};

// Render all custom projects immediately
Object.keys(customProjects).forEach(key => {
    const proj = customProjects[key];
    const card = createProjectCard({ name: key, ...proj }, proj.inProgress || false);
    if (proj.inProgress) {
        inProgressContainer.appendChild(card);
    } else {
        completedContainer.appendChild(card);
    }
    setTimeout(() => card.classList.add("show"), 100);
});

// Fetch GitHub repos for future dynamic In Progress projects
async function fetchRepos() {
    try {
        // Personal repos
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        const userRepos = await userRes.json();

        // Organizations
        const orgsRes = await fetch(`https://api.github.com/users/${githubUsername}/orgs`);
        const orgs = await orgsRes.json();

        let orgRepos = [];
        for (const org of orgs) {
            const orgRes = await fetch(`https://api.github.com/orgs/${org.login}/repos?per_page=100`);
            const repos = await orgRes.json();
            orgRepos.push(...repos);
        }

        const allRepos = [...userRepos, ...orgRepos];
        allRepos.forEach(repo => {
            if (repo.fork) return;
            if (customProjects[repo.name]?.inProgress) return; // Already rendered

            const isInProgress = repo.topics?.includes("in-progress");
            if (isInProgress) {
                const card = createProjectCard({
                    name: repo.name,
                    description: repo.description,
                    link: repo.html_url
                }, true);
                inProgressContainer.appendChild(card);
                setTimeout(() => card.classList.add("show"), 100);
            }
        });
    } catch (err) {
        console.error("Error loading GitHub repos:", err);
    }
}

// Load dynamic repos
fetchRepos();
