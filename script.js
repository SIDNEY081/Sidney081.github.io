// -----------------------
// Dark/Light Toggle
// -----------------------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const githubUsername = "Sidney081";

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    toggleBtn.innerHTML = `${themeIcon.outerHTML} ${isLight ? "Light Mode" : "Dark Mode"}`;

    // Update GitHub stats theme
    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}`;
    document.getElementById("contribGraph").src = `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${theme}&hide_border=true`;
});

// -----------------------
// Current Work
// -----------------------
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

// -----------------------
// Projects
// -----------------------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");

let inProgressProjects = [
    { name: "SafeShell", screenshot: "assets/screenshots/safeshell_home.png", description: "Android app to hide banking apps.", link: "#" },
    { name: "VCU_Prototype", screenshot: "assets/screenshots/vcu_dashboard.png", description: "Vehicle Control Unit prototype in MATLAB.", link: "#" },
    { name: "Chatbot", screenshot: "assets/screenshots/chatbot_ui.png", description: "School project chatbot.", link: "#" }
];

function createProjectCard(proj, isCompleted = false) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${proj.name}</h3>
      ${proj.screenshot ? `<a href="${proj.link}" target="_blank"><img src="${proj.screenshot}" class="project-screenshot" alt="${proj.name} Screenshot"></a>` : ""}
      <p>${proj.description || "No description provided."}</p>
      ${isCompleted && proj.link ? `<a href="${proj.link}" target="_blank">View Project</a>` : ""}
    `;
    return card;
}

// Example of fetching GitHub for completed projects
const completedProjects = ["Blog_Website", "MICTSETA_Recruitment"];
completedProjects.forEach(projName => {
    fetch(`https://api.github.com/repos/${githubUsername}/${projName}`)
      .then(res => res.json())
      .then(repo => completedContainer.appendChild(createProjectCard({ name: repo.name, description: repo.description, link: repo.html_url }, true)))
      .catch(err => console.error(err));
});

// Render in-progress projects
inProgressProjects.forEach(proj => inProgressContainer.appendChild(createProjectCard(proj, false)));

// -----------------------
// Fade-in animation for project cards
// -----------------------
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".project-card").forEach(card => observer.observe(card));
