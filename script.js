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

// ---------- Projects (Dynamic + Custom Screenshots + InProgress Badges) ----------
const completedContainer = document.getElementById("projects");
const inProgressContainer = document.getElementById("in-progress");

// Custom projects with explicit inProgress flag
const customProjects = {
    SafeShell: { screenshot: "assets/screenshots/safeshell_home.png", description: "Android app to hide banking apps.", inProgress: true },
    VCU_Prototype: { screenshot: "assets/screenshots/vcu_dashboard.png", description: "Vehicle Control Unit prototype in MATLAB.", inProgress: true },
    Chatbot: { screenshot: "assets/screenshots/chatbot_ui.png", description: "School project chatbot.", inProgress: true },
    BlogWebsite: { screenshot: "assets/screenshots/blog_home.png", description: "A blog-style website to teach Python basics." },
    MICT_SETA_Project: { screenshot: "assets/screenshots/mictseta_home.png", description: "Recruitment system project developed for VUT learning program." }
};

async function fetchRepos() {
    try {
        // 1. Personal repos
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        const userRepos = await userRes.json();

        // 2. Organizations
        const orgsRes = await fetch(`https://api.github.com/users/${githubUsername}/orgs`);
        const orgs = await orgsRes.json();

        let orgRepos = [];
        for (const org of orgs) {
            const orgRes = await fetch(`https://api.github.com/orgs/${org.login}/repos?per_page=100`);
            const repos = await orgRes.json();
            orgRepos.push(...repos);
        }

        // 3. Merge and sort by updated_at
        const allRepos = [...userRepos, ...orgRepos];
        allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // 4. Render
        allRepos.forEach(repo => {
            if (repo.fork) return;

            const custom = customProjects[repo.name] || {};

            // Use inProgress flag from customProjects OR GitHub topics
            const isInProgress = custom.inProgress || repo.topics?.includes("in-progress");

            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
                <h3>${repo.name}</h3>
                <div class="screenshot-container">
                    ${custom.screenshot ? `<img class="project-screenshot" src="${custom.screenshot}" alt="${repo.name} Screenshot">` : ''}
                    <a class="overlay-link" href="${repo.html_url}" target="_blank">View Project</a>
                </div>
                <p>${custom.description || repo.description || "No description provided."}</p>
                <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
                <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            `;

            if (isInProgress) {
                inProgressContainer.appendChild(card);
            } else {
                completedContainer.appendChild(card);
            }

            setTimeout(() => card.classList.add("show"), 100);
        });
    } catch (err) {
        console.error("Error loading repos:", err);
        completedContainer.innerHTML = "<p>Could not load projects.</p>";
        inProgressContainer.innerHTML = "<p>Could not load projects.</p>";
    }
}

// Load all repos
fetchRepos();
