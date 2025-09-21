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

// ---------- Render Projects ----------
completedProjects.forEach(proj => {
    const card = createProjectCard(proj, false);
    completedContainer.appendChild(card);
    setTimeout(() => card.classList.add("show"), 100);
});

inProgressProjects.forEach(proj => {
    const card = createProjectCard(proj, true);
    inProgressContainer.appendChild(card);
    setTimeout(() => card.classList.add("show"), 100);
});
