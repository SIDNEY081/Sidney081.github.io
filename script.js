// ---------- Theme Toggle ----------
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

// Descriptions for each programming language
const langDescriptions = {
  "C": "Low-level language used for system programming and embedded systems.",
  "C++": "Object-oriented extension of C, great for performance-critical applications.",
  "Java": "Versatile language used in Android development and enterprise systems.",
  "JavaScript": "Core language of the web, used for dynamic front-end behavior.",
  "Python": "Popular for AI, ML, scripting, and rapid development.",
  "PHP": "Server-side scripting language for web development.",
  "SQL": "Language for managing and querying relational databases.",
  "MATLAB": "Used for numerical computing, simulations, and engineering applications."
};

// Attach click listeners to each badge
document.querySelectorAll('#languageSkills .lang').forEach(el => {
  el.addEventListener('click', () => {
    const lang = el.getAttribute('data-lang');
    const description = langDescriptions[lang] || "No description available.";
    document.getElementById('langDescription').textContent = description;
  });
});


document.querySelectorAll(".lang").forEach(item => {
    item.addEventListener("click", () => {
        const lang = item.getAttribute("data-lang");
        const descBox = document.getElementById("langDescription");
        descBox.innerHTML = `<strong>${lang}:</strong> ${langDescriptions[lang]}`;
        descBox.style.display = "block";
    });
});

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "assets/screenshots/placeholder.png";
const filterButtons = document.createElement("div");
filterButtons.className = "project-filters";
filterButtons.innerHTML = `
    <button data-filter="all">All</button>
    <button data-filter="completed">Completed</button>
    <button data-filter="inprogress">In Progress</button>
`;
document.getElementById("projects").prepend(filterButtons);

filterButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        document.querySelectorAll(".project-card").forEach(card => {
            card.style.display =
                filter === "all" ||
                card.classList.contains(filter) ? "block" : "none";
        });
    });
});

async function fetchAllRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        if (!res.ok) throw new Error("Failed to fetch repos");
        return await res.json();
    } catch (err) {
        console.error("Error fetching repos:", err);
        return [];
    }
}

function createProjectCard(repo, isInProgress) {
    const card = document.createElement("div");
    card.className = `project-card ${isInProgress ? "inprogress" : "completed"}`;
    if (repo.name.toLowerCase().includes("chat")) {
        card.classList.add("chatbot-highlight");
    }
    card.innerHTML = `
        <div class="badge">${isInProgress ? "In Progress" : "Completed"}</div>
        <h3>${repo.name}</h3>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${repo.screenshot || placeholderScreenshot}" alt="${repo.name} Screenshot">
            <a class="overlay-link" href="${repo.html_url}" target="_blank">View Project</a>
        </div>
        <p>${repo.description || "No description provided."}</p>
        <p class="timestamp">Last GitHub activity: ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <p class="timestamp">Last code push: ${new Date(repo.pushed_at).toLocaleDateString()}</p>
    `;
    return card;
}


async function loadProjects() {
    const allRepos = await fetchAllRepos();
    allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    allRepos.forEach(repo => {
        const name = repo.name.toLowerCase();
        const desc = repo.description?.toLowerCase() || "";
        const isInProgress = desc.includes("in progress") || name.includes("safe") || name.includes("shield") || name.includes("chat");

        const card = createProjectCard(repo, isInProgress);
        const container = isInProgress ? inProgressContainer : completedContainer;
        container.appendChild(card);
        setTimeout(() => card.classList.add("show"), 100);
    });
}

loadProjects();
