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

// ---------- Projects (Mix of GitHub + Custom) ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");

// Custom projects with screenshots
const customProjects = {
    SafeShell: { screenshot: "assets/screenshots/safeshell_home.png", description: "Android app to hide banking apps." },
    VCU_Prototype: { screenshot: "assets/screenshots/vcu_dashboard.png", description: "Vehicle Control Unit prototype in MATLAB." },
    Chatbot: { screenshot: "assets/screenshots/chatbot_ui.png", description: "School project chatbot." },
    BlogWebsite: { screenshot: "assets/screenshots/blog_home.png", description: "A blog-style website to teach Python basics." },
    MICT_SETA_Project: { screenshot: "assets/screenshots/mictseta_home.png", description: "Recruitment system project developed for VUT learning program." }
};

// Function to create project cards
function createProjectCard(repo, isInProgress = false) {
    const card = document.createElement("div");
    card.className = "project-card";

    // If repo name matches custom, use screenshot & description
    const custom = customProjects[repo.name] || {};

    card.innerHTML = `
        ${isInProgress ? '<div class="badge">In Progress</div>' : ''}
        <h3>${repo.name}</h3>
        <div class="screenshot-container">
            ${custom.screenshot ? `<img class="project-screenshot" src="${custom.screenshot}" alt="${repo.name} Screenshot">` : ""}
            <a class="overlay-link" href="${repo.html_url}" target="_blank">View Project</a>
        </div>
        <p>${custom.description || repo.description || "No description provided."}</p>
        <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
    `;
    return card;
}

// Fetch GitHub repos
fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
    .then(response => response.json())
    .then(repos => {
        repos.forEach(repo => {
            if (repo.fork) return; // Skip forks

            // Check topics for classification
            const isInProgress = repo.topics?.includes("in-progress");
            const isCompleted = repo.topics?.includes("completed");

            const card = createProjectCard(repo, isInProgress);

            if (isCompleted) {
                completedContainer.appendChild(card);
            } else if (isInProgress) {
                inProgressContainer.appendChild(card);
            } else {
                // Default → Completed
                completedContainer.appendChild(card);
            }

            // Fade-in animation
            setTimeout(() => card.classList.add("show"), 100);
        });
    })
    .catch(error => {
        console.error("Error fetching repos:", error);
        inProgressContainer.innerHTML = "<p>Could not load projects.</p>";
        completedContainer.innerHTML = "<p>Could not load projects.</p>";
    });
