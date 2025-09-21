// -----------------------
// Dark/Light Toggle
// -----------------------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    toggleBtn.textContent = `${themeIcon.textContent} ${isLight ? "Light Mode" : "Dark Mode"}`;
    toggleBtn.prepend(themeIcon);

    // Change GitHub stats theme
    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=Sidney081&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=Sidney081&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=Sidney081&theme=${theme}`;
    document.getElementById("contribGraph").src = `https://github-readme-activity-graph.vercel.app/graph?username=Sidney081&theme=${theme}&hide_border=true`;
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
// Completed Projects + In-Progress
// -----------------------
const completedContainer = document.getElementById("completed-projects");
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

function renderInProgressProjects() {
    const container = document.getElementById("inprogress-projects");
    container.innerHTML = "";
    inProgressProjects.forEach(proj => { if (!proj.moved) container.appendChild(createProjectCard(proj, false)); });
}

const githubUsername = "Sidney081";
inProgressProjects.forEach((proj, index) => {
    fetch(`https://api.github.com/repos/${githubUsername}/${proj.name}`)
      .then(res => {
          if (res.status === 200) {
              res.json().then(repo => {
                  const card = createProjectCard({ name: repo.name, description: repo.description, link: repo.html_url }, true);
                  completedContainer.appendChild(card);
                  inProgressProjects[index].moved = true;
                  renderInProgressProjects();
              });
          } else { renderInProgressProjects(); }
      })
      .catch(err => console.error(err));
});

renderInProgressProjects();

