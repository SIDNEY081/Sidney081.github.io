document.addEventListener("DOMContentLoaded", () => {

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
            <p>${proj.description || "No description provided."}</p>
            <a href="${proj.link || '#'}" target="_blank">View Project</a>
        `;
        return card;
    }

    // ---------- Projects ----------
    const completedContainer = document.getElementById("completed-projects");
    const inProgressContainer = document.getElementById("inprogress-projects");

    const projects = [
        { name: "SafeShell", description: "Android app to hide banking apps", inProgress: true },
        { name: "AI Stroke Detector", description: "AI project for stroke detection using C++", inProgress: true },
        { name: "Chatbot", description: "School project chatbot", inProgress: true },
        { name: "MICT SETA Recruitment System", description: "Recruitment system project developed for VUT learning program", inProgress: false },
        { name: "Python Learning", description: "Python learning blog project", inProgress: false }
    ];

    projects.forEach(proj => {
        const card = createProjectCard(proj, proj.inProgress);
        if (proj.inProgress) {
            inProgressContainer.appendChild(card);
        } else {
            completedContainer.appendChild(card);
        }
    });

});
